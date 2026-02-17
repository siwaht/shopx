#!/usr/bin/env node
/**
 * MAISON E-Commerce MCP Server
 * 
 * Model Context Protocol server that exposes the entire MAISON store
 * for AI agent control. Connect this to any MCP-compatible AI agent
 * to manage products, orders, customers, content, and settings.
 * 
 * Usage: npx tsx mcp-server.ts
 * Base URL defaults to http://localhost:3000 (set BASE_URL env to override)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`)
  return data
}

const server = new McpServer({
  name: "maison-store",
  version: "1.0.0",
})

// ─── Products ───────────────────────────────────────────────────

server.tool("list_products", "List all products in the store with optional filtering by category or status", {
  category: z.string().optional().describe("Filter by category (e.g. Outerwear, Accessories, Dresses)"),
  status: z.string().optional().describe("Filter by status: active, low_stock, out_of_stock"),
}, async ({ category, status }) => {
  let products = await api("/products")
  if (category) products = products.filter((p: Record<string, string>) => p.category.toLowerCase() === category.toLowerCase())
  if (status) products = products.filter((p: Record<string, string>) => p.status === status)
  return { content: [{ type: "text" as const, text: JSON.stringify(products, null, 2) }] }
})

server.tool("get_product", "Get detailed information about a specific product by ID", {
  id: z.number().describe("Product ID"),
}, async ({ id }) => {
  const product = await api(`/products/${id}`)
  return { content: [{ type: "text" as const, text: JSON.stringify(product, null, 2) }] }
})

server.tool("create_product", "Create a new product in the store", {
  name: z.string().describe("Product name"),
  price: z.number().describe("Product price in USD"),
  originalPrice: z.number().nullable().optional().describe("Original price before discount (null if no discount)"),
  stock: z.number().describe("Stock quantity"),
  category: z.string().describe("Product category"),
  image: z.string().optional().describe("Image path (e.g. /images/bestseller-1.jpg)"),
  color: z.string().optional().describe("Product color"),
  description: z.string().optional().describe("Product description"),
  isNew: z.boolean().optional().describe("Whether this is a new arrival"),
}, async (params) => {
  const product = await api("/products", {
    method: "POST",
    body: JSON.stringify({
      ...params,
      originalPrice: params.originalPrice ?? null,
      image: params.image || "/images/bestseller-1.jpg",
      color: params.color || "Classic",
      description: params.description || "",
      isNew: params.isNew ?? false,
      status: params.stock === 0 ? "out_of_stock" : params.stock <= 10 ? "low_stock" : "active",
      rating: 5.0,
      reviews: 0,
    }),
  })
  return { content: [{ type: "text" as const, text: `Product created:\n${JSON.stringify(product, null, 2)}` }] }
})

server.tool("update_product", "Update an existing product's details", {
  id: z.number().describe("Product ID to update"),
  name: z.string().optional().describe("New product name"),
  price: z.number().optional().describe("New price"),
  originalPrice: z.number().nullable().optional().describe("New original price"),
  stock: z.number().optional().describe("New stock quantity"),
  category: z.string().optional().describe("New category"),
  image: z.string().optional().describe("New image path"),
  color: z.string().optional().describe("New color"),
  description: z.string().optional().describe("New description"),
  status: z.string().optional().describe("New status: active, low_stock, out_of_stock"),
  isNew: z.boolean().optional().describe("Mark as new arrival"),
}, async ({ id, ...updates }) => {
  const product = await api(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  })
  return { content: [{ type: "text" as const, text: `Product updated:\n${JSON.stringify(product, null, 2)}` }] }
})

server.tool("delete_product", "Delete a product from the store", {
  id: z.number().describe("Product ID to delete"),
}, async ({ id }) => {
  await api(`/products/${id}`, { method: "DELETE" })
  return { content: [{ type: "text" as const, text: `Product ${id} deleted successfully.` }] }
})

// ─── Orders ─────────────────────────────────────────────────────

server.tool("list_orders", "List all orders with optional status filtering", {
  status: z.string().optional().describe("Filter by status: pending, processing, shipped, completed, cancelled"),
}, async ({ status }) => {
  let orders = await api("/orders")
  if (status) orders = orders.filter((o: Record<string, string>) => o.status === status)
  return { content: [{ type: "text" as const, text: JSON.stringify(orders, null, 2) }] }
})

server.tool("get_order", "Get detailed information about a specific order", {
  id: z.string().describe("Order ID (e.g. ORD-001)"),
}, async ({ id }) => {
  const order = await api(`/orders/${id}`)
  return { content: [{ type: "text" as const, text: JSON.stringify(order, null, 2) }] }
})

server.tool("update_order_status", "Update the status of an order", {
  id: z.string().describe("Order ID (e.g. ORD-001)"),
  status: z.enum(["pending", "processing", "shipped", "completed", "cancelled"]).describe("New order status"),
}, async ({ id, status }) => {
  const order = await api(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
  return { content: [{ type: "text" as const, text: `Order ${id} status updated to "${status}":\n${JSON.stringify(order, null, 2)}` }] }
})

// ─── Customers ──────────────────────────────────────────────────

server.tool("list_customers", "List all customers with optional status filtering", {
  status: z.string().optional().describe("Filter by status: active, vip, new"),
}, async ({ status }) => {
  let customers = await api("/customers")
  if (status) customers = customers.filter((c: Record<string, string>) => c.status === status)
  return { content: [{ type: "text" as const, text: JSON.stringify(customers, null, 2) }] }
})

server.tool("get_customer", "Get detailed information about a specific customer", {
  id: z.number().describe("Customer ID"),
}, async ({ id }) => {
  const customer = await api(`/customers/${id}`)
  return { content: [{ type: "text" as const, text: JSON.stringify(customer, null, 2) }] }
})

// ─── Settings ───────────────────────────────────────────────────

server.tool("get_settings", "Get current store settings", {}, async () => {
  const settings = await api("/settings")
  return { content: [{ type: "text" as const, text: JSON.stringify(settings, null, 2) }] }
})

server.tool("update_settings", "Update store settings", {
  storeName: z.string().optional().describe("Store name"),
  contactEmail: z.string().optional().describe("Contact email"),
  phone: z.string().optional().describe("Phone number"),
  currency: z.string().optional().describe("Currency display"),
  description: z.string().optional().describe("Store description"),
  address: z.string().optional().describe("Store address"),
}, async (updates) => {
  const settings = await api("/settings", {
    method: "PUT",
    body: JSON.stringify(updates),
  })
  return { content: [{ type: "text" as const, text: `Settings updated:\n${JSON.stringify(settings, null, 2)}` }] }
})

// ─── Content (Hero, Header, Menu) ───────────────────────────────

server.tool("get_site_content", "Get all site content including header, hero, and section text", {}, async () => {
  const content = await api("/content")
  return { content: [{ type: "text" as const, text: JSON.stringify(content, null, 2) }] }
})

server.tool("update_header", "Update the site header: logo text, announcement bar, and visibility", {
  logo: z.string().optional().describe("Logo text (e.g. MAISON)"),
  announcement: z.string().optional().describe("Announcement bar text"),
  showAnnouncement: z.boolean().optional().describe("Show or hide the announcement bar"),
}, async (updates) => {
  const content = await api("/content", {
    method: "PUT",
    body: JSON.stringify({ section: "header", updates }),
  })
  return { content: [{ type: "text" as const, text: `Header updated:\n${JSON.stringify(content.header, null, 2)}` }] }
})

server.tool("update_hero", "Update the hero section: headline, description, badge, buttons, and image", {
  badge: z.string().optional().describe("Badge text above headline (e.g. Spring/Summer 2026)"),
  headline: z.string().optional().describe("Main headline text"),
  highlightWord: z.string().optional().describe("Word in headline to highlight in accent color"),
  description: z.string().optional().describe("Hero description paragraph"),
  primaryButtonText: z.string().optional().describe("Primary CTA button text"),
  secondaryButtonText: z.string().optional().describe("Secondary CTA button text"),
  heroImage: z.string().optional().describe("Hero image path (e.g. /images/hero-vibrant.jpg)"),
}, async (updates) => {
  const content = await api("/content", {
    method: "PUT",
    body: JSON.stringify({ section: "hero", updates }),
  })
  return { content: [{ type: "text" as const, text: `Hero updated:\n${JSON.stringify(content.hero, null, 2)}` }] }
})

server.tool("update_menu_items", "Update the navigation menu items", {
  menuItems: z.array(z.object({
    label: z.string().describe("Menu item label"),
    href: z.string().describe("Menu item link (use #section-id for page sections)"),
  })).describe("Array of menu items"),
}, async ({ menuItems }) => {
  const content = await api("/content", {
    method: "PUT",
    body: JSON.stringify({ section: "header", updates: { menuItems } }),
  })
  return { content: [{ type: "text" as const, text: `Menu updated:\n${JSON.stringify(content.header, null, 2)}` }] }
})

// ─── Analytics ──────────────────────────────────────────────────

server.tool("get_analytics", "Get store analytics: revenue, orders, customers, stock levels", {}, async () => {
  const analytics = await api("/analytics")
  return { content: [{ type: "text" as const, text: JSON.stringify(analytics, null, 2) }] }
})

// ─── Resources ──────────────────────────────────────────────────

server.resource("store-overview", "maison://store/overview", async (uri) => {
  const [analytics, settings] = await Promise.all([
    api("/analytics"),
    api("/settings"),
  ])
  const overview = {
    store: settings.storeName,
    description: settings.description,
    analytics,
    apiBase: BASE_URL,
  }
  return {
    contents: [{
      uri: uri.href,
      mimeType: "application/json",
      text: JSON.stringify(overview, null, 2),
    }],
  }
})

// ─── Start Server ───────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("MAISON MCP Server running on stdio")
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
