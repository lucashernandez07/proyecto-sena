import { cn } from "@/lib/utils"
import { getScoreColor } from "@/lib/mock-data"

interface ScoreCircleProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ScoreCircle({ score, size = "md" }: ScoreCircleProps) {
  const scoreColor = getScoreColor(score)

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-20 h-20 text-3xl",
    lg: "w-24 h-24 text-4xl",
  }

  return (
    <div
      className={cn("rounded-full border-4 flex items-center justify-center font-bold", scoreColor, sizeClasses[size])}
    >
      {score.toFixed(1)}
    </div>
  )
}
