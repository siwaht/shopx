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
          <span className="block text-foreground/90">{words.slice(0, Math.ceil(words.length / 2)).join(" ")}</span>
          <span className="italic text-primary relative inline-block">
            {words.slice(Math.ceil(words.length / 2)).join(" ")}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent/40 transform scale-x-0 animate-[scale-in_1s_ease-out_1.2s_forwards] origin-left" />
          </span>
        </>
      )
    }
    
    const beforeHighlight = words.slice(0, highlightIndex).join(" ")
    const highlightedWord = words[highlightIndex]
    const afterHighlight = words.slice(highlightIndex + 1).join(" ")
    
    return (
      <>
        {beforeHighlight && <span className="block text-foreground/90">{beforeHighlight}</span>}
        <span className="italic text-primary relative inline-block">
          {highlightedWord} {afterHighlight}
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent/40 transform scale-x-0 animate-[scale-in_1s_ease-out_1.2s_forwards] origin-left" />
        </span>
      </>
    )
  }

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Decorative background elements with animation - Softer and more elegant */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-float opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/10 bg-primary/5 text-primary text-[11px] tracking-[0.2em] uppercase mb-8 animate-slide-up opacity-0 backdrop-blur-sm" style={{ animationDelay: "0.2s" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{hero.badge}</span>
            </div>

            <h1 id="hero-heading" className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] leading-[1.1] tracking-tight text-balance mb-8 animate-slide-up opacity-0 text-foreground" style={{ animationDelay: "0.4s" }}>
              {renderHeadline()}
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 animate-slide-up opacity-0" style={{ animationDelay: "0.6s" }}>
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-slide-up opacity-0" style={{ animationDelay: "0.8s" }}>
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-none transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/10"
              >
                <Link href={hero.primaryButton.href} aria-label={hero.primaryButton.text}>
                  {hero.primaryButton.text}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-xs tracking-[0.2em] uppercase border border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/40 bg-transparent rounded-none transition-all duration-300"
              >
                <Link href={hero.secondaryButton.href} aria-label={hero.secondaryButton.text}>
                  {hero.secondaryButton.text}
                </Link>
              </Button>
            </div>

            {/* Stats - Refined */}
            <div
              ref={statsRef}
              className="flex items-center justify-center lg:justify-start gap-12 sm:gap-16 mt-20 pt-8 border-t border-border/40 animate-slide-up opacity-0"
              style={{ animationDelay: "1s" }}
              role="list"
              aria-label="Company statistics"
            >
              {hero.stats.slice(0, 2).map((stat, index) => (
                <div key={stat.label} role="listitem" className="group cursor-default text-center lg:text-left">
                  <p className="font-serif text-3xl sm:text-4xl text-foreground font-medium transition-transform duration-500">
                    {index === 0 ? count1 : count2}+
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <figure className="order-1 lg:order-2 relative animate-scale-in opacity-0 z-10" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-[3/4] lg:aspect-[0.85] overflow-hidden shadow-2xl group cursor-pointer img-zoom-container bg-muted">
              <Image
                src={hero.heroImage}
                alt="Model wearing luxury fashion from the MAISON collection"
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 max-w-[200px] hidden sm:block animate-fade-in opacity-0" style={{ animationDelay: "1.2s" }}>
                <p className="font-serif text-white text-lg">Royal Collection</p>
                <p className="text-white/80 text-xs tracking-wider mt-1">Available Now</p>
              </div>
            </div>

            {/* Minimal decorative frame elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l border-b border-primary/20 -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-r border-t border-primary/20 -z-10" />
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
