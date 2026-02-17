"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: string
  category: string
  image: string
}

const initialProducts: Product[] = [
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

const deriveStatus = (stock: number) => {
  if (stock === 0) return "out_of_stock"
  if (stock <= 10) return "low_stock"
  return "active"
}

const categoryOptions = ["Outerwear", "Knitwear", "Accessories", "Dresses", "Tops"]

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSaveProduct = (product: Product) => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p))
      setEditProduct(null)
    } else {
      setProducts(prev => [...prev, { ...product, id: Math.max(...prev.map(p => p.id)) + 1 }])
      setShowAddModal(false)
    }
  }

  const handleDelete = () => {
    if (deleteTarget) {
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300">
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
                <button onClick={() => setEditProduct(product)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button onClick={() => setDeleteTarget(product)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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

      <ProductFormModal
        open={showAddModal || !!editProduct}
        onClose={() => { setShowAddModal(false); setEditProduct(null) }}
        product={editProduct}
        onSave={handleSaveProduct}
      />

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="font-serif text-xl">Delete Product</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteTarget?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProductFormModal({
  open,
  onClose,
  product,
  onSave,
}: {
  open: boolean
  onClose: () => void
  product: Product | null
  onSave: (product: Product) => void
}) {
  const isEditing = !!product
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState(categoryOptions[0])

  const resetForm = () => {
    if (product) {
      setName(product.name)
      setPrice(String(product.price))
      setStock(String(product.stock))
      setCategory(product.category)
    } else {
      setName("")
      setPrice("")
      setStock("")
      setCategory(categoryOptions[0])
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      resetForm()
    } else {
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const stockNum = parseInt(stock) || 0
    onSave({
      id: product?.id || 0,
      name,
      price: parseFloat(price) || 0,
      stock: stockNum,
      status: deriveStatus(stockNum),
      category,
      image: product?.image || "/images/bestseller-1.jpg",
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md" onOpenAutoFocus={() => resetForm()}>
        <DialogTitle className="font-serif text-xl">{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Product Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" className="h-11" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price ($)</label>
              <Input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="h-11" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Stock</label>
              <Input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="h-11" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{isEditing ? "Save Changes" : "Add Product"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
