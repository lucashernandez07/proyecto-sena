"use client"

import { useState } from "react"
import { CloudUpload, Zap, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function NuevaEvaluacionPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [simulationEnabled, setSimulationEnabled] = useState(false)
  const [population, setPopulation] = useState([500000])
  const [budget, setBudget] = useState([5000])
  const [category, setCategory] = useState("")
  const [mcpEnabled, setMcpEnabled] = useState(true)
  const [comparativeEnabled, setComparativeEnabled] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    // Simulate analysis steps
    const steps = [
      "Procesando documento...",
      "Analizando con IA...",
      "Validando con datos históricos...",
      "Generando resultados...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // Navigate to policy detail
    router.push("/politicas/1")
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - 60% */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Título de la Política <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Ej: Subsidio de Transporte Juvenil Medellín"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">
                  Descripción Completa <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe la política o pega el texto completo aquí..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 min-h-[300px]"
                />
                <p className="text-xs text-gray-500 mt-1">{description.length} / 10000</p>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-700 font-medium">Arrastra archivos PDF/DOCX aquí</p>
                <p className="text-xs text-gray-500 mt-1">o haz clic para seleccionar (máx 10MB)</p>
              </div>
            </div>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card className="p-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900">
                  Analizando política... Esto puede tomar 15-30 segundos
                </p>
                <Progress value={(analysisStep + 1) * 25} />
                <div className="space-y-2">
                  {[
                    "Procesando documento...",
                    "Analizando con IA...",
                    "Validando con datos históricos...",
                    "Generando resultados...",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {index < analysisStep ? (
                        <span className="text-green-600">✓</span>
                      ) : index === analysisStep ? (
                        <span className="animate-spin">⟳</span>
                      ) : (
                        <span className="text-gray-400">○</span>
                      )}
                      <span className={index <= analysisStep ? "text-gray-900" : "text-gray-400"}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAnalyze}
              disabled={!title || !description || isAnalyzing}
              className="flex-1"
              size="lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Analizar Política
            </Button>
            <Button variant="outline" size="lg" className="flex-1 bg-transparent">
              Guardar como Borrador
            </Button>
          </div>
        </div>

        {/* Right Column - 40% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulation Parameters */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parámetros de Simulación</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="simulation">Activar simulación</Label>
                <Switch id="simulation" checked={simulationEnabled} onCheckedChange={setSimulationEnabled} />
              </div>

              {simulationEnabled && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label>Población objetivo</Label>
                    <Slider
                      value={population}
                      onValueChange={setPopulation}
                      max={1000000}
                      step={10000}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-600 mt-1">{population[0].toLocaleString()} personas</p>
                  </div>

                  <div>
                    <Label>Presupuesto (COP millones)</Label>
                    <Slider value={budget} onValueChange={setBudget} max={10000} step={100} className="mt-2" />
                    <p className="text-sm text-gray-600 mt-1">COP {budget[0].toLocaleString()}M</p>
                  </div>

                  <div>
                    <Label>Categoría</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salud">Salud</SelectItem>
                        <SelectItem value="Educación">Educación</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                        <SelectItem value="Economía">Economía</SelectItem>
                        <SelectItem value="Ambiente">Ambiente</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Historical Context */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contexto Histórico</h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="mcp">Consultar MCP para casos similares</Label>
                  <p className="text-xs text-gray-500 mt-1">Busca políticas históricas relacionadas</p>
                </div>
                <Switch id="mcp" checked={mcpEnabled} onCheckedChange={setMcpEnabled} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="comparative">Habilitar análisis comparativo</Label>
                  <p className="text-xs text-gray-500 mt-1">Compara con políticas exitosas pasadas</p>
                </div>
                <Switch id="comparative" checked={comparativeEnabled} onCheckedChange={setComparativeEnabled} />
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa de Análisis</h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="w-16 h-16 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">Los resultados aparecerán aquí...</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
