import {Link, NavLink} from 'react-router-dom'
import type {ReactNode} from 'react'
import {useCart} from '@/context/CartContext'
import {useMember} from '@/context/MemberContext'
import styles from './Layout.module.css'

type NavItem = {
  to: string
  label: string
  hashLink?: boolean
}

const nav: NavItem[] = [
  {to: '/', label: 'Home'},
  {to: '/performance-lab', label: 'Performance Lab'},
  {to: '/fieldhouse', label: 'The Fieldhouse'},
  {to: '/#players-league', label: 'The Players League', hashLink: true},
  {to: '/members', label: 'Members'},
  {to: '/shop', label: 'Shop'},
]

const socialLinks = {
  facebook: 'https://www.instagram.com/players.performance.lab/',
  instagram: 'https://www.instagram.com/playersfieldhouse/',
}

export function Layout({children}: {children: ReactNode}) {
  const {count} = useCart()
  const {member} = useMember()
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            <img src="/logo.png" alt="" className={styles.brandMark} width={44} height={44} decoding="async" />
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>Players Fieldhouse</span>
              <span className={styles.brandSub}>The Fieldhouse · Spanish Fork, UT</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            {nav.map(({to, label, hashLink}) =>
              hashLink ? (
                <a key={to} href={to} className={styles.navLink}>
                  {label}
                </a>
              ) : (
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
              ),
            )}
          </nav>
          <div className={styles.headerActions}>
            {member ? (
              <span className={styles.memberPill} title={member.email}>
                Hi, {member.name.split(' ')[0]}
              </span>
            ) : null}
            <div className={styles.socialLinks} aria-label="Social media">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden className={styles.socialIcon}>
                  <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.3v2.4H8v3.2h2.7V22h2.8z" />
                </svg>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden className={styles.socialIcon}>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2.3A2.7 2.7 0 0 0 4.3 7v10A2.7 2.7 0 0 0 7 19.7h10a2.7 2.7 0 0 0 2.7-2.7V7A2.7 2.7 0 0 0 17 4.3H7zm10.8 1.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4z" />
                </svg>
              </a>
            </div>
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
