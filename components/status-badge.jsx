import { cn } from "@/lib/utils"

const toneMap = {
  Active: "bg-success/15 text-success",
  Online: "bg-success/15 text-success",
  "In Stock": "bg-success/15 text-success",
  Paid: "bg-success/15 text-success",
  Delivered: "bg-success/15 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Offline: "bg-muted text-muted-foreground",
  Away: "bg-warning/15 text-warning-foreground",
  "Low Stock": "bg-warning/15 text-warning-foreground",
  Pending: "bg-warning/15 text-warning-foreground",
  Processing: "bg-primary/10 text-primary",
  Shipped: "bg-primary/10 text-primary",
  Cancelled: "bg-destructive/10 text-destructive",
  Refunded: "bg-destructive/10 text-destructive",
}

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneMap[status] || "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  )
}
