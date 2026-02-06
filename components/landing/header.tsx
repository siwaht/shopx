"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { useContent } from "@/lib/content-context"
import { cn } from "@/lib/utils"
import { SearchModal } from "./search-modal"
import { AccountDropdown } from "./account-dropdown"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { totalItems, setIsCartOpen, recentlyAdded } = useCart()
  const { content } = useContent()
  
  // Filter out Contact tab as it's not used
  const navigation = content.header.menuItems.filter(item => item.label !== "Contact")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
      isScrolled
        ? "bg-background/85 backdrop-elegant shadow-elegant border-b border-border/60 py-2"
        : "bg-transparent py-6"
    )}>
      {/* Announcement bar - cleaner and subtler */}
      {content.header.showAnnouncement && (
        <div className={cn(
          "bg-primary text-primary-foreground text-center overflow-hidden transition-all duration-500 ease-in-out absolute top-0 left-0 right-0 z-[60]",
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )} role="banner" aria-label="Promotional announcement">
          <div className="py-3 px-4 flex items-center justify-center gap-3">
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
            <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">
              {content.header.announcement}
            </p>
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
          </div>
        </div>
      )}

      <nav className={cn(
        "mx-auto max-w-[1400px] px-6 sm:px-8 transition-all duration-500",
        isScrolled ? "mt-0" : "mt-8"
      )} role="navigation" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu */}
          <div className="flex lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent text-foreground/80 hover:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm bg-background p-0 border-r border-border/50" showCloseButton={false}>
                <div className="flex flex-col h-full bg-background/95 backdrop-blur-xl">
                  <div className="p-8 border-b border-border/50 flex items-center justify-between">
                    <Link href="/" className="font-serif text-2xl tracking-[0.1em] text-primary">
                      {content.header.logo}
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 index-10 hover:bg-muted/50 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex flex-col flex-1 overflow-y-auto p-8">
                    {/* Mobile Search Button */}
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 mb-8 h-12 text-muted-foreground bg-muted/30 border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        setIsOpen(false)
                        setTimeout(() => setIsSearchOpen(true), 200)
                      }}
                    >
                      <Search className="h-4 w-4" />
                      Search collections...
                    </Button>

                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-lg font-light tracking-wide py-3 border-b border-border/30 hover:text-primary hover:border-primary/30 transition-all active:pl-2"
                          onClick={(e) => {
                            scrollToSection(e, item.href)
                            setIsOpen(false)
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                      
                      <Link
                        href="/admin"
                        className="text-lg font-light tracking-wide py-3 border-b border-border/30 text-primary/80 hover:text-primary transition-all flex items-center gap-2 mt-4"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-border/50">
                      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4 font-medium">Contact Us</p>
                      <p className="text-sm text-foreground/80 font-light mb-1">concierge@maison.com</p>
                      <p className="text-sm text-foreground/80 font-light">+1 (888) 555-0123</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation - Left */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-start lg:gap-x-12">
            {navigation.slice(0, 3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary/50 transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center lg:flex-none">
            <Link href="/" className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.18em] text-primary hover:text-primary/80 transition-all duration-500 drop-shadow-sm" aria-label={`${content.header.logo} - Home`}>
              {content.header.logo}
            </Link>
          </div>

          {/* Desktop navigation - Right */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
            {navigation.slice(3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary/50 transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            ))}
            
            {/* Desktop Icons Group */}
            <div className="flex items-center gap-6 pl-4 border-l border-border/50 ml-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-transparent hover:text-primary p-0 h-auto w-auto transition-colors duration-300"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="h-4 w-4 stroke-[1.5]" />
              </Button>
              <AccountDropdown className="hidden sm:inline-flex" />
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-transparent hover:text-primary p-0 h-auto w-auto relative transition-colors duration-300",
                  recentlyAdded && "animate-pulse"
                )}
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping bag with ${totalItems} items`}
              >
                <ShoppingBag className="h-4 w-4 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className={cn(
                    "absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-primary text-primary-foreground text-[9px] font-medium flex items-center justify-center",
                    recentlyAdded && "scale-110"
                  )}>
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center gap-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-transparent p-0 h-auto w-auto"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-transparent p-0 h-auto w-auto relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
