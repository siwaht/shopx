"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Settings, ShoppingBag, Heart, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AccountDropdownProps {
  className?: string
}

export function AccountDropdown({ className }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
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
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Order History</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
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
        <DropdownMenuItem className="cursor-pointer text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
