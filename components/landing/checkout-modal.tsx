"use client"

import { useState } from "react"
import Image from "next/image"
import {
  X,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  Loader2,
  Lock,
  Package,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart, type ShippingInfo } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Complete", icon: Check },
] as const

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
]

interface FormErrors {
  [key: string]: string
}

export function CheckoutModal() {
  const {
    items,
    totalPrice,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    setShippingInfo,
    setOrderConfirmation,
    setIsCartOpen,
  } = useCart()

  const [formData, setFormData] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const freeShippingThreshold = 500
  const shippingCost = totalPrice >= freeShippingThreshold ? 0 : 25
  const taxRate = 0.08
  const tax = totalPrice * taxRate
  const orderTotal = totalPrice + shippingCost + tax

  const validateShipping = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required"
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = (): boolean => {
    const newErrors: FormErrors = {}

    if (!cardData.name) newErrors.cardName = "Cardholder name is required"
    
    const cardNumber = cardData.number.replace(/\s/g, "")
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    if (!cardData.expiry) {
      newErrors.cardExpiry = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.cardExpiry = "Use MM/YY format"
    } else {
      const [month, year] = cardData.expiry.split("/").map(Number)
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1
      if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.cardExpiry = "Card has expired"
      }
    }

    if (!cardData.cvc) {
      newErrors.cardCvc = "CVC is required"
    } else if (!/^\d{3,4}$/.test(cardData.cvc)) {
      newErrors.cardCvc = "Please enter a valid CVC"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingSubmit = () => {
    if (validateShipping()) {
      setShippingInfo(formData)
      setCheckoutStep("payment")
    }
  }

  const handlePaymentSubmit = async () => {
    if (!validatePayment()) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order ID
    const newOrderId = `MAISON-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setOrderId(newOrderId)

    // Calculate estimated delivery (5-7 business days)
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7)
    const estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })

    setOrderConfirmation({
      orderId: newOrderId,
      items: [...items],
      shipping: formData,
      subtotal: totalPrice,
      shipping_cost: shippingCost,
      tax: tax,
      total: orderTotal,
      estimatedDelivery,
    })

    setIsProcessing(false)
    setOrderComplete(true)
    setCheckoutStep("confirmation")
    clearCart()
  }

  const handleClose = () => {
    setIsCheckoutOpen(false)
    if (orderComplete) {
      // Reset everything after closing confirmation
      setTimeout(() => {
        setCheckoutStep("shipping")
        setOrderComplete(false)
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "United States",
          phone: "",
        })
        setCardData({ number: "", expiry: "", cvc: "", name: "" })
        setErrors({})
      }, 300)
    }
  }

  const handleBack = () => {
    if (checkoutStep === "payment") {
      setCheckoutStep("shipping")
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === checkoutStep)

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-hidden p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="font-serif text-xl sm:text-2xl">
              {orderComplete ? "Order Confirmed" : "Checkout"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10 -mr-2 hover:bg-muted transition-colors"
              aria-label="Close checkout"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          {!orderComplete && (
            <nav className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-1" aria-label="Checkout progress">
              {STEPS.map((step, index) => {
                const isActive = step.id === checkoutStep
                const isCompleted = index < currentStepIndex
                const StepIcon = step.icon

                return (
                  <div key={step.id} className="flex items-center shrink-0">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-sm font-medium",
                        isActive && "bg-primary text-primary-foreground shadow-md",
                        isCompleted && "bg-primary/10 text-primary",
                        !isActive && !isCompleted && "bg-secondary text-muted-foreground"
                      )}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {isCompleted ? (
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      ) : (
                        <StepIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      )}
                      <span className="hidden xs:inline sm:inline">{step.label}</span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-0.5 sm:mx-2 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                )
              })}
            </nav>
          )}
        </DialogHeader>

        {/* Scrollable Content Area - Stacked Layout */}
        <div className="overflow-y-auto max-h-[60vh] border-t border-border">
          {/* Order Summary - Always at top when not complete */}
          {!orderComplete && (
            <div className="bg-muted/30 p-5 sm:p-6 border-b border-border">
              <h3 className="font-medium text-base mb-4">Order Summary</h3>
              
              {/* Items - Horizontal scroll on mobile, grid on larger */}
              <div className="flex gap-4 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 min-w-[200px] sm:min-w-0 sm:flex-1">
                    <div className="relative h-16 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-background border border-border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground mb-1">{item.color}</p>
                      <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals - Compact horizontal layout */}
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className={cn("font-medium", shippingCost === 0 && "text-primary")}>
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tax (8%):</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-base ml-auto">
                  <span>Total:</span>
                  <span className="font-serif text-lg">{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-5 sm:p-6">
            {/* Shipping Form */}
            {checkoutStep === "shipping" && (
              <div className="space-y-6">
                {/* Contact Information */}
                <section>
                  <h3 className="font-medium text-base mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={cn("mt-1.5 h-12", errors.email && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={cn("mt-1.5 h-12", errors.phone && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Shipping Address */}
                <section>
                  <h3 className="font-medium text-base mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    {/* First & Last Name - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={cn("mt-1.5 h-12", errors.firstName && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={cn("mt-1.5 h-12", errors.lastName && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Street Address */}
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={cn("mt-1.5 h-12", errors.address && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.address && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          {errors.address}
                        </p>
                      )}
                    </div>
                    
                    {/* Apartment */}
                    <div>
                      <Label htmlFor="apartment" className="text-sm font-medium">
                        Apartment, suite, etc. <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="apartment"
                        placeholder="Apt 4B"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="mt-1.5 h-12"
                      />
                    </div>
                    
                    {/* City & State - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={cn("mt-1.5 h-12", errors.city && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger 
                            id="state"
                            className={cn("mt-1.5 h-12", errors.state && "border-destructive focus-visible:ring-destructive")}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* ZIP & Country - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-medium">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className={cn("mt-1.5 h-12", errors.zipCode && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.zipCode && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                        <Input
                          id="country"
                          value="United States"
                          disabled
                          className="mt-1.5 h-12 bg-muted text-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Payment Form */}
            {checkoutStep === "payment" && (
              <div className="space-y-6">
                <section>
                  <h3 className="font-medium text-base mb-4">Payment Method</h3>
                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg mb-5 flex items-center gap-3">
                    <Lock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Your payment information is encrypted and secure</span>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Cardholder Name */}
                    <div>
                      <Label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className={cn("mt-1.5 h-12", errors.cardName && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.cardName && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                    
                    {/* Card Number */}
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                          maxLength={19}
                          className={cn("h-12 pr-12", errors.cardNumber && "border-destructive focus-visible:ring-destructive")}
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    
                    {/* Expiry & CVC - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry" className="text-sm font-medium">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                          maxLength={5}
                          className={cn("mt-1.5 h-12", errors.cardExpiry && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.cardExpiry && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.cardExpiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cardCvc" className="text-sm font-medium">CVC</Label>
                        <Input
                          id="cardCvc"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, "") })}
                          maxLength={4}
                          className={cn("mt-1.5 h-12", errors.cardCvc && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.cardCvc && (
                          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            {errors.cardCvc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Shipping Summary */}
                <section className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-medium">Shipping to:</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </section>
              </div>
            )}

            {/* Order Confirmation */}
            {checkoutStep === "confirmation" && orderComplete && (
              <div className="text-center py-4 sm:py-8">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Check className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl mb-2">Thank You for Your Order!</h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                  Your order has been placed successfully
                </p>
                
                <div className="bg-secondary/30 rounded-lg p-4 sm:p-6 text-left mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Order Number</p>
                      <p className="font-mono font-medium text-sm sm:text-base">{orderId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Delivery</p>
                      <p className="font-medium text-sm sm:text-base">5-7 Business Days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Shipping to:</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  A confirmation email has been sent to <span className="font-medium text-foreground">{formData.email}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-border bg-background">
          {/* Trust badges */}
          {!orderComplete && (
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary/70" />
                <span>Secure 256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary/70" />
                <span>Free shipping over $500</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            {checkoutStep === "payment" && !orderComplete && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="h-12 sm:h-14 px-6 rounded-full border-2 bg-transparent font-medium active:scale-95 transition-transform"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            
            {checkoutStep === "shipping" && (
              <Button
                onClick={handleShippingSubmit}
                className="flex-1 h-12 sm:h-14 rounded-full text-sm tracking-wide uppercase font-medium shadow-sm active:scale-[0.98] transition-transform"
              >
                Continue to Payment
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {checkoutStep === "payment" && !orderComplete && (
              <Button
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="flex-1 h-12 sm:h-14 rounded-full text-sm tracking-wide uppercase font-medium shadow-sm active:scale-[0.98] transition-transform disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay {formatPrice(orderTotal)}
                  </>
                )}
              </Button>
            )}

            {orderComplete && (
              <Button
                onClick={handleClose}
                className="flex-1 h-12 sm:h-14 rounded-full text-sm tracking-wide uppercase font-medium shadow-sm active:scale-[0.98] transition-transform"
              >
                Continue Shopping
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
