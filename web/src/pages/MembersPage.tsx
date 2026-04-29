import btnStyles from '@/components/Button.module.css'
import {VAGARO_BOOK_URL} from '@/data/performanceLabPackages'
import styles from './MembersPage.module.css'

const EZ_MEMBERSHIP = 'https://playersfieldhouse.ezfacility.com/Membership'

const cageRules = [
  'One cage per account per session — you cannot hold multiple cages at the same time.',
  'Cages 1–4 are available 6am–3pm daily for open booking.',
  'On Tuesday, Wednesday, and Thursday, Strength programs run 4–6pm — only Cages 1 and 2 are open to members during those hours.',
  'Team practices run Tuesday, Wednesday, and Thursday from 7–9pm — all cages are fully blocked for members during those windows.',
  'Saturday and Sunday are wide open for booking.',
] as const

export function MembersPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Member Hub</h1>
          <p className={styles.lead}>
            Everything your athlete needs — scheduling, cage booking, and program access in one place.
          </p>
        </div>
      </section>

      <section className={styles.membershipBand} aria-labelledby="membership-heading">
        <div className={styles.wrap}>
          <h2 id="membership-heading" className={styles.sectionHeading}>
            Monthly Membership
          </h2>
          <p className={styles.body}>
            $85/month for Players Baseball team athletes. Includes open cage access, member pricing on all Performance
            Lab packages, and priority scheduling.
          </p>
          <a
            href={EZ_MEMBERSHIP}
            target="_blank"
            rel="noreferrer"
            className={`${btnStyles.btn} ${btnStyles.primary} ${styles.cta}`}
          >
            Join as a Member →
          </a>
        </div>
      </section>

      <section className={styles.cageBand} aria-labelledby="cage-heading">
        <div className={styles.wrap}>
          <h2 id="cage-heading" className={styles.sectionHeadingLight}>
            Open Cage Booking
          </h2>
          <ul className={styles.rulesList}>
            {cageRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <a
            href={VAGARO_BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className={`${btnStyles.btn} ${btnStyles.primary} ${styles.cta}`}
          >
            Book a Cage →
          </a>
        </div>
      </section>
    </>
  )
}
