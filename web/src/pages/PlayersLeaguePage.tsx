import {Link} from 'react-router-dom'
import btnStyles from '@/components/Button.module.css'
import styles from './PlayersLeaguePage.module.css'

const playersLeagueDivisions = [7, 8, 9, 10, 11, 12, 13, 14] as const

export function PlayersLeaguePage() {
  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.kicker}>The Players League</p>
        <h1 className={styles.title}>League play for 7U through 14U</h1>
        <p className={styles.lead}>
          Register your team by division. We will confirm your spot, scheduling, and next steps after you submit.
          Spanish Fork, Utah — at The Fieldhouse.
        </p>
        <div className={styles.divisionGrid}>
          {playersLeagueDivisions.map((age) => {
            const label = `${age}U`
            return (
              <article key={label} className={styles.divisionCard}>
                <h2 className={styles.divisionTitle}>{label}</h2>
                <p className={styles.divisionText}>Open registration for the {label} age group.</p>
                <Link to={`/register/${age}u`} className={`${btnStyles.btn} ${btnStyles.primary}`}>
                  Register Now
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
