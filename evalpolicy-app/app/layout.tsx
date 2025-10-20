import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "EvalPolicy - Análisis de Políticas Públicas",
  description: "Plataforma de análisis y evaluación de políticas públicas con IA",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 ml-60">
            <Header />
            <main className="p-8">{children}</main>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
