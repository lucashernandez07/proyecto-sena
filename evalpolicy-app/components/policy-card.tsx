"use client"

import { TrendingUp, Shield, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Policy } from "@/types/policy"
import { categoryColors, getScoreColor, getStatusBadge } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PolicyCardProps {
  policy: Policy
}

export function PolicyCard({ policy }: PolicyCardProps) {
  const statusBadge = getStatusBadge(policy.score)
  const scoreColor = getScoreColor(policy.score)

  return (
    <Link href={`/politicas/${policy.id}`}>
      <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer relative">
        {/* Category Badge */}
        <Badge className={cn("absolute top-4 left-4", categoryColors[policy.category])}>{policy.category}</Badge>

        {/* Score Circle */}
        <div
          className={cn(
            "absolute top-4 right-4 w-16 h-16 rounded-full border-4 flex items-center justify-center",
            scoreColor,
          )}
        >
          <span className="text-2xl font-bold">{policy.score}</span>
        </div>

        {/* Content */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{policy.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">{policy.description}</p>

          {/* Icons Section */}
          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 line-clamp-1">{policy.benefits}</p>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 line-clamp-1">{policy.risks}</p>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 line-clamp-1">{policy.costs}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Badge className={statusBadge.color}>{statusBadge.text}</Badge>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{policy.date}</span>
              {policy.alerts > 0 && (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {policy.alerts} alerta{policy.alerts > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
