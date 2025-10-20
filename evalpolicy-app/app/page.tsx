"use client"

import { useState } from "react"
import { FileText, TrendingUp, AlertTriangle, Bell } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { PolicyCard } from "@/components/policy-card"
import { mockPolicies } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "Salud", value: 12 },
  { name: "Educación", value: 15 },
  { name: "Transporte", value: 8 },
  { name: "Economía", value: 7 },
  { name: "Ambiente", value: 5 },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Todas")
  const [sortBy, setSortBy] = useState("recent")

  const filteredPolicies = mockPolicies
    .filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "Todas" || policy.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "highest") return b.score - a.score
      if (sortBy === "lowest") return a.score - b.score
      return 0
    })

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Políticas Analizadas</p>
                <p className="text-3xl font-bold text-gray-900">47</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Score Promedio</p>
                <p className="text-3xl font-bold text-gray-900">7.2/10</p>
                <Progress value={72} className="mt-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En Riesgo Alto</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <Badge className="mt-1 bg-red-100 text-red-800">Requiere atención</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alertas Activas</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <a href="#" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                  Ver todas
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Análisis por Categoría (últimos 30 días)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar políticas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>
            <SelectItem value="Salud">Salud</SelectItem>
            <SelectItem value="Educación">Educación</SelectItem>
            <SelectItem value="Transporte">Transporte</SelectItem>
            <SelectItem value="Economía">Economía</SelectItem>
            <SelectItem value="Ambiente">Ambiente</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Más recientes</SelectItem>
            <SelectItem value="highest">Mayor score</SelectItem>
            <SelectItem value="lowest">Menor score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Policy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  )
}
