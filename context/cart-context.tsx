"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface Order {
  code: string
  items: CartItem[]
  email: string
  address: string
  paymentMethod: string
  status: string
  date: string
}

interface CartContextType {
  items: CartItem[]
  orders: Order[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, size: string) => void
  clearCart: () => void
  getTotal: () => number
  addOrder: (order: Order) => void
  getOrderByCode: (code: string) => Order | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order])
  }

  const getOrderByCode = (code: string) => {
    return orders.find((o) => o.code === code)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addItem,
        removeItem,
        clearCart,
        getTotal,
        addOrder,
        getOrderByCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
