"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useContent } from "@/lib/content-context"
import { cn } from "@/lib/utils"

const collections = [
  {
    id: 1,
    name: "Marigold Edit",
    description: "Warm golden tones for the modern wardrobe",
    image: "/images/collection-yellow.jpg",
    productCount: 32,
    color: "bg-amber-400",
  },
  {
    id: 2,
    name: "Azure Collection",
    description: "Deep blues that command attention",
    image: "/images/collection-blue.jpg",
    productCount: 28,
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "Coral Dreams",
    description: "Vibrant oranges for bold statements",
    image: "/images/collection-orange.jpg",
    productCount: 24,
    color: "bg-orange-500",
  },
  {
    id: 4,
    name: "Luxe Accessories",
    description: "The finishing touches of elegance",
    image: "/images/collection-4.jpg",
    productCount: 45,
    color: "bg-purple-500",
  },
]

export function FeaturedCollection() {
  const [headerRef, headerVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.3 })
  const [gridRef, gridVisible] = useScrollAnimation<HTMLUListElement>({ threshold: 0.1 })
  const { content } = useContent()
  const sectionContent = content.featuredCollections

  return (
    <section id="collections" className="py-24 sm:py-32 lg:py-48 relative overflow-hidden" aria-labelledby="collections-heading">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 animate-float" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header
          ref={headerRef}
          className={cn(
            "text-center mb-16 sm:mb-20 lg:mb-24 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary font-semibold mb-4 sm:mb-5">
            {sectionContent.badge}
          </p>
          <h2 id="collections-heading" className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-5 sm:mb-7 drop-shadow-sm">
            {sectionContent.headline}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto text-balance leading-relaxed">
            {sectionContent.description}
          </p>
        </header>

        {/* Collections Grid */}
        <ul
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end"
          role="list"
          aria-label="Fashion collections"
        >
          {collections.map((collection, index) => (
            <li
              key={collection.id}
              className={cn(
                "transition-all duration-700",
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12",
                index % 2 === 0 ? "lg:mb-12" : "lg:mt-12"
              )}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : "0ms" }}
            >
              <Link
                href="#products"
                className="group block"
                aria-label={`${collection.name} collection - ${collection.productCount} pieces`}
              >
                <article className={cn("relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-5 hover-lift",
                  index % 2 === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
                )}>
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={`${collection.name} collection featuring ${collection.description.toLowerCase()}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" aria-hidden="true" />

                  {/* Color indicator with pulse */}
                  <div className={cn(
                    "absolute top-3 sm:top-4 left-3 sm:left-4 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-transform duration-300 group-hover:scale-150",
                    collection.color
                  )} aria-hidden="true" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <p className="text-white/80 text-[9px] sm:text-[10px] font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1.5 sm:mb-2">
                      {collection.productCount} pieces
                    </p>
                    <h3 className="font-serif font-light text-lg sm:text-2xl text-white mb-1 tracking-wide">{collection.name}</h3>
                  </div>

                  {/* Hover arrow with rotation */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" aria-hidden="true">
                    <ArrowUpRight className="h-4 sm:h-5 w-4 sm:w-5 text-foreground transition-transform duration-300 group-hover:rotate-45" />
                  </div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>
                </article>
                <p className="text-muted-foreground text-xs sm:text-sm px-1 line-clamp-2 transition-colors duration-300 group-hover:text-foreground">
                  {collection.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
