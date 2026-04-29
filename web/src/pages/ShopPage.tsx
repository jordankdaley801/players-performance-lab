import {type FormEvent, useState} from 'react'
import {Button} from '@/components/Button'
import styles from './ShopPage.module.css'

export function ShopPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const list = JSON.parse(localStorage.getItem('ppl-shop-notify') || '[]') as string[]
    list.push(email.trim())
    localStorage.setItem('ppl-shop-notify', JSON.stringify(list))
    setSent(true)
    setEmail('')
  }

  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Players Fieldhouse Apparel</h1>
        <p className={styles.sub}>Gear dropping soon — rep the Fieldhouse.</p>

        <div className={styles.formCard}>
          <p className={styles.formLabel}>Get notified when the shop goes live</p>
          {sent ? (
            <p className={styles.success} role="status">
              You&apos;re on the list. We&apos;ll email you when we open.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.srLabel} htmlFor="shop-email">
                Email
              </label>
              <input
                id="shop-email"
                className={styles.input}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit">Notify Me</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
