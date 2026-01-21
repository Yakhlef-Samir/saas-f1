"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  badge?: string
}

export function StatCard({ title, value, icon, trend, badge }: StatCardProps) {
  return (
    <Card className="f1-stat-card f1-transform flex-1 h-24">
      <CardContent className="p-4 h-full flex flex-row justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="f1-stat-icon">
              {icon}
            </div>
            <div className="flex flex-col">
              <div className="f1-stat-value text-lg font-bold">{value}</div>
              <div className="flex items-center space-x-2">
                <p className="f1-stat-label text-sm">{title}</p>
                {trend && (
                  <div className={`text-xs font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.value}
                  </div>
                )}
              </div>
            </div>
          </div>
          {badge && (
            <Badge variant="secondary" className="f1-stat-badge">
              {badge}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGrid() {
  return (
    <div className="flex flex-row justify-center gap-4 w-full">
      <StatCard
        title="Courses Participées"
        value="12"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7m9 11l-3-3m0 0l-3 3m3-3V7m0 4l-3-3m-3 3h.01M9 16h.01" />
          </svg>
        }
        trend={{ value: "+2", isPositive: true }}
      />

      <StatCard
        title="Victoires"
        value="3"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        trend={{ value: "+1", isPositive: true }}
      />

      <StatCard
        title="Podiums"
        value="8"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        trend={{ value: "+3", isPositive: true }}
      />

      <StatCard
        title="Meilleur Tour"
        value="1:23.456"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
        trend={{ value: "-0.234", isPositive: false }}
      />
    </div>
  )
}
