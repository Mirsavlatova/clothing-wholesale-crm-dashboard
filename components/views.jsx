"use client"

import { MetricCards } from "@/components/metric-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { CategoryChart } from "@/components/category-chart"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { Card } from "@/components/ui/card"
import {
  customers,
  products,
  orders,
  users,
  formatCurrency,
  formatNumber,
} from "@/lib/data"

function Mono({ children }) {
  return <span className="font-mono text-xs text-muted-foreground">{children}</span>
}

export function DashboardView() {
  return (
    <div className="space-y-6">
      <MetricCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart />
        <CategoryChart />
      </div>
      <CustomersView recent />
    </div>
  )
}

export function CustomersView({ recent }) {
  const rows = recent ? customers.slice(0, 6) : customers
  return (
    <DataTable
      title={recent ? "Recent Customers" : "Customers"}
      description={recent ? "Latest registered wholesale accounts" : "All wholesale customer accounts"}
      rows={rows}
      searchKeys={["name", "company", "city", "email"]}
      columns={[
        { key: "id", label: "ID", render: (r) => <Mono>{r.id}</Mono> },
        { key: "name", label: "Customer", render: (r) => (
          <div>
            <p className="font-medium text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.company}</p>
          </div>
        ) },
        { key: "city", label: "City" },
        { key: "orders", label: "Orders", align: "right" },
        { key: "spent", label: "Total Spent", align: "right", render: (r) => (
          <span className="font-medium">{formatCurrency(r.spent)}</span>
        ) },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  )
}

export function ProductsView() {
  return (
    <DataTable
      title="Products"
      description="Full wholesale product catalog"
      rows={products}
      searchKeys={["name", "category", "sku"]}
      columns={[
        { key: "name", label: "Product", render: (r) => (
          <div>
            <p className="font-medium text-foreground">{r.name}</p>
            <Mono>{r.sku}</Mono>
          </div>
        ) },
        { key: "category", label: "Category" },
        { key: "price", label: "Price", align: "right", render: (r) => formatCurrency(r.price) },
        { key: "stock", label: "Stock", align: "right", render: (r) => formatNumber(r.stock) },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  )
}

export function OrdersView() {
  return (
    <DataTable
      title="Orders"
      description="Recent wholesale orders"
      rows={orders}
      searchKeys={["id", "customer", "status"]}
      columns={[
        { key: "id", label: "Order", render: (r) => <Mono>{r.id}</Mono> },
        { key: "customer", label: "Customer", render: (r) => (
          <span className="font-medium text-foreground">{r.customer}</span>
        ) },
        { key: "date", label: "Date" },
        { key: "items", label: "Items", align: "right" },
        { key: "total", label: "Total", align: "right", render: (r) => (
          <span className="font-medium">{formatCurrency(r.total)}</span>
        ) },
        { key: "payment", label: "Payment", render: (r) => <StatusBadge status={r.payment} /> },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  )
}

export function InventoryView() {
  const lowStock = products.filter((p) => p.status === "Low Stock")
  const totalUnits = products.reduce((s, p) => s + p.stock, 0)
  const inventoryValue = products.reduce((s, p) => s + p.stock * p.price, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-medium text-muted-foreground">Total Units</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatNumber(totalUnits)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(inventoryValue)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
          <p className="mt-2 text-2xl font-bold text-warning-foreground">{lowStock.length}</p>
        </Card>
      </div>
      <DataTable
        title="Inventory Levels"
        description="Stock quantities across the warehouse"
        rows={products}
        searchKeys={["name", "category", "sku"]}
        columns={[
          { key: "sku", label: "SKU", render: (r) => <Mono>{r.sku}</Mono> },
          { key: "name", label: "Product", render: (r) => (
            <span className="font-medium text-foreground">{r.name}</span>
          ) },
          { key: "category", label: "Category" },
          { key: "stock", label: "On Hand", align: "right", render: (r) => formatNumber(r.stock) },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </div>
  )
}

export function ReportsView() {
  return (
    <div className="space-y-6">
      <MetricCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart />
        <CategoryChart />
      </div>
    </div>
  )
}

export function UsersView() {
  return (
    <DataTable
      title="Team Members"
      description="System users and access roles"
      rows={users}
      searchKeys={["name", "email", "role"]}
      columns={[
        { key: "name", label: "Name", render: (r) => (
          <span className="font-medium text-foreground">{r.name}</span>
        ) },
        { key: "email", label: "Email", render: (r) => (
          <span className="text-muted-foreground">{r.email}</span>
        ) },
        { key: "role", label: "Role" },
        { key: "lastActive", label: "Last Active" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  )
}
