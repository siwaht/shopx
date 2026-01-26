"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number | null
  image: string
  category: string
  color: string
  quantity: number
}

export interface ShippingInfo {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface OrderConfirmation {
  orderId: string
  items: CartItem[]
  shipping: ShippingInfo
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  estimatedDelivery: string
}

export type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  recentlyAdded: number | null
  checkoutStep: CheckoutStep
  setCheckoutStep: (step: CheckoutStep) => void
  shippingInfo: ShippingInfo | null
  setShippingInfo: (info: ShippingInfo) => void
  orderConfirmation: OrderConfirmation | null
  setOrderConfirmation: (order: OrderConfirmation | null) => void
  isCheckoutOpen: boolean
  setIsCheckoutOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    
    // Show recently added indicator
    setRecentlyAdded(item.id)
    setTimeout(() => setRecentlyAdded(null), 2000)
    
    // Open cart drawer
    setIsCartOpen(true)
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        recentlyAdded,
        checkoutStep,
        setCheckoutStep,
        shippingInfo,
        setShippingInfo,
        orderConfirmation,
        setOrderConfirmation,
        isCheckoutOpen,
        setIsCheckoutOpen,
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
