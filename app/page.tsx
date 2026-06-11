"use client"

import { useState } from "react"
import { Menu, Bell, Search } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import {
  DashboardView,
  CustomersView,
  ProductsView,
  OrdersView,
  InventoryView,
  ReportsView,
  UsersView,
} from "@/components/views"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const titles = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, Ruxshona Mirsavlatova. Here's what's happening today." },
  customers: { title: "Customers", subtitle: "Manage your wholesale customer accounts." },
  products: { title: "Products", subtitle: "Browse and manage your product catalog." },
  orders: { title: "Orders", subtitle: "Track and process wholesale orders." },
  inventory: { title: "Inventory", subtitle: "Monitor stock levels across the warehouse." },
  reports: { title: "Reports", subtitle: "Analyze revenue and sales performance." },
  users: { title: "Users", subtitle: "Manage team members and access roles." },
}

export default function Page() {
  const [active, setActive] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = (id) => {
    setActive(id)
    setSidebarOpen(false)
  }

  const header = titles[active]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-card/80 px-4 py-3 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/40 transition focus:ring-2"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                RM
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
              {header.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">{header.subtitle}</p>
          </div>

          {active === "dashboard" && <DashboardView />}
          {active === "customers" && <CustomersView />}
          {active === "products" && <ProductsView />}
          {active === "orders" && <OrdersView />}
          {active === "inventory" && <InventoryView />}
          {active === "reports" && <ReportsView />}
          {active === "users" && <UsersView />}
        </main>
      </div>
    </div>
  )
}
