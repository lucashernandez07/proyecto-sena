"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  FileText,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  CheckCircle,
  Database,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScoreCircle } from "@/components/score-circle"
import { mockPolicies, mockAlerts, categoryColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function PolicyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("resumen")

  const policy = mockPolicies.find((p) => p.id === params.id)

  if (!policy) {
    return <div>Política no encontrada</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{policy.title}</h1>
            <div className="flex items-center gap-3">
              <Badge className={cn(categoryColors[policy.category])}>{policy.category}</Badge>
              <Badge variant="outline">{policy.date}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ScoreCircle score={policy.score} size="lg" />
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="comparacion">Comparación</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Executive Summary */}
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Resumen Ejecutivo</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{policy.summary}</p>
              </Card>

              {/* Benefits */}
              <Card className="p-6 border-l-4 border-l-green-500 bg-green-50">
                <div className="flex items-start gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Beneficios Identificados</h2>
                </div>
                <ul className="space-y-2">
                  {policy.benefitsList?.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Risks */}
              <Card className="p-6 border-l-4 border-l-red-500 bg-red-50">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Riesgos Detectados</h2>
                </div>
                <ul className="space-y-2">
                  {policy.risksList?.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Cost Analysis */}
              <Card className="p-6 border-l-4 border-l-blue-500 bg-blue-50">
                <div className="flex items-start gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Análisis de Costos</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Inversión inicial:</span>
                    <span className="font-semibold text-gray-900">{policy.costBreakdown?.initial}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Costo operativo anual:</span>
                    <span className="font-semibold text-gray-900">{policy.costBreakdown?.annual}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                    <span className="text-gray-900 font-medium">Costo total estimado:</span>
                    <span className="font-bold text-gray-900">{policy.costBreakdown?.total}</span>
                  </div>
                </div>
              </Card>

              {/* Conclusion */}
              <Card className="p-6 bg-gray-50">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-semibold text-gray-900">Conclusión y Recomendación</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{policy.conclusion}</p>
                <Badge
                  className={
                    policy.recommendation === "APROBAR"
                      ? "bg-green-100 text-green-800"
                      : policy.recommendation === "REVISAR"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {policy.recommendation}
                </Badge>
              </Card>

              {/* MCP Validation */}
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Validación con MCP</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Confidence Score</p>
                    <div className="relative w-20 h-20 mx-auto">
                      <Progress value={policy.mcpValidation?.confidence} className="h-20" />
                      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                        {policy.mcpValidation?.confidence}%
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Casos similares</p>
                    <p className="text-4xl font-bold text-blue-600">{policy.mcpValidation?.similarCases}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Evidencia encontrada</p>
                    <Badge
                      className={
                        policy.mcpValidation?.evidenceFound ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }
                    >
                      {policy.mcpValidation?.evidenceFound ? "Sí" : "No"}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h3>
                <div className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <AlertTriangle
                        className={cn(
                          "w-5 h-5 flex-shrink-0",
                          alert.severity === "CRÍTICA"
                            ? "text-red-600"
                            : alert.severity === "ALTA"
                              ? "text-orange-600"
                              : "text-yellow-600",
                        )}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                        <Badge
                          className={cn(
                            "mt-2",
                            alert.severity === "CRÍTICA"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "ALTA"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800",
                          )}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Metadata */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Fecha de análisis</p>
                    <p className="font-medium text-gray-900">{policy.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tiempo de procesamiento</p>
                    <p className="font-medium text-gray-900">23 segundos</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Versión del modelo</p>
                    <p className="font-medium text-gray-900">v2.1.0</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ID de la evaluación</p>
                    <p className="font-mono text-xs text-gray-900">{policy.id}-2025-10</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detalles">
          <Card className="p-6">
            <p className="text-gray-600">Contenido de detalles...</p>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card className="p-6">
            <p className="text-gray-600">Contenido de historial...</p>
          </Card>
        </TabsContent>

        <TabsContent value="comparacion">
          <Card className="p-6">
            <p className="text-gray-600">Contenido de comparación...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
