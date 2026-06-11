"use client"

import { DollarSign, ShoppingBag, UsersRound, Package, TrendingDown, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metrics = [
  {
    label: "Total Revenue",
    value: "$365,783,000",
    icon: DollarSign,
    trend: { text: "-61.8% from last month", icon: TrendingDown, tone: "negative" },
  },
  {
    label: "Active Orders",
    value: "19",
    icon: ShoppingBag,
    trend: { text: "6 pending processing", tone: "neutral" },
  },
  {
    label: "Active Customers",
    value: "30",
    icon: UsersRound,
    trend: { text: "+4 new this week", tone: "neutral" },
  },
  {
    label: "Products",
    value: "50",
    icon: Package,
    trend: { text: "9 low stock items", icon: AlertTriangle, tone: "warning" },
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => {
        const Icon = m.icon
        const TrendIcon = m.trend.icon
        return (
          <Card key={m.label} className="p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-[18px] w-[18px]" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">{m.value}</p>
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
                m.trend.tone === "negative" && "bg-destructive/10 text-destructive",
                m.trend.tone === "warning" && "bg-warning/15 text-warning-foreground",
                m.trend.tone === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              {TrendIcon && <TrendIcon className="h-3.5 w-3.5" />}
              {m.trend.text}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
