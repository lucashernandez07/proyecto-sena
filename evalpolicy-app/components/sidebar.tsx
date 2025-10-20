"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Plus, FileText, GitCompare, Lightbulb, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: Plus, label: "Nueva Evaluación", href: "/nueva-evaluacion" },
  { icon: FileText, label: "Políticas", href: "/politicas" },
  { icon: GitCompare, label: "Comparar", href: "/comparar" },
  { icon: Lightbulb, label: "Recomendaciones", href: "/recomendaciones" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          {!collapsed && <h1 className="text-xl font-bold text-blue-600">EvalPolicy</h1>}
          {collapsed && <span className="text-xl font-bold text-blue-600">EP</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center mt-2 py-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
