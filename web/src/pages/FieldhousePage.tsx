import facilityImg from '../../../658787398_17918018784322262_7187683999261033972_n.jpg'
import styles from './FieldhousePage.module.css'

export function FieldhousePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>The Fieldhouse</p>
          <h1 className={styles.title}>State-of-the-art indoor baseball · Spanish Fork</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.split}>
            <div>
              <h2>Welcome inside</h2>
              <div className={styles.prose}>
                <p>
                  Welcome to our state-of-the-art indoor baseball facility, a 6,000-square-foot space designed to
                  elevate your game. Whether you are a player looking to refine your skills or a team in need of
                  top-tier training space, our facility offers everything you need to succeed.
                </p>
                <p>
                  With dedicated areas for fielding, pitching, and hitting, athletes can perfect every aspect of their
                  game, from defensive drills to powerful swings. Our advanced pitching mounds and batting cages provide
                  an unmatched training environment, while our fully equipped arm care wall ensures that you can stay
                  in peak physical condition year-round.
                </p>
                <p>
                  Experience the ultimate in baseball training with premium equipment, ample space, and a professional
                  atmosphere tailored to help you reach your full potential.
                </p>
              </div>
              <a className={styles.mapLink} href="https://maps.google.com/?q=1432+W+3470+N+Spanish+Fork+UT">
                Open in Google Maps →
              </a>
            </div>
            <figure className={styles.figure}>
              <img src={facilityImg} alt="Athletes training inside The Fieldhouse" />
              <figcaption>Real training moments from The Fieldhouse community.</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}
