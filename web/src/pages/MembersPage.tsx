import {type FormEvent, useMemo, useState} from 'react'
import {Button} from '@/components/Button'
import {useMember} from '@/context/MemberContext'
import styles from './MembersPage.module.css'

const cages = [
  {id: 1, label: 'Cage 1 — Hitters'},
  {id: 2, label: 'Cage 2 — Velocity'},
  {id: 3, label: 'Cage 3 — Tee work'},
  {id: 4, label: 'Cage 4 — Live arm'},
]

/** Demo slots: members book 1h blocks outside team practices (simplified grid). */
const timeSlots = ['3:00p', '4:00p', '5:00p', '6:00p', '7:00p', '8:00p']

function addDays(base: Date, n: number) {
  const d = new Date(base)
  d.setDate(d.getDate() + n)
  return d
}

function formatDay(d: Date) {
  return d.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})
}

function iso(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function MembersPage() {
  const {member, signIn, signOut, bookings, addBooking, cancelBooking, updateCardPlaceholder, lastCardUpdate} =
    useMember()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pickDateIdx, setPickDateIdx] = useState(0)
  const [pickCage, setPickCage] = useState(1)
  const [pickSlot, setPickSlot] = useState(timeSlots[2])

  const days = useMemo(() => {
    const start = new Date()
    start.setHours(12, 0, 0, 0)
    return Array.from({length: 7}, (_, i) => addDays(start, i))
  }, [])

  const selectedDate = days[pickDateIdx]!

  function handleSignIn(e: FormEvent) {
    e.preventDefault()
    signIn(email.trim(), name.trim())
  }

  function handleBook(e: FormEvent) {
    e.preventDefault()
    if (!member) return
    const label = cages.find((c) => c.id === pickCage)?.label ?? `Cage ${pickCage}`
    addBooking({
      cageId: pickCage,
      label,
      date: iso(selectedDate),
      start: pickSlot,
      end: '1 hr block',
    })
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Member access</p>
          <h1 className={styles.title}>Manage membership · Book cage time</h1>
          <p className={styles.lead}>
            Seven teams and about 70 paying members use The Fieldhouse. Membership is $85/month. When cages are not
            reserved for team practices, members can claim individual cage rentals from this hub.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          {!member ? (
            <div className={styles.authCard}>
              <h2>Sign in to your member account</h2>
              <p className={styles.muted}>
                Demo sign-in — no password. In production, connect SSO or magic links and sync billing from your
                payments provider.
              </p>
              <form className={styles.form} onSubmit={handleSignIn}>
                <label>
                  Full name
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Daley" />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                  />
                </label>
                <Button type="submit">Continue</Button>
              </form>
            </div>
          ) : (
            <div className={styles.memberGrid}>
              <article className={styles.card}>
                <h2>Membership</h2>
                <p className={styles.big}>{member.name}</p>
                <p className={styles.muted}>{member.email}</p>
                <dl className={styles.dl}>
                  <div>
                    <dt>Monthly dues</dt>
                    <dd>${member.membershipMonthly}/mo</dd>
                  </div>
                  <div>
                    <dt>Next billing</dt>
                    <dd>{member.nextBilling}</dd>
                  </div>
                  <div>
                    <dt>Teams on-site</dt>
                    <dd>7 programs · ~70 athletes</dd>
                  </div>
                </dl>
                <div className={styles.actions}>
                  <Button type="button" variant="outline" onClick={updateCardPlaceholder}>
                    Update payment method
                  </Button>
                  <Button type="button" variant="outline" onClick={signOut}>
                    Sign out
                  </Button>
                </div>
                {lastCardUpdate ? (
                  <p className={styles.hint}>Card details placeholder saved at {new Date(lastCardUpdate).toLocaleString()}.</p>
                ) : (
                  <p className={styles.hint}>Pause or cancel anytime through the office — digital self-serve coming soon.</p>
                )}
              </article>

              <article className={styles.card}>
                <h2>Book a cage</h2>
                <p className={styles.muted}>
                  Four cages rotate around team practices. Pick a day and slot — confirmations save to this device for
                  the demo.
                </p>
                <form className={styles.bookForm} onSubmit={handleBook}>
                  <label>
                    Day
                    <select value={pickDateIdx} onChange={(e) => setPickDateIdx(Number(e.target.value))}>
                      {days.map((d, i) => (
                        <option key={iso(d)} value={i}>
                          {formatDay(d)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Cage
                    <select value={pickCage} onChange={(e) => setPickCage(Number(e.target.value))}>
                      {cages.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Start time
                    <select value={pickSlot} onChange={(e) => setPickSlot(e.target.value)}>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button type="submit">Reserve cage</Button>
                </form>
              </article>
            </div>
          )}
        </div>
      </section>

      {member && bookings.length > 0 ? (
        <section className={styles.sectionAlt}>
          <div className={styles.wrap}>
            <h2>Your upcoming cage sessions</h2>
            <ul className={styles.bookingList}>
              {bookings.map((b) => (
                <li key={b.id} className={styles.bookingItem}>
                  <div>
                    <p className={styles.bookingTitle}>{b.label}</p>
                    <p className={styles.muted}>
                      {b.date} · Starts {b.start} · {b.end}
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={() => cancelBooking(b.id)}>
                    Cancel
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {member ? (
        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2>Live availability (demo)</h2>
            <p className={styles.muted}>
              Gray cells mimic team practices. Open cells are first-come in this prototype — connect to Google
              Calendar or your scheduling API for real guardrails.
            </p>
            <div className={styles.gridScroll}>
              <table className={styles.availTable}>
                <thead>
                  <tr>
                    <th>Time</th>
                    {cages.map((c) => (
                      <th key={c.id}>{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((t, rowIdx) => (
                    <tr key={t}>
                      <th>{t}</th>
                      {cages.map((c, colIdx) => {
                        const blocked = (rowIdx + colIdx) % 3 === 0
                        return (
                          <td key={c.id} className={blocked ? styles.blocked : styles.open}>
                            {blocked ? 'Team' : 'Open'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
