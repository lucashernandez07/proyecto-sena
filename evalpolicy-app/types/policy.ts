export interface Policy {
  id: string
  title: string
  description: string
  category: "Salud" | "Educación" | "Transporte" | "Economía" | "Ambiente"
  score: number
  benefits: string
  risks: string
  costs: string
  date: string
  alerts: number
  summary?: string
  benefitsList?: string[]
  risksList?: string[]
  costBreakdown?: {
    initial: string
    annual: string
    total: string
  }
  conclusion?: string
  recommendation?: "APROBAR" | "REVISAR" | "RECHAZAR"
  mcpValidation?: {
    confidence: number
    similarCases: number
    evidenceFound: boolean
  }
}

export interface Alert {
  id: string
  type: string
  description: string
  severity: "CRÍTICA" | "ALTA" | "MEDIA"
}

export interface Recommendation {
  id: string
  type: "TENDENCIA" | "ALERTA" | "OPORTUNIDAD"
  title: string
  description: string
  action: string
}
