"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star, Check, Loader2, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageZoomModal } from "@/components/ui/image-zoom-modal"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const products = [
  {
    id: 1,
    name: "Royal Velvet Blazer",
    price: 1495,
    originalPrice: null,
    image: "/images/product-blue-blazer.jpg",
    category: "Outerwear",
    color: "Sapphire Blue",
    isNew: true,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Marigold Cashmere Scarf",
    price: 385,
    originalPrice: 450,
    image: "/images/product-yellow-scarf.jpg",
    category: "Accessories",
    color: "Golden Yellow",
    isNew: false,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Italian Leather Loafers",
    price: 595,
    originalPrice: null,
    image: "/images/bestseller-3.jpg",
    category: "Footwear",
    color: "Cognac Brown",
    isNew: false,
    rating: 5.0,
    reviews: 214,
  },
  {
    id: 4,
    name: "Amethyst Silk Dress",
    price: 1295,
    originalPrice: null,
    image: "/images/product-purple-dress.jpg",
    category: "Dresses",
    color: "Deep Purple",
    isNew: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 5,
    name: "Coral Oversized Coat",
    price: 1695,
    originalPrice: 1895,
    image: "/images/product-orange-coat.jpg",
    category: "Outerwear",
    color: "Sunset Orange",
    isNew: false,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 6,
    name: "Saffron Leather Clutch",
    price: 495,
    originalPrice: null,
    image: "/images/bestseller-6.jpg",
    category: "Bags",
    color: "Bright Yellow",
    isNew: true,
    rating: 4.8,
    reviews: 73,
  },
  {
    id: 7,
    name: "Ocean Silk Tie",
    price: 185,
    originalPrice: null,
    image: "/images/bestseller-7.jpg",
    category: "Accessories",
    color: "Blue & Gold",
    isNew: false,
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 8,
    name: "Linen Wide-Leg Trousers",
    price: 425,
    originalPrice: 525,
    image: "/images/bestseller-4.jpg",
    category: "Trousers",
    color: "Oatmeal",
    isNew: false,
    rating: 4.6,
    reviews: 142,
  },
]

export function BestSellers() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const [addedToCart, setAddedToCart] = useState<number | null>(null)
  const [zoomProduct, setZoomProduct] = useState<typeof products[0] | null>(null)
  const { addItem, items } = useCart()
  const [headerRef, headerVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.3 })
  const [gridRef, gridVisible] = useScrollAnimation<HTMLUListElement>({ threshold: 0.05 })

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddToCart = async (product: typeof products[0]) => {
    setAddingToCart(product.id)

    // Simulate a brief loading state for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 400))

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      color: product.color,
    })

    setAddingToCart(null)
    setAddedToCart(product.id)

    // Reset the "added" state after animation
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const isInCart = (productId: number) => items.some((item) => item.id === productId)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section id="products" className="py-20 sm:py-28 lg:py-40 bg-secondary/30 relative overflow-hidden" aria-labelledby="bestsellers-heading">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          ref={headerRef}
          className={cn(
            "flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 lg:mb-16 gap-4 sm:gap-6 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-primary font-semibold mb-4 sm:mb-5">
              Most Loved
            </p>
            <h2 id="bestsellers-heading" className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-5 sm:mb-7 drop-shadow-sm">
              Best Sellers
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0 text-balance leading-relaxed font-light">
              Our most coveted pieces, loved by fashion enthusiasts worldwide for their bold colors and impeccable quality.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-sm border-[0.5px] border-primary/30 text-primary hover:bg-primary/[0.03] hover:border-primary/50 hover:text-primary bg-transparent self-center md:self-auto shrink-0 hover-lift transition-all duration-500 h-10 sm:h-12"
          >
            <a href="#products" className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] font-light uppercase px-6 sm:px-8" aria-label="View all products in our collection">
              View All
            </a>
          </Button>
        </header>

        {/* Products Grid */}
        <ul
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Best selling products"
        >
          {products.map((product, index) => (
            <li
              key={product.id}
              className={cn(
                "group transition-all duration-700",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: gridVisible ? `${index * 75}ms` : "0ms" }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <article className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-5 bg-card rounded-lg sm:rounded-xl hover-lift" itemScope itemType="https://schema.org/Product">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - ${product.category} in ${product.color} by MAISON, priced at ${formatPrice(product.price)}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  itemProp="image"
                />

                {/* Badges */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-white/80 backdrop-blur-md border border-primary/10 text-primary px-2.5 sm:px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] font-light uppercase rounded-sm shadow-sm" aria-label="New arrival">
                      New
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-white/80 backdrop-blur-md border border-accent/20 text-accent-foreground px-2.5 sm:px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] font-light uppercase rounded-sm shadow-sm" aria-label="On sale">
                      Sale
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className={cn(
                  "absolute top-3 sm:top-5 right-3 sm:right-5 flex flex-col gap-2.5 transition-all duration-500",
                  hoveredProduct === product.id ? "opacity-100 translate-x-0" : "sm:opacity-0 sm:translate-x-2"
                )}>
                  {/* Zoom Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/95 backdrop-blur-sm border-[0.5px] border-black/5 hover:bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 hover:scale-110 shadow-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setZoomProduct(product)
                    }}
                    aria-label={`Zoom ${product.name} image`}
                  >
                    <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.25]" aria-hidden="true" />
                  </Button>
                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/95 backdrop-blur-sm border-[0.5px] border-black/5 hover:bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 hover:scale-110 shadow-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  >
                    <Heart
                      className={cn(
                        "h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.25] transition-all duration-500",
                        wishlist.includes(product.id) && "fill-primary text-primary scale-110"
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </div>

                {/* Quick Add */}
                <div
                  className={cn(
                    "absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 transition-all duration-500",
                    hoveredProduct === product.id
                      ? "opacity-100 translate-y-0"
                      : "sm:opacity-0 sm:translate-y-4"
                  )}
                >
                  <Button
                    className={cn(
                      "w-full h-9 sm:h-11 text-[9px] sm:text-[10px] font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase gap-1.5 sm:gap-2 rounded-sm transition-all duration-500",
                      addedToCart === product.id && "bg-green-600 hover:bg-green-600",
                      isInCart(product.id) && addedToCart !== product.id && "bg-primary/80"
                    )}
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id}
                    aria-label={`Add ${product.name} to shopping bag`}
                    aria-live="polite"
                  >
                    {addingToCart === product.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin stroke-[1.25]" aria-hidden="true" />
                        <span className="hidden sm:inline">Adding...</span>
                      </>
                    ) : addedToCart === product.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.25]" aria-hidden="true" />
                        <span className="hidden sm:inline">Added</span>
                      </>
                    ) : isInCart(product.id) ? (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.25]" aria-hidden="true" />
                        <span className="hidden sm:inline">Add Another</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.25]" aria-hidden="true" />
                        <span className="hidden sm:inline">Add to Bag</span>
                      </>
                    )}
                  </Button>
                </div>
              </article>
              <div className="block mt-4 sm:mt-5 text-center" aria-label={`View ${product.name} details`}>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground mb-1.5 sm:mb-2 truncate font-light">
                  {product.category}
                </p>
                <h3 className="text-sm sm:text-base font-serif font-light mb-1 sm:mb-1.5 group-hover:text-primary transition-colors line-clamp-1 mx-2" itemProp="name">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2 sm:gap-3" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <p className="text-xs sm:text-sm tracking-wide text-foreground/90 font-light" itemProp="price" content={product.price.toString()}>{formatPrice(product.price)}</p>
                  <meta itemProp="priceCurrency" content="USD" />
                  {product.originalPrice && (
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 line-through tracking-wide">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={!!zoomProduct}
        onClose={() => setZoomProduct(null)}
        images={zoomProduct ? [{ src: zoomProduct.image, alt: zoomProduct.name }] : []}
        productName={zoomProduct?.name}
      />
    </section>
  )
}
