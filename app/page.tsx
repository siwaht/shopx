"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { FeaturedCollection } from "@/components/landing/featured-collection"
import { BestSellers } from "@/components/landing/best-sellers"
import { Footer } from "@/components/landing/footer"
import { CartDrawer } from "@/components/landing/cart-drawer"
import { CheckoutModal } from "@/components/landing/checkout-modal"
import { LegalModals } from "@/components/landing/legal-modals"
import { CartProvider } from "@/lib/cart-context"
import { ContentProvider } from "@/lib/content-context"

type ModalType = "privacy" | "terms" | null

export default function LandingPage() {
  const [legalModal, setLegalModal] = useState<ModalType>(null)

  return (
    <ContentProvider>
      <CartProvider>
        <main className="scroll-smooth">
          <Header />
          <Hero />
          <FeaturedCollection />
          <BestSellers />
          <Footer onOpenLegal={setLegalModal} />
          <CartDrawer />
          <CheckoutModal />
          <LegalModals openModal={legalModal} setOpenModal={setLegalModal} />
        </main>
      </CartProvider>
    </ContentProvider>
  )
}
