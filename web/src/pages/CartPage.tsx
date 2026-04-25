import {Link} from 'react-router-dom'
import {Button} from '@/components/Button'
import {useCart} from '@/context/CartContext'
import styles from './CartPage.module.css'

export function CartPage() {
  const {lines, setQty, remove, subtotal, clear} = useCart()

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <p className={styles.kicker}>Checkout</p>
        <h1 className={styles.title}>Your cart</h1>
        {lines.length === 0 ? (
          <p className={styles.empty}>
            Your bag is empty.{' '}
            <Link to="/shop" className={styles.link}>
              Browse the shop →
            </Link>
          </p>
        ) : (
          <>
            <ul className={styles.list}>
              {lines.map(({product, qty}) => (
                <li key={product.id} className={styles.row}>
                  <img src={product.image} alt="" className={styles.thumb} />
                  <div className={styles.meta}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.price}>${product.price.toFixed(2)} each</p>
                  </div>
                  <label className={styles.qty}>
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(product.id, Number(e.target.value))}
                    />
                  </label>
                  <p className={styles.lineTotal}>${(product.price * qty).toFixed(2)}</p>
                  <button type="button" className={styles.remove} onClick={() => remove(product.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.summary}>
              <div>
                <p className={styles.subLabel}>Subtotal</p>
                <p className={styles.subValue}>${subtotal.toFixed(2)}</p>
                <p className={styles.note}>Taxes & shipping calculated at payment — demo only.</p>
              </div>
              <div className={styles.summaryActions}>
                <Button type="button" variant="ghost" onClick={clear}>
                  Clear cart
                </Button>
                <Button type="button">Continue to payment</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
