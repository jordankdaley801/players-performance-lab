import {useCallback, useEffect, useMemo, useState} from 'react'
import {sanityClient} from '@/lib/sanityClient'
import {labSlotsInRangeQuery, type LabSlotDoc} from '@/lib/labSlotsQuery'
import styles from './LabSlotAvailability.module.css'

function isoDateInTimeZone(d: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, day] = iso.split('-').map(Number)
  const d = new Date(Date.UTC(y!, m! - 1, day!))
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export type SlotStatus = 'open' | 'fillingFast' | 'almostFull' | 'full'

export function slotStatus(filled: number, maxSpots: number): SlotStatus {
  const max = Math.max(1, maxSpots)
  const f = Math.min(Math.max(0, filled), max)
  if (f >= max) return 'full'
  if (f === max - 1) return 'almostFull'
  const fastLow = Math.max(1, Math.ceil(max * (8 / 12)))
  const fastHigh = Math.max(fastLow, max - 2)
  if (f >= fastLow && f <= fastHigh) return 'fillingFast'
  return 'open'
}

const STATUS_LABEL: Record<SlotStatus, string> = {
  open: 'Open',
  fillingFast: 'Filling Fast',
  almostFull: 'Almost Full',
  full: 'Full',
}

export function LabSlotAvailability() {
  const [slots, setSlots] = useState<LabSlotDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weekMode, setWeekMode] = useState(false)
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])

  const {from, to} = useMemo(() => {
    const today = isoDateInTimeZone(new Date(), tz)
    if (!weekMode) {
      return {from: today, to: today}
    }
    return {from: today, to: addDaysIso(today, 6)}
  }, [weekMode, tz])

  const fetchSlots = useCallback(async () => {
    try {
      const rows = await sanityClient.fetch<LabSlotDoc[]>(labSlotsInRangeQuery, {from, to})
      setSlots(rows ?? [])
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load slots')
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    setLoading(true)
    void fetchSlots()
  }, [fetchSlots])

  useEffect(() => {
    const sub = sanityClient
      .listen(`*[_type == "labSlot"]`, {}, {events: ['mutation', 'welcome']})
      .subscribe(() => {
        void fetchSlots()
      })
    return () => sub.unsubscribe()
  }, [fetchSlots])

  const groupedByDate = useMemo(() => {
    const map = new Map<string, LabSlotDoc[]>()
    for (const s of slots) {
      const key = s.date
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [slots])

  return (
    <section className={styles.section} aria-labelledby="lab-slots-heading">
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <h2 id="lab-slots-heading" className={styles.title}>
              Live slot availability
            </h2>
            <p className={styles.sub}>
              Capacity updates in real time from the schedule. Each slot holds up to 12 athletes unless otherwise
              noted.
            </p>
          </div>
          <div className={styles.toggleWrap} role="group" aria-label="Date range">
            <button
              type="button"
              className={`${styles.toggleBtn} ${!weekMode ? styles.toggleActive : ''}`}
              onClick={() => setWeekMode(false)}
            >
              Today
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${weekMode ? styles.toggleActive : ''}`}
              onClick={() => setWeekMode(true)}
            >
              This week
            </button>
          </div>
        </div>

        {loading ? <p className={styles.muted}>Loading slots…</p> : null}
        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        {!loading && !error && slots.length === 0 ? (
          <p className={styles.muted}>
            No lab slots published for {weekMode ? 'this week' : 'today'} yet. Add <code>labSlot</code> documents in
            Sanity to see them here.
          </p>
        ) : null}

        {!loading &&
          groupedByDate.map(([date, daySlots]) => (
            <div key={date} className={styles.dayBlock}>
              <h3 className={styles.dayHeading}>{formatDayHeading(date)}</h3>
              <ul className={styles.grid}>
                {daySlots.map((slot) => (
                  <SlotCard key={slot._id} slot={slot} />
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  )
}

function formatDayHeading(iso: string) {
  try {
    const d = new Date(iso + 'T12:00:00')
    return d.toLocaleDateString(undefined, {weekday: 'long', month: 'short', day: 'numeric'})
  } catch {
    return iso
  }
}

function SlotCard({slot}: {slot: LabSlotDoc}) {
  const max = Math.max(1, slot.maxSpots ?? 12)
  const filled = Math.min(Math.max(0, slot.filledSpots ?? 0), max)
  const pct = Math.round((filled / max) * 100)
  const status = slotStatus(filled, max)

  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <div>
          <p className={styles.time}>{slot.time}</p>
          <p className={styles.slotTitle}>{slot.title}</p>
        </div>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>{STATUS_LABEL[status]}</span>
      </div>
      <div className={styles.barTrack} role="progressbar" aria-valuenow={filled} aria-valuemin={0} aria-valuemax={max}>
        <div className={styles.barFill} style={{width: `${pct}%`}} />
      </div>
      <p className={styles.count}>
        {filled} of {max} spots filled
      </p>
    </li>
  )
}
