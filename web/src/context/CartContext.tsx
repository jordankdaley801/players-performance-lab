import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from 'react'
import type {Product} from '@/data/shopProducts'

export type CartLine = {
  product: Product
  qty: number
}

type CartContextValue = {
  lines: CartLine[]
  add: (product: Product, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({children}: {children: ReactNode}) {
  const [lines, setLines] = useState<CartLine[]>([])

  const add = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id)
      if (i === -1) return [...prev, {product, qty}]
      const next = [...prev]
      next[i] = {...next[i], qty: next[i].qty + qty}
      return next
    })
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.product.id !== productId)
      return prev.map((l) => (l.product.id === productId ? {...l, qty} : l))
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    return {lines, add, setQty, remove, clear, subtotal, count}
  }, [lines, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
