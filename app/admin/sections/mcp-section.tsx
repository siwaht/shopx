"use client"

import { useState, useCallback } from "react"
import {
  Play,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Loader2,
  Globe,
  Zap,
  BookOpen,
  Terminal,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  path: string
  description: string
  category: string
  params?: { name: string; type: string; required: boolean; description: string }[]
  body?: { name: string; type: string; required: boolean; description: string }[]
  example?: string
}

const endpoints: ApiEndpoint[] = [
  // Products
  {
    method: "GET", path: "/api/products", description: "List all products. Supports filtering by category and search.",
    category: "Products",
    params: [
      { name: "category", type: "string", required: false, description: "Filter by category (e.g. Outerwear, Accessories)" },
      { name: "search", type: "string", required: false, description: "Search by product name or category" },
    ],
  },
  {
    method: "POST", path: "/api/products", description: "Create a new product.",
    category: "Products",
    body: [
      { name: "name", type: "string", required: true, description: "Product name" },
      { name: "price", type: "number", required: true, description: "Product price in USD" },
      { name: "stock", type: "number", required: true, description: "Stock quantity" },
      { name: "category", type: "string", required: true, description: "Product category" },
      { name: "color", type: "string", required: false, description: "Product color" },
      { name: "description", type: "string", required: false, description: "Product description" },
      { name: "image", type: "string", required: false, description: "Image URL path" },
      { name: "originalPrice", type: "number", required: false, description: "Original price (for sale items)" },
      { name: "isNew", type: "boolean", required: false, description: "Mark as new arrival" },
    ],
    example: JSON.stringify({ name: "Silk Evening Gown", price: 1895, stock: 12, category: "Dresses", color: "Champagne Gold", description: "Elegant silk evening gown with hand-sewn beading" }, null, 2),
  },
  {
    method: "GET", path: "/api/products/:id", description: "Get a single product by ID.",
    category: "Products",
    params: [{ name: "id", type: "number", required: true, description: "Product ID" }],
  },
  {
    method: "PUT", path: "/api/products/:id", description: "Update a product. Send only the fields you want to change.",
    category: "Products",
    params: [{ name: "id", type: "number", required: true, description: "Product ID" }],
    body: [
      { name: "name", type: "string", required: false, description: "Product name" },
      { name: "price", type: "number", required: false, description: "Product price" },
      { name: "stock", type: "number", required: false, description: "Stock quantity (status auto-derived)" },
      { name: "category", type: "string", required: false, description: "Product category" },
    ],
    example: JSON.stringify({ price: 1295, stock: 30 }, null, 2),
  },
  {
    method: "DELETE", path: "/api/products/:id", description: "Delete a product by ID.",
    category: "Products",
    params: [{ name: "id", type: "number", required: true, description: "Product ID" }],
  },
  // Orders
  {
    method: "GET", path: "/api/orders", description: "List all orders. Supports filtering by status and search.",
    category: "Orders",
    params: [
      { name: "status", type: "string", required: false, description: "Filter by status: pending, processing, shipped, completed, cancelled" },
      { name: "search", type: "string", required: false, description: "Search by order ID or customer name" },
    ],
  },
  {
    method: "POST", path: "/api/orders", description: "Create a new order.",
    category: "Orders",
    body: [
      { name: "id", type: "string", required: true, description: "Order ID (e.g. ORD-009)" },
      { name: "customer", type: "string", required: true, description: "Customer name" },
      { name: "email", type: "string", required: true, description: "Customer email" },
      { name: "total", type: "number", required: true, description: "Order total" },
      { name: "items", type: "number", required: true, description: "Number of items" },
      { name: "status", type: "string", required: true, description: "Order status" },
      { name: "date", type: "string", required: true, description: "Order date" },
      { name: "payment", type: "string", required: true, description: "Payment status" },
      { name: "address", type: "string", required: true, description: "Shipping address" },
      { name: "products", type: "array", required: true, description: "Array of {name, qty, price}" },
    ],
    example: JSON.stringify({ id: "ORD-009", customer: "Alex Rivera", email: "alex@email.com", total: 520, items: 2, status: "pending", date: "Feb 17, 2026", payment: "Paid", address: "100 Main St, Austin, TX", products: [{ name: "Ocean Silk Tie", qty: 2, price: 370 }] }, null, 2),
  },
  {
    method: "GET", path: "/api/orders/:id", description: "Get a single order by ID.",
    category: "Orders",
    params: [{ name: "id", type: "string", required: true, description: "Order ID (e.g. ORD-001)" }],
  },
  {
    method: "PATCH", path: "/api/orders/:id", description: "Update an order's status.",
    category: "Orders",
    params: [{ name: "id", type: "string", required: true, description: "Order ID" }],
    body: [{ name: "status", type: "string", required: true, description: "New status: pending, processing, shipped, completed, cancelled" }],
    example: JSON.stringify({ status: "shipped" }, null, 2),
  },
  // Customers
  {
    method: "GET", path: "/api/customers", description: "List all customers. Supports search.",
    category: "Customers",
    params: [{ name: "search", type: "string", required: false, description: "Search by name or email" }],
  },
  {
    method: "GET", path: "/api/customers/:id", description: "Get a single customer by ID.",
    category: "Customers",
    params: [{ name: "id", type: "number", required: true, description: "Customer ID" }],
  },
  // Settings
  {
    method: "GET", path: "/api/settings", description: "Get current store settings.",
    category: "Settings",
  },
  {
    method: "PUT", path: "/api/settings", description: "Update store settings. Send only the fields you want to change.",
    category: "Settings",
    body: [
      { name: "storeName", type: "string", required: false, description: "Store name" },
      { name: "contactEmail", type: "string", required: false, description: "Contact email" },
      { name: "phone", type: "string", required: false, description: "Phone number" },
      { name: "currency", type: "string", required: false, description: "Currency" },
      { name: "description", type: "string", required: false, description: "Store description" },
      { name: "address", type: "string", required: false, description: "Store address" },
    ],
    example: JSON.stringify({ storeName: "MAISON", contactEmail: "hello@maison.com" }, null, 2),
  },
  // Analytics
  {
    method: "GET", path: "/api/analytics", description: "Get store analytics: revenue, orders, customers, stock alerts, and trends.",
    category: "Analytics",
  },
]

const methodColors: Record<string, string> = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200",
  POST: "bg-blue-50 text-blue-700 border-blue-200",
  PUT: "bg-amber-50 text-amber-700 border-amber-200",
  PATCH: "bg-purple-50 text-purple-700 border-purple-200",
  DELETE: "bg-red-50 text-red-700 border-red-200",
}

const categories = ["All", "Products", "Orders", "Customers", "Settings", "Analytics"]

interface RequestLog {
  id: number
  method: string
  path: string
  status: number | null
  duration: number | null
  timestamp: Date
  response: string | null
  isLoading: boolean
}

export function McpSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null)
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState("")
  const [requestLogs, setRequestLogs] = useState<RequestLog[]>([])
  const [logCounter, setLogCounter] = useState(0)

  const getBaseUrl = useCallback(() => {
    if (baseUrl) return baseUrl
    if (typeof window !== "undefined") return window.location.origin
    return ""
  }, [baseUrl])

  const filteredEndpoints = selectedCategory === "All"
    ? endpoints
    : endpoints.filter(e => e.category === selectedCategory)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPath(key)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  const toggleEndpoint = (key: string) => {
    setExpandedEndpoint(prev => prev === key ? null : key)
  }

  const executeRequest = async (endpoint: ApiEndpoint) => {
    const id = logCounter + 1
    setLogCounter(id)

    const resolvedPath = endpoint.path.replace(/:id/g, "1")
    const fullUrl = `${getBaseUrl()}${resolvedPath}`

    const newLog: RequestLog = {
      id,
      method: endpoint.method,
      path: resolvedPath,
      status: null,
      duration: null,
      timestamp: new Date(),
      response: null,
      isLoading: true,
    }

    setRequestLogs(prev => [newLog, ...prev].slice(0, 20))

    const start = performance.now()

    try {
      const options: RequestInit = { method: endpoint.method }
      if (endpoint.example && (endpoint.method === "POST" || endpoint.method === "PUT" || endpoint.method === "PATCH")) {
        options.headers = { "Content-Type": "application/json" }
        options.body = endpoint.example
      }

      const res = await fetch(fullUrl, options)
      const duration = Math.round(performance.now() - start)
      const data = await res.json()

      setRequestLogs(prev =>
        prev.map(log =>
          log.id === id
            ? { ...log, status: res.status, duration, response: JSON.stringify(data, null, 2), isLoading: false }
            : log
        )
      )
    } catch (err) {
      const duration = Math.round(performance.now() - start)
      setRequestLogs(prev =>
        prev.map(log =>
          log.id === id
            ? { ...log, status: 0, duration, response: `Error: ${err instanceof Error ? err.message : "Request failed"}`, isLoading: false }
            : log
        )
      )
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">API / MCP Console</h1>
          <p className="text-muted-foreground">
            Explore and test the REST API. Connect an MCP server or AI agent to operate the entire store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            API Online
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-card rounded-xl border border-border shadow-elegant p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base mb-2">Quick Start</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This API lets an AI agent or MCP server fully manage the MAISON store — products, orders, customers, settings, and analytics. All endpoints return JSON.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-lg">
                <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">18 Endpoints</p>
                  <p className="text-[10px] text-muted-foreground">Full CRUD operations</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-lg">
                <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">REST API</p>
                  <p className="text-[10px] text-muted-foreground">Standard HTTP methods</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-lg">
                <Terminal className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">Live Testing</p>
                  <p className="text-[10px] text-muted-foreground">Execute requests below</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base URL Config */}
      <div className="bg-card rounded-xl border border-border shadow-elegant p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-sm font-medium whitespace-nowrap">Base URL:</label>
          <div className="flex-1 w-full">
            <Input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}
              className="h-10 font-mono text-sm bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Leave empty to use current origin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="xl:col-span-2">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-4">
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

          {/* Endpoints */}
          <div className="space-y-2">
            {filteredEndpoints.map((endpoint) => {
              const key = `${endpoint.method}-${endpoint.path}`
              const isExpanded = expandedEndpoint === key

              return (
                <div key={key} className="bg-card rounded-xl border border-border shadow-elegant overflow-hidden">
                  <button
                    onClick={() => toggleEndpoint(key)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <Badge variant="outline" className={cn("font-mono text-[10px] font-semibold px-2 py-0.5 shrink-0", methodColors[endpoint.method])}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono flex-1 truncate">{endpoint.path}</code>
                    <span className="text-xs text-muted-foreground hidden sm:block max-w-[200px] truncate">{endpoint.description}</span>
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border p-4 bg-muted/10">
                      <p className="text-sm text-muted-foreground mb-4">{endpoint.description}</p>

                      {/* URL with copy */}
                      <div className="flex items-center gap-2 mb-4">
                        <code className="flex-1 text-xs font-mono bg-muted/50 px-3 py-2 rounded-lg truncate">
                          {getBaseUrl()}{endpoint.path}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => copyToClipboard(`${getBaseUrl()}${endpoint.path}`, key)}
                        >
                          {copiedPath === key ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>

                      {/* Parameters */}
                      {endpoint.params && endpoint.params.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Parameters</p>
                          <div className="space-y-1.5">
                            {endpoint.params.map(p => (
                              <div key={p.name} className="flex items-center gap-2 text-xs">
                                <code className="font-mono bg-muted px-1.5 py-0.5 rounded">{p.name}</code>
                                <span className="text-muted-foreground">{p.type}</span>
                                {p.required && <Badge variant="outline" className="text-[9px] px-1 py-0 border-red-200 text-red-600">required</Badge>}
                                <span className="text-muted-foreground">— {p.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Request Body */}
                      {endpoint.body && endpoint.body.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Request Body (JSON)</p>
                          <div className="space-y-1.5">
                            {endpoint.body.map(b => (
                              <div key={b.name} className="flex items-start gap-2 text-xs">
                                <code className="font-mono bg-muted px-1.5 py-0.5 rounded shrink-0">{b.name}</code>
                                <span className="text-muted-foreground shrink-0">{b.type}</span>
                                {b.required && <Badge variant="outline" className="text-[9px] px-1 py-0 border-red-200 text-red-600 shrink-0">required</Badge>}
                                <span className="text-muted-foreground">— {b.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Example Body */}
                      {endpoint.example && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Example Body</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-[10px] gap-1"
                              onClick={() => copyToClipboard(endpoint.example!, `example-${key}`)}
                            >
                              {copiedPath === `example-${key}` ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs font-mono bg-muted/50 p-3 rounded-lg overflow-x-auto whitespace-pre">{endpoint.example}</pre>
                        </div>
                      )}

                      {/* Execute Button */}
                      <Button
                        onClick={() => executeRequest(endpoint)}
                        className="gap-2 h-9 text-xs"
                      >
                        <Play className="h-3.5 w-3.5" />
                        Execute Request
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Request Log */}
        <div className="xl:col-span-1">
          <div className="bg-card rounded-xl border border-border shadow-elegant sticky top-24">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Request Log</h3>
              </div>
              {requestLogs.length > 0 && (
                <button
                  onClick={() => setRequestLogs([])}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {requestLogs.length === 0 ? (
                <div className="p-8 text-center">
                  <Terminal className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No requests yet</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Execute an endpoint to see results here</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {requestLogs.map((log) => (
                    <LogEntry key={log.id} log={log} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LogEntry({ log }: { log: RequestLog }) {
  const [expanded, setExpanded] = useState(false)

  const statusIcon = log.isLoading ? (
    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
  ) : log.status && log.status >= 200 && log.status < 300 ? (
    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
  ) : (
    <XCircle className="h-3.5 w-3.5 text-red-500" />
  )

  return (
    <div className="p-3">
      <button
        onClick={() => !log.isLoading && setExpanded(!expanded)}
        className="w-full text-left"
        disabled={log.isLoading}
      >
        <div className="flex items-center gap-2 mb-1">
          {statusIcon}
          <Badge variant="outline" className={cn("font-mono text-[9px] font-semibold px-1.5 py-0", methodColors[log.method])}>
            {log.method}
          </Badge>
          <code className="text-[11px] font-mono truncate flex-1">{log.path}</code>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground pl-5">
          {log.status !== null && (
            <span className={cn("font-medium", log.status >= 200 && log.status < 300 ? "text-green-600" : "text-red-500")}>
              {log.status}
            </span>
          )}
          {log.duration !== null && (
            <span className="flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              {log.duration}ms
            </span>
          )}
          <span>{log.timestamp.toLocaleTimeString()}</span>
          {!log.isLoading && log.response && (
            <ArrowRight className={cn("h-2.5 w-2.5 transition-transform ml-auto", expanded && "rotate-90")} />
          )}
        </div>
      </button>
      {expanded && log.response && (
        <pre className="mt-2 text-[10px] font-mono bg-muted/50 p-2.5 rounded-lg overflow-x-auto max-h-48 overflow-y-auto whitespace-pre">
          {log.response}
        </pre>
      )}
    </div>
  )
}
