"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

// Sample products for search - using existing product images
const searchableProducts = [
  { id: 1, name: "Royal Velvet Blazer", category: "Outerwear", price: 1495, image: "/images/product-blue-blazer.jpg" },
  { id: 2, name: "Marigold Cashmere Scarf", category: "Accessories", price: 385, image: "/images/product-yellow-scarf.jpg" },
  { id: 3, name: "Italian Leather Loafers", category: "Footwear", price: 595, image: "/images/bestseller-3.jpg" },
  { id: 4, name: "Amethyst Silk Dress", category: "Dresses", price: 1295, image: "/images/product-purple-dress.jpg" },
  { id: 5, name: "Coral Oversized Coat", category: "Outerwear", price: 1695, image: "/images/product-orange-coat.jpg" },
  { id: 6, name: "Saffron Leather Clutch", category: "Bags", price: 495, image: "/images/bestseller-6.jpg" },
  { id: 7, name: "Ocean Silk Tie", category: "Accessories", price: 185, image: "/images/bestseller-7.jpg" },
  { id: 8, name: "Linen Wide-Leg Trousers", category: "Trousers", price: 425, image: "/images/bestseller-4.jpg" },
]

const recentSearches = ["Silk tie", "Leather bag", "Cashmere"]
const trendingSearches = ["Summer collection", "New arrivals", "Bestsellers"]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof searchableProducts>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchableProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleClose = () => {
    setQuery("")
    setResults([])
    onClose()
  }

  const handleQuickAdd = (product: typeof searchableProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: null,
      image: product.image,
      category: product.category,
      color: product.category,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] p-0 gap-0 overflow-hidden" showCloseButton={false}>
        <DialogTitle className="sr-only">Search products</DialogTitle>
        
        {/* Search Input */}
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-border">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-sm sm:text-base placeholder:text-muted-foreground h-9 sm:h-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex-shrink-0"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          )}
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
          {query.trim().length === 0 ? (
            /* Show suggestions when no query */
            <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">Trending</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Quick Links</p>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {[
                    { label: "New Arrivals", section: "collections" },
                    { label: "Bestsellers", section: "products" },
                    { label: "Sale", section: "products" },
                    { label: "Gift Cards", section: "newsletter" },
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        handleClose()
                        const el = document.getElementById(link.section)
                        if (el) el.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="flex items-center justify-between p-2.5 sm:p-3 text-xs sm:text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Show results */
            <div className="p-1.5 sm:p-2">
              <p className="px-2 py-1.5 sm:py-2 text-[10px] sm:text-xs text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </p>
              <div className="space-y-0.5 sm:space-y-1">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    <div className="relative h-12 w-10 sm:h-14 sm:w-12 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{product.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs sm:text-sm font-medium">{formatPrice(product.price)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickAdd(product)}
                        className="h-6 sm:h-7 text-[10px] sm:text-xs text-primary hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity px-2"
                      >
                        Quick Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* No results */
            <div className="p-6 sm:p-8 text-center">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/30 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">No results found for "{query}"</p>
              <p className="text-xs sm:text-sm text-muted-foreground/70 mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2 sm:p-3 border-t border-border bg-muted/30">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
            Press <kbd className="px-1 sm:px-1.5 py-0.5 bg-muted rounded text-[9px] sm:text-[10px] font-mono">ESC</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
