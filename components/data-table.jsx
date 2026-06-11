"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"

export function DataTable({ title, description, columns, rows, searchKeys }) {
  const [query, setQuery] = useState("")

  const filtered = rows.filter((row) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (searchKeys || Object.keys(row)).some((key) =>
      String(row[key] ?? "").toLowerCase().includes(q),
    )
  })

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/40 transition focus:ring-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 font-medium text-muted-foreground ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-3.5 ${col.align === "right" ? "text-right" : ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-muted-foreground">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        Showing {filtered.length} of {rows.length} records
      </div>
    </Card>
  )
}
