"use client"

import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityCardProps {
  title: string
  circuit: string
  badge: string
  badgeVariant: "completed" | "upcoming" | "default"
  meta?: Array<{
    label: string
    value: string
    icon: React.ReactNode
  }>
  onClick?: () => void
}

export function ActivityCard({ title, circuit, badge, badgeVariant = "default", meta, onClick }: ActivityCardProps) {
  return (
    <Card className="f1-race-card f1-transform cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
      <div className="f1-race-card-image">
        <div className="f1-race-card-image-placeholder">
          {badge === "TERMINÉE" && "🏁"}
          {badge === "SIMULATION" && "🧠"}
          {badge === "ANALYSE" && "📊"}
          {badge === "ACTIF" && "👤"}
        </div>
        <div className={`f1-race-card-badge ${badgeVariant}`}>{badge}</div>
      </div>
      <CardContent className="f1-race-card-content">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className={`f1-race-card-badge ${badgeVariant}`}>{badge}</div>
        </CardHeader>
        <CardDescription className="f1-race-card-circuit">{circuit}</CardDescription>
        <div className="f1-race-card-meta">
          {meta?.map((item, index) => (
            <div key={index} className="f1-race-card-meta-item">
              {item.icon}
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ActivityGrid() {
  const navigate = useNavigate()

  const activities = [
    {
      title: "Course terminée",
      circuit: "Monaco Grand Prix",
      badge: "TERMINÉE",
      badgeVariant: "completed" as const,
      meta: [
        { label: "Position:", value: "P5", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
        { label: "Points:", value: "+10", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> }
      ],
      onClick: () => navigate('/library?tab=completed')
    },
    {
      title: "Nouvelle stratégie",
      circuit: "Strategy Analysis",
      badge: "SIMULATION",
      badgeVariant: "upcoming" as const,
      meta: [
        { label: "Gain:", value: "+2 positions", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
        { label: "Confiance:", value: "85%", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> }
      ],
      onClick: () => navigate('/strategy/new')
    },
    {
      title: "Simulation terminée",
      circuit: "Performance Review",
      badge: "ANALYSE",
      badgeVariant: "upcoming" as const,
      meta: [
        { label: "Précision:", value: "92%", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
        { label: "Optimisation:", value: "+15%", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
      ],
      onClick: () => navigate('/analysis/monaco')
    },
    {
      title: "Profil Pilote",
      circuit: "Red Bull Racing",
      badge: "ACTIF",
      badgeVariant: "completed" as const,
      meta: [
        { label: "Niveau:", value: "12", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
        { label: "XP:", value: "650/1000", icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> }
      ],
      onClick: () => navigate('/profile')
    }
  ]

  return (
    <div className="f1-race-grid-container p-4">
      {activities.map((activity, index) => (
        <ActivityCard key={index} {...activity} onClick={activity.onClick} />
      ))}
    </div>
  )
}
