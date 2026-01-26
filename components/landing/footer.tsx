"use client"

import React from "react"

import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

type ModalType = "privacy" | "terms" | null

const footerLinks = [
  { name: "Shop", href: "#products" },
  { name: "Collections", href: "#collections" },
  { name: "Reviews", href: "#testimonials" },
]

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
]

interface FooterProps {
  onOpenLegal: (type: ModalType) => void
}

export function Footer({ onOpenLegal }: FooterProps) {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer id="contact" className="bg-card border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Brand */}
          <Link 
            href="#hero" 
            onClick={(e) => scrollToSection(e, "#hero")}
            className="font-serif text-xl sm:text-2xl tracking-[0.1em] sm:tracking-[0.15em] text-primary" 
            aria-label="MAISON - Back to top"
          >
            MAISON
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4" role="list" aria-label="Social media links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={`Follow MAISON on ${link.name}`}
                role="listitem"
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
          
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-border w-full justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2026 MAISON. All rights reserved.
            </p>
            <span className="hidden sm:block text-muted-foreground" aria-hidden="true">·</span>
            <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <button 
                onClick={() => onOpenLegal("privacy")}
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onOpenLegal("terms")}
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
