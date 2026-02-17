"use client"

import { useState, useEffect } from "react"
import {
  Type,
  Image,
  Menu,
  Megaphone,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface MenuItem {
  label: string
  href: string
}

interface ContentData {
  header: {
    logo: string
    announcement: string
    showAnnouncement: boolean
    menuItems?: MenuItem[]
  }
  hero: {
    badge: string
    headline: string
    highlightWord: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
    heroImage: string
  }
  footer: {
    description: string
    copyright: string
  }
}

const contentTabs = [
  { id: "hero", label: "Hero Section", icon: Image },
  { id: "header", label: "Header & Menu", icon: Menu },
  { id: "announcement", label: "Announcement", icon: Megaphone },
  { id: "footer", label: "Footer", icon: Type },
]

const defaultMenuItems: MenuItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Collections", href: "#collections" },
  { label: "Shop", href: "#products" },
]

export function ContentSection() {
  const [activeTab, setActiveTab] = useState("hero")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [content, setContent] = useState<ContentData | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/content")
      .then(r => r.json())
      .then(data => {
        setContent(data)
        if (data.header?.menuItems?.length) {
          setMenuItems(data.header.menuItems)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateField = (section: "header" | "hero" | "footer", field: string, value: string | boolean) => {
    if (!content) return
    setContent({
      ...content,
      [section]: { ...content[section], [field]: value },
    })
    setSaved(false)
  }

  const handleSave = async () => {
    if (!content) return
    setSaving(true)
    try {
      // Save header with menu items
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "header",
          updates: { ...content.header, menuItems },
        }),
      })
      // Save hero
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "hero", updates: content.hero }),
      })
      // Save footer
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "footer", updates: content.footer }),
      })
      // Also persist to localStorage so the frontend picks it up
      try {
        const stored = localStorage.getItem("maison-content")
        const parsed = stored ? JSON.parse(stored) : {}
        const merged = {
          ...parsed,
          header: {
            ...parsed.header,
            logo: content.header.logo,
            announcement: content.header.announcement,
            showAnnouncement: content.header.showAnnouncement,
            menuItems,
          },
          hero: {
            ...parsed.hero,
            badge: content.hero.badge,
            headline: content.hero.headline,
            highlightWord: content.hero.highlightWord,
            description: content.hero.description,
            primaryButton: { text: content.hero.primaryButtonText, href: "#collections" },
            secondaryButton: { text: content.hero.secondaryButtonText, href: "#products" },
            heroImage: content.hero.heroImage,
          },
          footer: content.footer,
        }
        localStorage.setItem("maison-content", JSON.stringify(merged))
      } catch { /* ignore */ }
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      console.error("Save failed:", err)
    }
    setSaving(false)
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      localStorage.removeItem("maison-content")
    } catch { /* ignore */ }
    const data = await fetch("/api/content").then(r => r.json())
    setContent(data)
    setMenuItems(data.header?.menuItems?.length ? data.header.menuItems : defaultMenuItems)
    setLoading(false)
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, { label: "New Link", href: "#" }])
    setSaved(false)
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index))
    setSaved(false)
  }

  const updateMenuItem = (index: number, field: "label" | "href", value: string) => {
    const updated = [...menuItems]
    updated[index] = { ...updated[index], [field]: value }
    setMenuItems(updated)
    setSaved(false)
  }

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Site Content</h1>
          <p className="text-muted-foreground">Edit your storefront hero, header, menu, and footer.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} className="gap-2 h-11 px-5 rounded-lg">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              "gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300",
              saved && "bg-green-600 hover:bg-green-600"
            )}
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {contentTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "hero" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Hero Section</h2>
                <p className="text-sm text-muted-foreground">The main banner visitors see first</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Badge Text</label>
                    <Input value={content.hero.badge} onChange={e => updateField("hero", "badge", e.target.value)} className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Highlight Word</label>
                    <Input value={content.hero.highlightWord} onChange={e => updateField("hero", "highlightWord", e.target.value)} className="h-11" placeholder="Word to accent in headline" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Headline</label>
                  <Input value={content.hero.headline} onChange={e => updateField("hero", "headline", e.target.value)} className="h-11 text-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    value={content.hero.description}
                    onChange={e => updateField("hero", "description", e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Button Text</label>
                    <Input value={content.hero.primaryButtonText} onChange={e => updateField("hero", "primaryButtonText", e.target.value)} className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Secondary Button Text</label>
                    <Input value={content.hero.secondaryButtonText} onChange={e => updateField("hero", "secondaryButtonText", e.target.value)} className="h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Hero Image Path</label>
                  <div className="flex gap-3">
                    <Input value={content.hero.heroImage} onChange={e => updateField("hero", "heroImage", e.target.value)} className="h-11 flex-1" placeholder="/images/hero-vibrant.jpg" />
                    <Button variant="outline" className="h-11 px-4" asChild>
                      <a href={content.hero.heroImage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Available: /images/hero-vibrant.jpg, /images/hero-fashion.jpg</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "header" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border shadow-elegant">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold mb-1">Header</h2>
                  <p className="text-sm text-muted-foreground">Logo and branding</p>
                </div>
                <div className="p-6">
                  <label className="text-sm font-medium mb-2 block">Logo Text</label>
                  <Input value={content.header.logo} onChange={e => updateField("header", "logo", e.target.value)} className="h-11 max-w-sm font-serif text-lg tracking-widest" />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border shadow-elegant">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Navigation Menu</h2>
                    <p className="text-sm text-muted-foreground">Links shown in the header navigation bar</p>
                  </div>
                  <Button onClick={addMenuItem} variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>
                <div className="p-6 space-y-3">
                  {menuItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          value={item.label}
                          onChange={e => updateMenuItem(index, "label", e.target.value)}
                          placeholder="Label"
                          className="h-9 text-sm"
                        />
                        <Input
                          value={item.href}
                          onChange={e => updateMenuItem(index, "href", e.target.value)}
                          placeholder="#section-id or /path"
                          className="h-9 text-sm font-mono"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuItem(index)}
                        className="h-9 w-9 p-0 text-muted-foreground hover:text-red-500 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {menuItems.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">No menu items. Click &quot;Add Item&quot; to create one.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "announcement" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Announcement Bar</h2>
                <p className="text-sm text-muted-foreground">The banner shown at the top of the page</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Show Announcement</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Toggle the announcement bar visibility</p>
                  </div>
                  <button
                    onClick={() => updateField("header", "showAnnouncement", !content.header.showAnnouncement)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0",
                      content.header.showAnnouncement ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span className={cn(
                      "inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                      content.header.showAnnouncement ? "translate-x-6" : "translate-x-1"
                    )} />
                  </button>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Announcement Text</label>
                  <Input
                    value={content.header.announcement}
                    onChange={e => updateField("header", "announcement", e.target.value)}
                    className="h-11"
                    placeholder="Free shipping on orders over $500"
                  />
                </div>
                {/* Preview */}
                <div className="rounded-lg overflow-hidden border border-border">
                  <div className="text-xs text-muted-foreground px-3 py-1.5 bg-muted/50">Preview</div>
                  {content.header.showAnnouncement ? (
                    <div className="bg-primary text-primary-foreground text-center py-3 px-4">
                      <p className="text-xs tracking-[0.2em] uppercase font-medium">{content.header.announcement}</p>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <EyeOff className="h-4 w-4" />
                      Announcement bar is hidden
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Footer</h2>
                <p className="text-sm text-muted-foreground">Bottom section of the page</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    value={content.footer.description}
                    onChange={e => updateField("footer", "description", e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Copyright Text</label>
                  <Input value={content.footer.copyright} onChange={e => updateField("footer", "copyright", e.target.value)} className="h-11" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
