"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    recentlyAdded,
    setIsCheckoutOpen,
    setCheckoutStep,
  } = useCart()

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setCheckoutStep("shipping")
    setTimeout(() => setIsCheckoutOpen(true), 150)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const freeShippingThreshold = 500
  const progressToFreeShipping = Math.min((totalPrice / freeShippingThreshold) * 100, 100)
  const amountToFreeShipping = Math.max(freeShippingThreshold - totalPrice, 0)

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background flex flex-col p-0">
        <SheetHeader className="border-b border-border p-4 sm:p-6">
          <SheetTitle className="flex items-center gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="font-serif text-lg sm:text-xl">Shopping Bag</span>
              <p className="text-xs sm:text-sm font-normal text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-6">
              <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl mb-2">Your bag is empty</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-[200px]">
              Discover our curated collection of luxury fashion pieces
            </p>
            <Button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full px-6 sm:px-8 h-10 sm:h-11 text-sm"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="py-3 sm:py-4 px-4 sm:px-6 border-b border-border">
              {totalPrice >= freeShippingThreshold ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-primary">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="font-medium">You qualify for free shipping!</span>
                </div>
              ) : (
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Add <span className="font-medium text-foreground">{formatPrice(amountToFreeShipping)}</span> more for free shipping
                  </p>
                  <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500 rounded-full"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto py-3 sm:py-4 px-4 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300",
                      recentlyAdded === item.id && "bg-primary/5 ring-1 ring-primary/20"
                    )}
                  >
                    <div className="relative h-20 w-16 sm:h-24 sm:w-20 flex-shrink-0 overflow-hidden rounded-md sm:rounded-lg bg-secondary">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {recentlyAdded === item.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium text-xs sm:text-sm truncate">{item.name}</h4>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                            {item.color}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center gap-0.5 sm:gap-1 border border-border rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-xs sm:text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-[10px] sm:text-xs text-muted-foreground line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Subtotal */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{totalPrice >= freeShippingThreshold ? "Free" : "Calculated at checkout"}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-border">
                  <span className="text-sm sm:text-base">Total</span>
                  <span className="font-serif text-base sm:text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full h-11 sm:h-14 rounded-full text-xs sm:text-sm tracking-[0.1em] uppercase gap-2 group"
                onClick={handleProceedToCheckout}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                className="w-full h-10 sm:h-12 rounded-full text-xs sm:text-sm tracking-[0.1em] uppercase border-2 bg-transparent"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>Free Returns</span>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
