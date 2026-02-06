"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  Shield,
  X,
  MapPin,
  Mail,
  Calendar,
  Package,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ModalType = "profile" | "orders" | "wishlist" | "settings" | null

const orderHistory = [
  { id: "ORD-001", date: "Feb 6, 2026", total: 680, status: "completed", items: 3 },
  { id: "ORD-002", date: "Jan 22, 2026", total: 495, status: "shipped", items: 2 },
  { id: "ORD-003", date: "Jan 10, 2026", total: 1250, status: "completed", items: 4 },
  { id: "ORD-004", date: "Dec 18, 2025", total: 385, status: "completed", items: 1 },
]

const wishlistItems = [
  { name: "Azure Linen Blazer", price: 695, category: "Outerwear", image: "/images/bestseller-4.jpg" },
  { name: "Coral Cashmere Sweater", price: 385, category: "Knitwear", image: "/images/bestseller-5.jpg" },
  { name: "Saffron Leather Clutch", price: 495, category: "Accessories", image: "/images/bestseller-6.jpg" },
]

const statusStyle: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-cyan-50 text-cyan-700 border-cyan-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
}

interface AccountDropdownProps {
  className?: string
}

export function AccountDropdown({ className }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = (modal: ModalType) => {
    setIsOpen(false)
    setActiveModal(modal)
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-transparent hover:text-primary p-0 h-auto w-auto transition-colors duration-300",
              className
            )}
            aria-label="Open account menu"
          >
            <User className="h-4 w-4 stroke-[1.5]" />
            <span className="sr-only">Account menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-muted-foreground">Sign in for personalized experience</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => openModal("profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => openModal("orders")}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => openModal("wishlist")}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => openModal("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer text-primary">
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-muted-foreground" onClick={() => setIsOpen(false)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={activeModal === "profile"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-serif text-xl">My Profile</DialogTitle>
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                GU
              </div>
              <div>
                <p className="font-semibold text-lg">Guest User</p>
                <p className="text-sm text-muted-foreground">Member since Feb 2026</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>guest@maison.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>New York, United States</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined February 2026</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-semibold">4</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-semibold">3</p>
                <p className="text-xs text-muted-foreground">Wishlist</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-semibold">150</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "orders"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="font-serif text-xl">Order History</DialogTitle>
          <div className="space-y-3 pt-2 max-h-[60vh] overflow-y-auto">
            {orderHistory.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <p className="font-semibold text-sm">{order.id}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{order.date}</span>
                    <span>-</span>
                    <span>{order.items} items</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn("capitalize font-medium mb-1", statusStyle[order.status])}>
                    {order.status}
                  </Badge>
                  <p className="text-sm font-semibold">${order.total.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "wishlist"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-serif text-xl">Wishlist</DialogTitle>
          <div className="space-y-3 pt-2">
            {wishlistItems.map((item) => (
              <div key={item.name} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden relative flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <p className="font-semibold text-sm">${item.price}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "settings"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-serif text-xl">Account Settings</DialogTitle>
          <div className="space-y-5 pt-2">
            {[
              { label: "Email Notifications", desc: "Receive order updates via email", defaultChecked: true },
              { label: "Marketing Emails", desc: "New collections and promotions", defaultChecked: false },
              { label: "SMS Notifications", desc: "Get text alerts for shipping", defaultChecked: true },
            ].map((setting) => (
              <SettingToggle key={setting.label} {...setting} />
            ))}
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-medium mb-2">Language</p>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
                <option>English (US)</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Currency</p>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
                <option>USD ($)</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function SettingToggle({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
          checked ? "translate-x-6" : "translate-x-1"
        )} />
      </button>
    </div>
  )
}
