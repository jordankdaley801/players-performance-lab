import {type FormEvent, useMemo, useState} from 'react'
import flyerImg from '../../../PNG image.png'
import {Button} from '@/components/Button'
import {pplBenefits, pplScheduleBlocks} from '@/data/pplSchedule'
import styles from './PerformanceLabPage.module.css'

type Plan = '150' | '200'

const initialForm = {
  parentName: '',
  athleteName: '',
  athleteAge: '',
  email: '',
  phone: '',
  plan: '150' as Plan,
  sessionPreference: '',
  notes: '',
}

export function PerformanceLabPage() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const sessionOptions = useMemo(() => {
    const opts: string[] = []
    for (const block of pplScheduleBlocks) {
      for (const s of block.sessions) {
        if (s.full) continue
        opts.push(`${block.label} · ${s.time} · ${s.group}`)
      }
    }
    return opts
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const payload = {...form, submittedAt: new Date().toISOString()}
    const prev = JSON.parse(localStorage.getItem('ppl-registrations') || '[]') as unknown[]
    localStorage.setItem('ppl-registrations', JSON.stringify([payload, ...prev]))
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Players performance lab + KinetiQ</p>
          <h1 className={styles.title}>Strength & agility for athletes who want measured gains</h1>
          <p className={styles.lead}>
            Baseball and football today — more sports on the horizon. Small classes, parents welcome, and field-tested
            metrics every 6–8 weeks so every athlete knows exactly how they are improving.
          </p>
          <ul className={styles.badges}>
            <li>Parents welcome</li>
            <li>Small classes</li>
            <li>Limited availability</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.grid2}>
            <div>
              <h2>Why Players Performance Lab?</h2>
              <p className={styles.muted}>Guaranteed focus on outcomes you can feel on the field.</p>
              <ul className={styles.benefits}>
                {pplBenefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className={styles.commit}>
                <h3>No long-term commitment</h3>
                <p>
                  If it is not delivering value, you can stop anytime. If it is, you will see it in your numbers — we
                  track performance every 6–8 weeks with field-tested metrics.
                </p>
              </div>
            </div>
            <div className={styles.flyer}>
              <img src={flyerImg} alt="Players Performance Lab + KinetiQ program flyer" />
              <p className={styles.flyerCaption}>Official program flyer · The Fieldhouse · Spanish Fork</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.wrap}>
          <h2>Group schedule</h2>
          <p className={styles.muted}>
            Led by <strong>Coleby Clawson, PhD, DPT, CSCS</strong> — Director of Sports Medicine & Training at BYU
            Football. Doctor of Physical Therapy · PhD in Human & Sports Performance.
          </p>
          <div className={styles.scheduleGrid}>
            {pplScheduleBlocks.map((block) => (
              <article key={block.label} className={styles.scheduleCard}>
                <h3>{block.label}</h3>
                <ul>
                  {block.sessions.map((s) => (
                    <li key={s.time + s.group} className={s.full ? styles.slotFull : undefined}>
                      <span>{s.time}</span>
                      <span>{s.group}</span>
                      {s.full ? <em>Full</em> : null}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.callout}>
            Questions or waitlist for full sessions? Call <a href="tel:+18016645663">801-664-5663</a>.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.pricingGrid}>
            <article className={styles.priceCard}>
              <p className={styles.priceLabel}>2 sessions / week</p>
              <p className={styles.price}>$150</p>
              <p className={styles.per}>per month · public registration</p>
              <ul>
                <li>Small-group strength & agility</li>
                <li>Field testing cadence every 6–8 weeks</li>
                <li>Cancel any time</li>
              </ul>
            </article>
            <article className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <p className={styles.priceLabel}>3 sessions / week</p>
              <p className={styles.price}>$200</p>
              <p className={styles.per}>per month · best for rapid adaptation</p>
              <ul>
                <li>Everything in the 2-day track</li>
                <li>Extra exposure for speed & power</li>
                <li>Priority scheduling when slots tighten</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} id="register">
        <div className={styles.wrap}>
          <h2>Register online</h2>
          <p className={styles.lightMuted}>
            Tell us about your athlete. We will follow up to confirm placement, waivers, and billing. This demo saves
            submissions locally in your browser — wire it to your CRM or email when you are ready.
          </p>
          {submitted ? (
            <p className={styles.success} role="status">
              Thanks — your interest is recorded. We will reach out shortly at the email you provided.
            </p>
          ) : null}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label>
                Parent / guardian name
                <input
                  required
                  value={form.parentName}
                  onChange={(e) => setForm((f) => ({...f, parentName: e.target.value}))}
                />
              </label>
              <label>
                Athlete name
                <input
                  required
                  value={form.athleteName}
                  onChange={(e) => setForm((f) => ({...f, athleteName: e.target.value}))}
                />
              </label>
            </div>
            <div className={styles.formRow}>
              <label>
                Athlete age or grade
                <input
                  required
                  value={form.athleteAge}
                  onChange={(e) => setForm((f) => ({...f, athleteAge: e.target.value}))}
                />
              </label>
              <label>
                Phone
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({...f, phone: e.target.value}))}
                />
              </label>
            </div>
            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({...f, email: e.target.value}))}
              />
            </label>
            <div className={styles.formRow}>
              <fieldset className={styles.fieldset}>
                <legend>Training plan</legend>
                <label className={styles.radio}>
                  <input
                    type="radio"
                    name="plan"
                    checked={form.plan === '150'}
                    onChange={() => setForm((f) => ({...f, plan: '150'}))}
                  />
                  $150/mo — 2 sessions / week
                </label>
                <label className={styles.radio}>
                  <input
                    type="radio"
                    name="plan"
                    checked={form.plan === '200'}
                    onChange={() => setForm((f) => ({...f, plan: '200'}))}
                  />
                  $200/mo — 3 sessions / week
                </label>
              </fieldset>
              <label>
                Preferred open session
                <select
                  required
                  value={form.sessionPreference}
                  onChange={(e) => setForm((f) => ({...f, sessionPreference: e.target.value}))}
                >
                  <option value="">Select a slot</option>
                  {sessionOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Notes (sport, goals, injuries we should know about)
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm((f) => ({...f, notes: e.target.value}))}
              />
            </label>
            <Button type="submit">Submit registration</Button>
          </form>
        </div>
      </section>
    </>
  )
}
