"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Content types
export interface MenuItem {
  label: string
  href: string
}

export interface HeaderContent {
  logo: string
  announcement: string
  showAnnouncement: boolean
  menuItems: MenuItem[]
}

export interface HeroButton {
  text: string
  href: string
}

export interface HeroStat {
  value: string
  label: string
}

export interface HeroContent {
  badge: string
  headline: string
  highlightWord: string
  description: string
  primaryButton: HeroButton
  secondaryButton: HeroButton
  stats: HeroStat[]
  heroImage: string
}

export interface SectionContent {
  badge: string
  headline: string
  description: string
}

export interface ContentState {
  header: HeaderContent
  hero: HeroContent
  featuredCollections: SectionContent
  testimonials: SectionContent
  newsletter: SectionContent
  footer: {
    description: string
    copyright: string
  }
}

// Default content
const defaultContent: ContentState = {
  header: {
    logo: "MAISON",
    announcement: "New Collection — Free shipping over $500",
    showAnnouncement: true,
    menuItems: [
      { label: "Home", href: "#hero" },
      { label: "Collections", href: "#collections" },
      { label: "Shop", href: "#products" },
      { label: "Reviews", href: "#testimonials" },
    ],
  },
  hero: {
    badge: "Spring/Summer 2026",
    headline: "Discover Vibrant Elegance",
    highlightWord: "Vibrant",
    description: "Immerse yourself in a world of bold colors and impeccable craftsmanship. Our new collection celebrates the art of standing out with refined sophistication.",
    primaryButton: { text: "Explore Collection", href: "#collections" },
    secondaryButton: { text: "View Lookbook", href: "#products" },
    stats: [
      { value: "150+", label: "New Pieces" },
      { value: "40+", label: "Countries" },
      { value: "25K+", label: "Happy Clients" },
    ],
    heroImage: "/images/hero-vibrant.jpg",
  },
  featuredCollections: {
    badge: "Curated Selection",
    headline: "Featured Collections",
    description: "Explore our carefully curated collections, each telling its own story of color, texture, and timeless elegance.",
  },
  testimonials: {
    badge: "Client Stories",
    headline: "Loved Worldwide",
    description: "Discover why fashion enthusiasts around the globe choose MAISON for their most memorable moments.",
  },
  newsletter: {
    badge: "Stay Connected",
    headline: "Join Our World",
    description: "Subscribe to receive exclusive updates, early access to new collections, and special offers.",
  },
  footer: {
    description: "Curating timeless elegance since 2010. We believe in the power of exceptional craftsmanship and sustainable luxury.",
    copyright: "© 2026 MAISON. All rights reserved.",
  },
}

const STORAGE_KEY = "maison-content"

interface ContentContextType {
  content: ContentState
  updateContent: <K extends keyof ContentState>(section: K, updates: Partial<ContentState[K]>) => void
  updateNestedContent: <K extends keyof ContentState>(section: K, field: string, value: unknown) => void
  resetContent: () => void
  saveContent: () => Promise<void>
  isSaving: boolean
  lastSaved: Date | null
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(defaultContent)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load content from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setContent({ ...defaultContent, ...parsed })
      }
    } catch (error) {
      console.error("Failed to load content from storage:", error)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever content changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      } catch (error) {
        console.error("Failed to save content to storage:", error)
      }
    }
  }, [content, isHydrated])

  const updateContent = <K extends keyof ContentState>(
    section: K,
    updates: Partial<ContentState[K]>
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }))
  }

  const updateNestedContent = <K extends keyof ContentState>(
    section: K,
    field: string,
    value: unknown
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem(STORAGE_KEY)
  }

  const saveContent = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateNestedContent,
        resetContent,
        saveContent,
        isSaving,
        lastSaved,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}

export { defaultContent }
