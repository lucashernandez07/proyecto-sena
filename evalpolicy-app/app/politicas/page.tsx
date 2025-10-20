"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PolicyCard } from "@/components/policy-card"
import { mockPolicies } from "@/lib/mock-data"

export default function PoliticasPage() {
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Políticas</h1>
        <p className="text-gray-600">Explora y gestiona todas las políticas analizadas</p>
      </div>

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
