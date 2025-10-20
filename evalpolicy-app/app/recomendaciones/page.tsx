"use client"

import { Lightbulb, AlertTriangle, Target, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockRecommendations } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { month: "May", score: 6.8 },
  { month: "Jun", score: 7.1 },
  { month: "Jul", score: 6.9 },
  { month: "Ago", score: 7.3 },
  { month: "Sep", score: 7.0 },
  { month: "Oct", score: 7.2 },
]

const heatmapData = [
  { category: "Salud", Q1: 8, Q2: 12, Q3: 10, Q4: 15 },
  { category: "Educación", Q1: 10, Q2: 15, Q3: 12, Q4: 18 },
  { category: "Transporte", Q1: 5, Q2: 8, Q3: 6, Q4: 10 },
  { category: "Economía", Q1: 6, Q2: 7, Q3: 8, Q4: 9 },
  { category: "Ambiente", Q1: 3, Q2: 5, Q3: 4, Q4: 6 },
]

const getHeatmapColor = (value: number) => {
  if (value >= 15) return "bg-green-700"
  if (value >= 10) return "bg-green-500"
  if (value >= 5) return "bg-yellow-400"
  return "bg-red-400"
}

export default function RecomendacionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recomendaciones del Sistema</h1>
          <p className="text-gray-600">Generadas por análisis de IA basado en 47 políticas</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Actualizado hace 2 horas
        </Badge>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {mockRecommendations.map((rec) => {
          const Icon = rec.type === "TENDENCIA" ? Lightbulb : rec.type === "ALERTA" ? AlertTriangle : Target
          const borderColor =
            rec.type === "TENDENCIA"
              ? "border-l-blue-500"
              : rec.type === "ALERTA"
                ? "border-l-red-500"
                : "border-l-green-500"
          const bgColor = rec.type === "TENDENCIA" ? "bg-blue-50" : rec.type === "ALERTA" ? "bg-red-50" : "bg-green-50"
          const iconColor =
            rec.type === "TENDENCIA" ? "text-yellow-500" : rec.type === "ALERTA" ? "text-red-500" : "text-green-500"
          const badgeColor =
            rec.type === "TENDENCIA"
              ? "bg-blue-100 text-blue-800"
              : rec.type === "ALERTA"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"

          return (
            <Card key={rec.id} className={`p-6 border-l-4 ${borderColor} ${bgColor}`}>
              <div className="flex items-start gap-4">
                <Icon className={`w-12 h-12 ${iconColor} flex-shrink-0`} />
                <div className="flex-1">
                  <Badge className={badgeColor}>{rec.type}</Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{rec.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{rec.description}</p>
                  <div className="flex items-start gap-2 p-4 bg-white rounded-lg border border-gray-200">
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Acción Sugerida:</p>
                      <p className="text-sm text-gray-700">{rec.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Gap Analysis */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Análisis de Brechas</h2>
        <p className="text-sm text-gray-600 mb-6">Distribución de análisis por categoría y trimestre</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Categoría</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-700">Q1</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-700">Q2</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-700">Q3</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-700">Q4</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row) => (
                <tr key={row.category} className="border-t">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.category}</td>
                  <td className="py-3 px-4">
                    <div
                      className={`h-12 rounded flex items-center justify-center text-white font-semibold ${getHeatmapColor(row.Q1)}`}
                    >
                      {row.Q1}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`h-12 rounded flex items-center justify-center text-white font-semibold ${getHeatmapColor(row.Q2)}`}
                    >
                      {row.Q2}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`h-12 rounded flex items-center justify-center text-white font-semibold ${getHeatmapColor(row.Q3)}`}
                    >
                      {row.Q3}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`h-12 rounded flex items-center justify-center text-white font-semibold ${getHeatmapColor(row.Q4)}`}
                    >
                      {row.Q4}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Temporal Trends */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tendencias Temporales</h2>
        <p className="text-sm text-gray-600 mb-6">Score promedio de políticas en los últimos 6 meses</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[6, 8]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
