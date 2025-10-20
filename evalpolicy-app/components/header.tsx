"use client"

import { Search, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  breadcrumb?: string[]
}

export function Header({ breadcrumb = ["Dashboard"] }: HeaderProps) {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full flex items-center justify-between px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              <span className={index === breadcrumb.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"}>
                {item}
              </span>
            </span>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input type="search" placeholder="Buscar..." className="pl-10 w-64" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              12
            </Badge>
          </button>

          {/* User Avatar */}
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
