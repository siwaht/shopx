"use client"

import React from "react"
import { useState } from "react"
import { ArrowRight, Check, Gift, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 sm:py-28 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 sm:w-[400px] lg:w-[600px] h-72 sm:h-[400px] lg:h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 text-xs sm:text-sm tracking-[0.15em] uppercase mb-6 sm:mb-8">
              <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Exclusive Benefits
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-6 text-balance">
              Join the World of MAISON
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed opacity-90 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Be the first to discover new collections, receive exclusive invitations to private events, 
              and enjoy 15% off your first order.
            </p>
            
            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span>Early Access</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span>Exclusive Events</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                  <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span>15% Off First Order</span>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 sm:h-14 bg-white/10 border-white/20 placeholder:text-white/50 text-white focus-visible:ring-accent rounded-full px-5 sm:px-6 text-sm sm:text-base"
                  />
                  <Button
                    type="submit"
                    className="h-12 sm:h-14 bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm tracking-[0.15em] uppercase group rounded-full"
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
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
