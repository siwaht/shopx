"use client"

import React from "react"
import { useState } from "react"
import { ArrowRight, Check, Gift, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-24 sm:py-32 lg:py-48 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 sm:w-[500px] lg:w-[700px] h-80 sm:h-[500px] lg:h-[700px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] bg-accent/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.12] backdrop-elegant text-xs sm:text-sm tracking-[0.2em] uppercase mb-8 sm:mb-10 shadow-elegant font-medium">
              <Gift className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              Exclusive Benefits
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-5 sm:mb-7 text-balance drop-shadow-sm">
              Join the World of MAISON
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-[1.7] opacity-95 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-light">
              Be the first to discover new collections, receive exclusive invitations to private events,
              and enjoy 15% off your first order.
            </p>
            
            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 justify-center lg:justify-start text-sm sm:text-base">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/25 backdrop-elegant flex items-center justify-center shrink-0 shadow-elegant">
                  <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="font-medium">Early Access</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/25 backdrop-elegant flex items-center justify-center shrink-0 shadow-elegant">
                  <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="font-medium">Exclusive Events</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/25 backdrop-elegant flex items-center justify-center shrink-0 shadow-elegant">
                  <Gift className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="font-medium">15% Off First Order</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/[0.08] backdrop-elegant rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-14 shadow-elegant-lg border border-white/10">
            {isSubmitted ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Check className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl mb-2 sm:mb-3">Welcome to MAISON</h3>
                <p className="opacity-80 text-sm sm:text-base">
                  Thank you for subscribing. Check your inbox for your exclusive welcome offer.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" />
                  <p className="text-xs sm:text-sm tracking-[0.1em] uppercase opacity-70">Newsletter</p>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">Stay in the Loop</h3>
                <p className="opacity-80 mb-6 sm:mb-8 text-sm sm:text-base">
                  Enter your email to receive updates on new arrivals and exclusive offers.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError("") }}
                      required
                      className="h-14 sm:h-16 bg-white/[0.08] border-white/25 placeholder:text-white/60 text-white focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:border-accent/50 rounded-lg px-6 sm:px-7 text-base sm:text-lg font-light shadow-elegant backdrop-elegant"
                    />
                    {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="h-14 sm:h-16 bg-accent text-accent-foreground hover:bg-accent/90 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold group rounded-lg shadow-elegant-lg hover:shadow-2xl hover:glow-accent transition-all duration-500 hover:-translate-y-0.5"
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2.5 h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
                <p className="text-[10px] sm:text-xs opacity-60 mt-3 sm:mt-4 text-center">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
