import {type FormEvent, useState} from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'
import styles from './RegisterDivisionPage.module.css'

const VALID_DIVISIONS = new Set(['7u', '8u', '9u', '10u', '11u', '12u', '13u', '14u'])

const STORAGE_KEY = 'players-league-registrations'

type FormState = {
  teamName: string
  headCoachName: string
  coachEmail: string
  coachPhone: string
  city: string
}

const initialForm: FormState = {
  teamName: '',
  headCoachName: '',
  coachEmail: '',
  coachPhone: '',
  city: '',
}

export function RegisterDivisionPage() {
  const {division: divisionParam} = useParams<{division: string}>()
  const normalized = divisionParam?.toLowerCase().trim() ?? ''

  const isValid = Boolean(normalized && VALID_DIVISIONS.has(normalized))
  const divisionLabel = isValid ? normalized.toUpperCase() : ''

  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const payload = {
      ...form,
      ageDivision: divisionLabel,
      submittedAt: new Date().toISOString(),
    }
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as unknown[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...prev]))
    setSubmitted(true)
    setForm(initialForm)
  }

  if (!isValid) {
    return <Navigate to="/players-league" replace />
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.kicker}>The Players League</p>
        <h1 className={styles.title}>Team registration</h1>
        <p className={styles.subtitle}>
          Register for the <strong>{divisionLabel}</strong> division. We will follow up to confirm your spot and
          next steps.
        </p>

        {submitted ? (
          <p className={styles.success} role="status">
            Thanks — your team details are on file. We will reach you at the coach email you provided.
          </p>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <span>Team Name</span>
            <input
              className={styles.input}
              name="teamName"
              required
              autoComplete="organization"
              value={form.teamName}
              onChange={(e) => setForm((f) => ({...f, teamName: e.target.value}))}
              placeholder="e.g. Utah Elite"
            />
          </label>

          <label className={styles.label}>
            <span>Head Coach Name</span>
            <input
              className={styles.input}
              name="headCoachName"
              required
              autoComplete="name"
              value={form.headCoachName}
              onChange={(e) => setForm((f) => ({...f, headCoachName: e.target.value}))}
            />
          </label>

          <label className={styles.label}>
            <span>Coach Email</span>
            <input
              className={styles.input}
              type="email"
              name="coachEmail"
              required
              autoComplete="email"
              value={form.coachEmail}
              onChange={(e) => setForm((f) => ({...f, coachEmail: e.target.value}))}
            />
          </label>

          <label className={styles.label}>
            <span>Coach Phone Number</span>
            <input
              className={styles.input}
              type="tel"
              name="coachPhone"
              required
              autoComplete="tel"
              value={form.coachPhone}
              onChange={(e) => setForm((f) => ({...f, coachPhone: e.target.value}))}
            />
          </label>

          <label className={styles.label}>
            <span>City</span>
            <input
              className={styles.input}
              name="city"
              required
              autoComplete="address-level2"
              value={form.city}
              onChange={(e) => setForm((f) => ({...f, city: e.target.value}))}
            />
          </label>

          <div className={styles.label}>
            <span>Age Division</span>
            <input className={styles.readonly} readOnly value={divisionLabel} tabIndex={-1} aria-label="Age division" />
            <p className={styles.hint}>Pre-filled from the division you selected.</p>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </form>

        <Link to="/players-league" className={styles.backLink}>
          ← Back to The Players League
        </Link>
      </div>
    </div>
  )
}
