"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useContent } from "@/lib/content-context"

const testimonials = [
  {
    id: 1,
    quote:
      "The Royal Velvet Blazer is absolutely stunning. The sapphire blue color is even more vibrant in person. This is what luxury should feel like.",
    author: "Charlotte M.",
    location: "New York",
    publication: "Vogue",
    rating: 5,
    image: "/images/bestseller-5.jpg",
    product: "Royal Velvet Blazer",
  },
  {
    id: 2,
    quote:
      "I've never received so many compliments on a single piece. The Marigold Cashmere Scarf brings the perfect pop of color to any outfit.",
    author: "James L.",
    location: "London",
    publication: "GQ",
    rating: 5,
    image: "/images/product-yellow-scarf.jpg",
    product: "Marigold Cashmere Scarf",
  },
  {
    id: 3,
    quote:
      "MAISON understands that true elegance comes from bold choices. Their Coral Coat turned heads at Milan Fashion Week.",
    author: "Sophie R.",
    location: "Paris",
    publication: "Elle",
    rating: 5,
    image: "/images/product-orange-coat.jpg",
    product: "Coral Oversized Coat",
  },
  {
    id: 4,
    quote:
      "The attention to detail is remarkable. Every stitch, every color choice speaks to their commitment to excellence.",
    author: "Marcus T.",
    location: "Tokyo",
    publication: "Harper's Bazaar",
    rating: 5,
    image: "/images/product-purple-dress.jpg",
    product: "Amethyst Silk Dress",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [headerRef, headerVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.3 })
  const [carouselRef, carouselVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { content } = useContent()
  const sectionContent = content.testimonials

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextTestimonial])

  return (
    <section id="testimonials" className="py-20 sm:py-28 lg:py-40 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 animate-float" aria-hidden="true" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header 
          ref={headerRef}
          className={cn(
            "text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary font-medium mb-3 sm:mb-4">
            {sectionContent.badge}
          </p>
          <h2 id="testimonials-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-6">
            {sectionContent.headline}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-balance">
            {sectionContent.description}
          </p>
        </header>

        {/* Testimonial Carousel */}
        <div 
          ref={carouselRef}
          className={cn(
            "relative max-w-6xl mx-auto transition-all duration-700",
            carouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )} 
          role="region" 
          aria-label="Customer testimonials carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              aria-live="polite"
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                  aria-hidden={index !== currentIndex}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12 transition-all duration-500">
                    {/* Image */}
                    <figure className="relative aspect-square max-w-[280px] sm:max-w-sm mx-auto md:max-w-none rounded-lg sm:rounded-xl overflow-hidden group img-zoom-container">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.product} as reviewed by ${testimonial.author}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </figure>
                    
                    {/* Content */}
                    <div className="text-center md:text-left">
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 mx-auto md:mx-0 mb-3 sm:mb-4 lg:mb-6 text-primary/30" aria-hidden="true" />
                      
                      {/* Rating */}
                      <div className="flex items-center justify-center md:justify-start gap-0.5 sm:gap-1 mb-3 sm:mb-4 lg:mb-6" aria-label={`Rating: ${testimonial.rating} out of 5 stars`} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                        <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 fill-accent text-accent" aria-hidden="true" />
                        ))}
                      </div>
                      
                      <blockquote className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-4 sm:mb-6 lg:mb-8 text-balance" itemProp="reviewBody">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      
                      <div className="mb-2 sm:mb-3 lg:mb-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <p className="text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase font-medium mb-0.5 sm:mb-1" itemProp="name">
                          {testimonial.author}
                        </p>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                          {testimonial.location} — Featured in{" "}
                          <span className="italic text-primary">{testimonial.publication}</span>
                        </p>
                      </div>
                      
                      <p className="text-[9px] sm:text-[10px] lg:text-xs tracking-[0.1em] uppercase text-muted-foreground" itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                        Reviewing: <span itemProp="name">{testimonial.product}</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10" aria-label="Testimonial navigation">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-2 h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-transparent hover-lift transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Dots with progress indicator */}
            <div className="flex gap-1.5 sm:gap-2 lg:gap-3 items-center" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  role="tab"
                  aria-selected={index === currentIndex}
                  className={cn(
                    "h-1.5 sm:h-2 rounded-full transition-all duration-500 relative overflow-hidden",
                    index === currentIndex
                      ? "bg-primary/30 w-6 sm:w-8 lg:w-12"
                      : "bg-border w-1.5 sm:w-2 hover:bg-muted-foreground hover:w-2 sm:hover:w-3"
                  )}
                  aria-label={`View testimonial ${index + 1} from ${testimonial.author}`}
                >
                  {index === currentIndex && isAutoPlaying && (
                    <span 
                      className="absolute inset-0 bg-primary rounded-full animate-[progress_5s_linear_infinite]"
                      style={{ transformOrigin: "left", animation: "progress 5s linear" }}
                    />
                  )}
                  {index === currentIndex && !isAutoPlaying && (
                    <span className="absolute inset-0 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-2 h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-transparent hover-lift transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Play/Pause button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 hover:bg-primary/10 transition-all duration-300"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </section>
  )
}
