"use client"

import { Cell, Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { categoryData, formatCurrency } from "@/lib/data"

const chartConfig = {
  footwear: { label: "Footwear", color: "var(--chart-1)" },
  jacket: { label: "Jacket", color: "var(--chart-2)" },
  hoodie: { label: "Hoodie", color: "var(--chart-3)" },
  pants: { label: "Pants", color: "var(--chart-4)" },
}

const total = categoryData.reduce((sum, d) => sum + d.value, 0)

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue split across product lines</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[220px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel formatter={(value) => formatCurrency(value)} />}
            />
            <Pie data={categoryData} dataKey="value" nameKey="key" innerRadius={62} strokeWidth={4}>
              {categoryData.map((entry) => (
                <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-bold">
                          ${(total / 1000000).toFixed(0)}M
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-xs">
                          Total Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Custom legend */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {categoryData.map((entry) => {
            const pct = ((entry.value / total) * 100).toFixed(1)
            return (
              <div key={entry.key} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: `var(--color-${entry.key})` }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{entry.category}</p>
                  <p className="text-xs text-muted-foreground">{pct}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
