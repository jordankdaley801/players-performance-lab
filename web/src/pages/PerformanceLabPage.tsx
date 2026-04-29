import btnStyles from '@/components/Button.module.css'
import {PERFORMANCE_LAB_PACKAGES, VAGARO_BOOK_URL} from '@/data/performanceLabPackages'
import styles from './PerformanceLabPage.module.css'

export function PerformanceLabPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Players Performance Lab + KinetiQ</h1>
          <p className={styles.lead}>
            Strength, speed, and field-tested metrics for baseball and football athletes.
          </p>
        </div>
      </section>

      <section className={styles.packagesSection}>
        <div className={styles.wrap}>
          <p className={styles.banner} role="note">
            Players Team Members save $50/mo on every package — log in to see member pricing.
          </p>
          <div className={styles.cardGrid}>
            {PERFORMANCE_LAB_PACKAGES.map((pkg) => (
              <article key={pkg.name} className={styles.card}>
                <h2 className={styles.cardName}>{pkg.name}</h2>
                <p className={styles.cardFreq}>{pkg.frequency.replace('×', 'x').replace(/\s*\/\s*/, '/').replace(/\s/g, '')}</p>
                <p className={styles.pricePublic}>${pkg.priceRegular}/mo</p>
                <p className={styles.priceMember}>${pkg.priceMember}/mo</p>
                <p className={styles.saveLabel}>Members save $50/mo</p>
                <a
                  href={VAGARO_BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`${btnStyles.btn} ${btnStyles.primary} ${styles.cardCta}`}
                >
                  Book Now →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
