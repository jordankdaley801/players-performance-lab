import {Link} from 'react-router-dom'
import heroImg from '../../../PPL+KinetiQ.jpg'
import btnStyles from '@/components/Button.module.css'
import styles from './HomePage.module.css'

/** Served from web/public/hero.mp4 */
const HERO_VIDEO_SRC = '/hero.mp4'
const PERFORMANCE_LAB_SIGNUP_URL = 'https://playersfieldhouse.ezfacility.com/package'

const pillars = [
  {
    title: 'Team memberships',
    body: 'Seven teams train here with a simple $85/month membership — roughly 70 athletes calling this home.',
    to: '/members',
    cta: 'Member hub',
  },
  {
    title: 'Open cage time',
    body: 'Paid members book one of four cages whenever team blocks are not on the calendar.',
    to: '/members',
    cta: 'Book a cage',
  },
  {
    title: 'Performance Lab + KinetiQ',
    body: 'Strength, speed, and field-tested metrics for baseball and football athletes — expanding soon.',
    to: '/performance-lab',
    cta: 'View programs',
  },
]

const timeline = [
  {
    year: 'Today',
    title: 'The Fieldhouse',
    copy: 'A 6,000 sq. ft. indoor baseball facility built for serious development — fielding, pitching, hitting, arm care, and four premium cages.',
  },
  {
    year: 'Partnership',
    title: 'KinetiQ arrives',
    copy: 'We launched the Player Performance Lab with KinetiQ so athletes get doctoral-level coaching, small classes, and measurable progress.',
  },
  {
    year: 'Your turn',
    title: 'No long-term lock-in',
    copy: 'If it is not delivering value, stop anytime. If it is, you will see it in your numbers every 6–8 weeks.',
  },
]

export function HomePage() {
  return (
    <>
      <section className={styles.hero} data-home-hero>
        <div className={styles.heroMedia} aria-hidden>
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={heroImg}
            preload="metadata"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Greatness is trained</p>
            <h1 className={styles.heroTitle}>
              Performance you can measure.
              <br />
              <span className={styles.heroAccent}>Development you can trust.</span>
            </h1>
            <p className={styles.heroLead}>
              Train like a pro at The Fieldhouse — team practices, member cage rentals, and the Player Performance Lab
              powered by KinetiQ.
            </p>
            <div className={styles.heroCtas}>
              <a
                href={PERFORMANCE_LAB_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                className={`${btnStyles.btn} ${btnStyles.primary}`}
              >
                Start with Performance Lab
              </a>
              <Link to="/members" className={`${btnStyles.btn} ${btnStyles.ghost}`}>
                Member login & cages
              </Link>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div
              className={styles.heroCardImage}
              style={{backgroundImage: `url(${heroImg})`}}
              role="img"
              aria-label="Players Performance Lab with KinetiQ"
            />
            <div className={styles.heroCardBody}>
              <p className={styles.heroCardKicker}>Featured partnership</p>
              <p className={styles.heroCardTitle}>Player Performance Lab with KinetiQ</p>
              <p className={styles.heroCardText}>
                Public registration · $150–$200/mo · 2–3 small-group sessions per week · Parents welcome.
              </p>
              <Link to="/performance-lab" className={styles.textLink}>
                See schedule & pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionLight}>
        <div className={styles.wrap}>
          <p className={styles.sectionKicker}>What we do</p>
          <h2 className={styles.sectionTitle}>Helping athletes build strength, skills, & confidence</h2>
          <p className={styles.sectionLead}>
            Inspired by the best-in-class training destinations, we pair premium space with honest coaching and
            systems you can measure.
          </p>
          <div className={styles.pillars}>
            {pillars.map((p) => (
              <article key={p.title} className={styles.pillar}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link to={p.to} className={styles.pillarLink}>
                  {p.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.wrap}>
          <p className={styles.sectionKickerLight}>Our journey</p>
          <h2 className={styles.sectionTitleLight}>Built for athletes who want the full picture</h2>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <article key={item.title} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className={styles.shopTeaser}>
            <div>
              <p className={styles.sectionKickerLight}>Pro shop</p>
              <h2 className={styles.sectionTitleLight}>Gear up like you mean it</h2>
              <p className={styles.mutedLight}>
                Apparel, training tools, and accessories curated for cage work and velocity development.
              </p>
            </div>
            <Link to="/shop" className={`${btnStyles.btn} ${btnStyles.primary}`}>
              Shop the collection
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
