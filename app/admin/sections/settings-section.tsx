"use client"

import { useState } from "react"
import {
  Store,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const settingsTabs = [
  { id: "general", label: "General", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
]

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("general")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your store preferences.</p>
        </div>
        <Button
          onClick={handleSave}
          className={cn(
            "gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300",
            saved && "bg-green-600 hover:bg-green-600"
          )}
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Tabs */}
        <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {settingsTabs.map((tab) => (
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

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Store Information</h2>
                <p className="text-sm text-muted-foreground">Basic details about your store</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Store Name</label>
                    <Input defaultValue="MAISON" className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contact Email</label>
                    <Input defaultValue="concierge@maison.com" className="h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input defaultValue="+1 (888) 555-0123" className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Currency</label>
                    <Input defaultValue="USD ($)" className="h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Description</label>
                  <textarea
                    defaultValue="Curating timeless elegance since 2010. We believe in the power of exceptional craftsmanship and sustainable luxury."
                    className="w-full h-24 px-4 py-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Address</label>
                  <Input defaultValue="123 Fashion Avenue, New York, NY 10001" className="h-11" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Choose what notifications you receive</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { title: "New Orders", desc: "Get notified when a new order is placed", enabled: true },
                  { title: "Low Stock Alerts", desc: "Alert when product stock is running low", enabled: true },
                  { title: "Customer Reviews", desc: "Notification for new customer reviews", enabled: false },
                  { title: "Weekly Reports", desc: "Receive weekly sales and analytics summary", enabled: true },
                  { title: "Marketing Emails", desc: "Updates about new features and tips", enabled: false },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <ToggleSwitch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Payment Methods</h2>
                <p className="text-sm text-muted-foreground">Configure accepted payment methods</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { title: "Credit / Debit Cards", desc: "Accept Visa, Mastercard, and American Express", enabled: true },
                  { title: "PayPal", desc: "Allow customers to pay with PayPal", enabled: true },
                  { title: "Apple Pay", desc: "Enable Apple Pay for quick checkout", enabled: false },
                  { title: "Google Pay", desc: "Enable Google Pay for quick checkout", enabled: false },
                  { title: "Bank Transfer", desc: "Accept direct bank transfers", enabled: true },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <ToggleSwitch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Password</label>
                  <Input type="password" placeholder="Enter current password" className="h-11 max-w-md" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">New Password</label>
                  <Input type="password" placeholder="Enter new password" className="h-11 max-w-md" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" className="h-11 max-w-md" />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium text-sm mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Enable 2FA</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <ToggleSwitch defaultChecked={false} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}
