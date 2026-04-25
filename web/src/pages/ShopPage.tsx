import {useState} from 'react'
import {products, type Product} from '@/data/shopProducts'
import {useCart} from '@/context/CartContext'
import {Button} from '@/components/Button'
import styles from './ShopPage.module.css'

const categories = ['all', 'apparel', 'equipment', 'accessories'] as const

export function ShopPage() {
  const {add} = useCart()
  const [filter, setFilter] = useState<(typeof categories)[number]>('all')

  const list = filter === 'all' ? products : products.filter((p) => p.category === filter)

  function handleAdd(p: Product) {
    add(p, 1)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Fieldhouse shop</p>
          <h1 className={styles.title}>Apparel, tools, & training gear</h1>
          <p className={styles.lead}>
            Curated picks for cage work, velocity development, and everyday training. Checkout below is a polished
            demo — connect Shopify, Stripe, or your POS when you are ready to go live.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.filters}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={c === filter ? styles.filterActive : styles.filter}
                onClick={() => setFilter(c)}
              >
                {c === 'all' ? 'All gear' : c}
              </button>
            ))}
          </div>
          <div className={styles.grid}>
            {list.map((p) => (
              <article key={p.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={p.image} alt="" />
                  {p.badge ? <span className={styles.badge}>{p.badge}</span> : null}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cat}>{p.category}</p>
                  <h2>{p.name}</h2>
                  <p className={styles.price}>${p.price.toFixed(2)}</p>
                  <Button type="button" variant="outline" onClick={() => handleAdd(p)}>
                    Add to cart
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
