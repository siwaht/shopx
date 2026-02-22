"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation"
import { useContent } from "@/lib/content-context"
import { cn } from "@/lib/utils"

export function Hero() {
  const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.5 })
  const { content } = useContent()
  const hero = content.hero

  // Parse stat values for animation
  const parseStatValue = (value: string) => parseInt(value.replace(/\D/g, "")) || 0
  const stat1 = parseStatValue(hero.stats[0]?.value || "150")
  const stat2 = parseStatValue(hero.stats[1]?.value || "40")

  const count1 = useCountUp(stat1, 2000, 0, statsVisible)
  const count2 = useCountUp(stat2, 2000, 0, statsVisible)

  // Helper to highlight word in headline
  const renderHeadline = () => {
    const words = hero.headline.split(" ")
    const highlightIndex = words.findIndex(w =>
      w.toLowerCase().includes(hero.highlightWord.toLowerCase())
    )

    if (highlightIndex === -1) {
      return (
        <>
          <span className="block text-foreground/90 font-light">{words.slice(0, Math.ceil(words.length / 2)).join(" ")}</span>
          <span className="italic text-primary font-light relative inline-block">
            {words.slice(Math.ceil(words.length / 2)).join(" ")}
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent/40 transform scale-x-0 animate-[scale-in_1s_ease-out_1.2s_forwards] origin-left" />
          </span>
        </>
      )
    }

    const beforeHighlight = words.slice(0, highlightIndex).join(" ")
    const highlightedWord = words[highlightIndex]
    const afterHighlight = words.slice(highlightIndex + 1).join(" ")

    return (
      <>
        {beforeHighlight && <span className="block text-foreground/90 font-light">{beforeHighlight}</span>}
        <span className="italic text-primary font-light relative inline-block">
          {highlightedWord} {afterHighlight}
          <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent/40 transform scale-x-0 animate-[scale-in_1s_ease-out_1.2s_forwards] origin-left" />
        </span>
      </>
    )
  }

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Decorative background elements with animation - Softer and more elegant */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-noise z-0" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-float opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/15 bg-primary/[0.03] text-primary text-[11px] tracking-[0.25em] uppercase mb-10 animate-slide-up backdrop-elegant shadow-elegant" style={{ animationDelay: "0.2s" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-sm" />
              <span className="font-medium">{hero.badge}</span>
            </div>

            <h1 id="hero-heading" className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[1.02] tracking-[-0.03em] font-light text-balance mb-10 animate-slide-up text-foreground drop-shadow-sm" style={{ animationDelay: "0.4s" }}>
              {renderHeadline()}
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl font-light leading-[1.7] max-w-lg mx-auto lg:mx-0 mb-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <Button
                asChild
                size="lg"
                className="h-14 sm:h-16 px-8 sm:px-10 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm shadow-elegant-lg hover:shadow-2xl hover:glow-primary transition-all duration-500 hover:-translate-y-0.5"
              >
                <Link href={hero.primaryButton.href} aria-label={hero.primaryButton.text}>
                  {hero.primaryButton.text}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 sm:h-16 px-8 sm:px-10 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light border-[0.5px] border-primary/30 text-primary hover:bg-primary/[0.03] hover:text-primary hover:border-primary/50 bg-transparent rounded-sm transition-all duration-500 hover:-translate-y-0.5"
              >
                <Link href={hero.secondaryButton.href} aria-label={hero.secondaryButton.text}>
                  {hero.secondaryButton.text}
                </Link>
              </Button>
            </div>

            {/* Stats - Refined */}
            <div
              ref={statsRef}
              className="flex items-center justify-center lg:justify-start gap-16 sm:gap-20 mt-24 pt-10 border-t border-border/30 animate-slide-up"
              style={{ animationDelay: "1s" }}
              role="list"
              aria-label="Company statistics"
            >
              {hero.stats.slice(0, 2).map((stat, index) => (
                <div key={stat.label} role="listitem" className="group cursor-default text-center lg:text-left">
                  <p className="font-serif text-4xl sm:text-5xl text-foreground font-medium tracking-tight transition-transform duration-500 drop-shadow-sm">
                    {index === 0 ? count1 : count2}+
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80 mt-3 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <figure className="order-1 lg:order-2 relative animate-scale-in z-10" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-[3/4] lg:aspect-[0.85] overflow-hidden shadow-elegant-lg group cursor-pointer img-zoom-container bg-muted rounded-t-full rounded-b-md">
              <Image
                src={hero.heroImage}
                alt="Model wearing luxury fashion from the MAISON collection"
                fill
                className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              {/* Refined Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-30" aria-hidden="true" />

              {/* Floating Badge */}
              <div className="absolute bottom-10 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-10 bg-white/10 backdrop-elegant border-[0.5px] border-white/20 p-6 max-w-[240px] animate-fade-in shadow-elegant-lg rounded-sm" style={{ animationDelay: "1.2s" }}>
                <p className="font-serif text-white font-light text-xl tracking-wide">Royal Collection</p>
                <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase mt-3 font-light">Available Now</p>
              </div>
            </div>

            {/* Elegant decorative frame elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-primary/15 -z-10 rounded-sm" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-primary/15 -z-10 rounded-sm" />
          </figure>
        </div>

        {/* Scroll indicator - very subtle */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 animate-bounce-subtle opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        </div>
      </div>
    </section>
  )
}
