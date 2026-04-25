import {Link, NavLink} from 'react-router-dom'
import type {ReactNode} from 'react'
import {useCart} from '@/context/CartContext'
import {useMember} from '@/context/MemberContext'
import styles from './Layout.module.css'

const nav = [
  {to: '/', label: 'Home'},
  {to: '/performance-lab', label: 'Performance Lab'},
  {to: '/fieldhouse', label: 'The Fieldhouse'},
  {to: '/members', label: 'Members'},
  {to: '/shop', label: 'Shop'},
]

export function Layout({children}: {children: ReactNode}) {
  const {count} = useCart()
  const {member} = useMember()
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden />
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>Players Performance Lab</span>
              <span className={styles.brandSub}>The Fieldhouse · Spanish Fork, UT</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            {nav.map(({to, label}) => (
              <NavLink
                key={to}
                to={to}
                className={({isActive}) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()
                }
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.headerActions}>
            {member ? (
              <span className={styles.memberPill} title={member.email}>
                Hi, {member.name.split(' ')[0]}
              </span>
            ) : null}
            <Link to="/cart" className={styles.cartLink}>
              Cart
              {count > 0 ? <span className={styles.cartBadge}>{count}</span> : null}
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.footerLead}>Train with purpose. Measure what matters.</p>
            <p className={styles.footerMuted}>
              Seven teams · ~70 members · Four cages for open training when team blocks allow.
            </p>
          </div>
          <div>
            <h3 className={styles.footerHeading}>Visit</h3>
            <p>
              <a
                className={styles.footerLink}
                href="https://maps.google.com/?q=1432+W+3470+N+Spanish+Fork+UT"
                target="_blank"
                rel="noreferrer"
              >
                1432 W 3470 N
                <br />
                Spanish Fork, UT
              </a>
            </p>
          </div>
          <div>
            <h3 className={styles.footerHeading}>Contact</h3>
            <p>
              <a className={styles.footerLink} href="tel:+18016645663">
                801-664-5663
              </a>
            </p>
            <p className={styles.footerMuted}>Text-friendly during business hours.</p>
          </div>
        </div>
        <p className={styles.footerLegal}>
          © {new Date().getFullYear()} Players Performance Lab. Player Performance Lab with KinetiQ is open to the
          public. Team memberships and cage access are for enrolled facility members.
        </p>
      </footer>
    </div>
  )
}
