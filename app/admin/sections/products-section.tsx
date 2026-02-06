"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const products = [
  { id: 1, name: "Azure Linen Blazer", price: 695, stock: 24, status: "active", category: "Outerwear", image: "/images/bestseller-4.jpg" },
  { id: 2, name: "Coral Cashmere Sweater", price: 385, stock: 18, status: "active", category: "Knitwear", image: "/images/bestseller-5.jpg" },
  { id: 3, name: "Saffron Leather Clutch", price: 495, stock: 32, status: "active", category: "Accessories", image: "/images/bestseller-6.jpg" },
  { id: 4, name: "Ocean Silk Tie", price: 185, stock: 45, status: "active", category: "Accessories", image: "/images/bestseller-7.jpg" },
  { id: 5, name: "Midnight Velvet Dress", price: 890, stock: 0, status: "out_of_stock", category: "Dresses", image: "/images/bestseller-1.jpg" },
  { id: 6, name: "Pearl Silk Blouse", price: 320, stock: 8, status: "low_stock", category: "Tops", image: "/images/bestseller-2.jpg" },
  { id: 7, name: "Golden Hour Scarf", price: 245, stock: 56, status: "active", category: "Accessories", image: "/images/bestseller-3.jpg" },
  { id: 8, name: "Emerald Wool Coat", price: 1250, stock: 5, status: "low_stock", category: "Outerwear", image: "/images/bestseller-8.jpg" },
]

const getStockStatus = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    low_stock: "bg-amber-50 text-amber-700 border-amber-200",
    out_of_stock: "bg-red-50 text-red-700 border-red-200",
  }
  return styles[status] || "bg-muted text-muted-foreground border-border"
}

const getStockLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
  }
  return labels[status] || status
}

export function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button className="gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-elegant">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 h-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-300",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Product</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-border/50">
          {filtered.map((product) => (
            <div key={product.id} className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr_80px] gap-4 px-6 py-5 items-center hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold mb-0.5">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <p className="font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground">{product.stock} units</p>
              <Badge variant="outline" className={cn("capitalize font-medium w-fit", getStockStatus(product.status))}>
                {getStockLabel(product.status)}
              </Badge>
              <div className="flex items-center gap-1 justify-end">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>{filtered.length} of {products.length} products</span>
        </div>
      </div>
    </div>
  )
}
