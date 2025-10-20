"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScoreCircle } from "@/components/score-circle"
import { mockPolicies } from "@/lib/mock-data"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { ArrowUp } from "lucide-react"

const radarData = [
  { metric: "Viabilidad", A: 85, B: 72 },
  { metric: "Impacto Social", A: 90, B: 88 },
  { metric: "Costo-Beneficio", A: 78, B: 65 },
  { metric: "Evidencia Histórica", A: 87, B: 73 },
  { metric: "Urgencia", A: 75, B: 82 },
]

export default function ComparePage() {
  const [policyA, setPolicyA] = useState("")
  const [policyB, setPolicyB] = useState("")
  const [showComparison, setShowComparison] = useState(false)

  const selectedPolicyA = mockPolicies.find((p) => p.id === policyA)
  const selectedPolicyB = mockPolicies.find((p) => p.id === policyB)

  const handleCompare = () => {
    if (policyA && policyB) {
      setShowComparison(true)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Comparar Políticas</h1>
        <p className="text-gray-600">Analiza y compara dos políticas lado a lado</p>
      </div>

      {/* Selectors */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Selecciona Política 1</label>
            <Select value={policyA} onValueChange={setPolicyA}>
              <SelectTrigger>
                <SelectValue placeholder="Elegir política..." />
              </SelectTrigger>
              <SelectContent>
                {mockPolicies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id}>
                    {policy.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Selecciona Política 2</label>
            <Select value={policyB} onValueChange={setPolicyB}>
              <SelectTrigger>
                <SelectValue placeholder="Elegir política..." />
              </SelectTrigger>
              <SelectContent>
                {mockPolicies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id}>
                    {policy.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCompare} disabled={!policyA || !policyB}>
            Comparar
          </Button>
        </div>
      </Card>

      {/* Comparison Results */}
      {showComparison && selectedPolicyA && selectedPolicyB && (
        <div className="space-y-6">
          {/* Policy Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Policy A */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge className="mb-2">Política A</Badge>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPolicyA.title}</h3>
                </div>
                <ScoreCircle score={selectedPolicyA.score} size="md" />
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedPolicyA.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoría:</span>
                  <span className="font-medium">{selectedPolicyA.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Costos:</span>
                  <span className="font-medium">{selectedPolicyA.costs}</span>
                </div>
              </div>
            </Card>

            {/* Policy B */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge className="mb-2">Política B</Badge>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPolicyB.title}</h3>
                </div>
                <ScoreCircle score={selectedPolicyB.score} size="md" />
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedPolicyB.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoría:</span>
                  <span className="font-medium">{selectedPolicyB.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Costos:</span>
                  <span className="font-medium">{selectedPolicyB.costs}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Radar Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis Comparativo</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Política A" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Radar name="Política B" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Comparison Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Diferencias Clave</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Métrica</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Política A</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Política B</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-900">Score</td>
                    <td className="py-3 px-4 text-center text-sm font-medium">{selectedPolicyA.score}</td>
                    <td className="py-3 px-4 text-center text-sm font-medium">{selectedPolicyB.score}</td>
                    <td className="py-3 px-4 text-center">
                      {selectedPolicyA.score > selectedPolicyB.score ? (
                        <span className="flex items-center justify-center gap-1 text-green-600">
                          <ArrowUp className="w-4 h-4" />A mejor
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-green-600">
                          <ArrowUp className="w-4 h-4" />B mejor
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-900">Alertas</td>
                    <td className="py-3 px-4 text-center text-sm font-medium">{selectedPolicyA.alerts}</td>
                    <td className="py-3 px-4 text-center text-sm font-medium">{selectedPolicyB.alerts}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      {Math.abs(selectedPolicyA.alerts - selectedPolicyB.alerts)} diferencia
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recomendación del Sistema</h3>
            <p className="text-gray-700 mb-4">
              Basado en el análisis comparativo, la{" "}
              <strong>Política {selectedPolicyA.score > selectedPolicyB.score ? "A" : "B"}</strong> presenta mejores
              indicadores generales con un score de {Math.max(selectedPolicyA.score, selectedPolicyB.score)}/10 y menor
              cantidad de alertas críticas.
            </p>
            <Badge className="bg-blue-600 text-white">
              POLÍTICA {selectedPolicyA.score > selectedPolicyB.score ? "A" : "B"} RECOMENDADA
            </Badge>
          </Card>
        </div>
      )}
    </div>
  )
}
