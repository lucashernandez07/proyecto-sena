import type { Policy, Alert, Recommendation } from "@/types/policy"

export const mockPolicies: Policy[] = [
  {
    id: "1",
    title: "Subsidio de Transporte Juvenil Medellín",
    description:
      "Programa de subsidio del 50% en transporte público para jóvenes entre 14-28 años en el área metropolitana de Medellín.",
    category: "Transporte",
    score: 8.7,
    benefits: "Mejora acceso a educación y empleo para 150,000 jóvenes",
    risks: "Posible saturación del sistema de transporte en horas pico",
    costs: "COP 45,000M anuales",
    date: "2025-10-12",
    alerts: 0,
    summary:
      "Política altamente viable que promueve la movilidad juvenil y el acceso a oportunidades educativas y laborales en el área metropolitana.",
    benefitsList: [
      "Incremento del 35% en asistencia escolar",
      "Reducción de 20% en tiempo de desplazamiento",
      "Mejora en acceso a oportunidades laborales",
      "Impacto positivo en economía familiar",
    ],
    risksList: [
      "Saturación en horas pico (7-9am, 5-7pm)",
      "Posible fraude en validación de edad",
      "Dependencia presupuestaria municipal",
    ],
    costBreakdown: {
      initial: "COP 8,500M",
      annual: "COP 45,000M",
      total: "COP 233,500M (5 años)",
    },
    conclusion:
      "La política presenta una excelente relación costo-beneficio y cuenta con evidencia histórica de éxito en ciudades similares.",
    recommendation: "APROBAR",
    mcpValidation: {
      confidence: 87,
      similarCases: 12,
      evidenceFound: true,
    },
  },
  {
    id: "2",
    title: "Telemedicina Rural Cauca",
    description:
      "Implementación de plataforma de telemedicina para comunidades rurales del departamento del Cauca con acceso limitado a servicios de salud.",
    category: "Salud",
    score: 9.1,
    benefits: "Cobertura médica para 80,000 personas en zonas rurales",
    risks: "Limitaciones de conectividad en algunas zonas",
    costs: "COP 12,000M implementación",
    date: "2025-10-10",
    alerts: 1,
    summary: "Iniciativa innovadora que aprovecha tecnología para cerrar brechas de acceso a salud en zonas rurales.",
    benefitsList: [
      "Atención médica a 80,000 personas",
      "Reducción de 60% en tiempos de espera",
      "Disminución de costos de desplazamiento",
      "Detección temprana de enfermedades",
    ],
    risksList: [
      "Conectividad limitada en 15% de zonas",
      "Resistencia cultural al cambio",
      "Necesidad de capacitación continua",
    ],
    costBreakdown: {
      initial: "COP 12,000M",
      annual: "COP 3,500M",
      total: "COP 26,000M (5 años)",
    },
    conclusion: "Política altamente recomendada con impacto social significativo y viabilidad técnica comprobada.",
    recommendation: "APROBAR",
    mcpValidation: {
      confidence: 92,
      similarCases: 8,
      evidenceFound: true,
    },
  },
  {
    id: "3",
    title: "Incentivos Fiscales Energía Solar Empresarial",
    description:
      "Reducción del 40% en impuestos para empresas que implementen sistemas de energía solar en sus instalaciones.",
    category: "Economía",
    score: 6.8,
    benefits: "Reducción de 25% en emisiones CO2 sector empresarial",
    risks: "Alto costo fiscal inicial, beneficia principalmente grandes empresas",
    costs: "COP 180,000M en exenciones fiscales",
    date: "2025-10-08",
    alerts: 2,
    summary:
      "Política con potencial ambiental positivo pero requiere ajustes para garantizar equidad y sostenibilidad fiscal.",
    benefitsList: [
      "Reducción de 25% en emisiones CO2",
      "Ahorro energético del 30% para empresas",
      "Creación de 5,000 empleos verdes",
      "Impulso a industria de energías renovables",
    ],
    risksList: [
      "Costo fiscal elevado (COP 180,000M)",
      "Beneficia desproporcionadamente a grandes empresas",
      "Retorno de inversión a largo plazo (8-10 años)",
      "Posible uso indebido de incentivos",
    ],
    costBreakdown: {
      initial: "COP 25,000M",
      annual: "COP 180,000M",
      total: "COP 925,000M (5 años)",
    },
    conclusion:
      "Se recomienda revisar los criterios de elegibilidad para incluir PYMES y establecer límites máximos de beneficio.",
    recommendation: "REVISAR",
    mcpValidation: {
      confidence: 73,
      similarCases: 15,
      evidenceFound: true,
    },
  },
  {
    id: "4",
    title: "Programa Nacional de Alfabetización Digital Adultos",
    description:
      "Capacitación gratuita en competencias digitales básicas para adultos mayores de 50 años sin experiencia tecnológica.",
    category: "Educación",
    score: 7.5,
    benefits: "Inclusión digital de 200,000 adultos mayores",
    risks: "Requiere infraestructura tecnológica en zonas rurales",
    costs: "COP 35,000M programa piloto",
    date: "2025-10-05",
    alerts: 1,
    summary: "Iniciativa necesaria para reducir brecha digital generacional con buena viabilidad de implementación.",
    benefitsList: [
      "Capacitación de 200,000 adultos mayores",
      "Mejora en acceso a servicios digitales",
      "Reducción de exclusión social",
      "Fortalecimiento de vínculos familiares",
    ],
    risksList: [
      "Necesidad de infraestructura en zonas rurales",
      "Ritmo de aprendizaje variable",
      "Requiere instructores especializados",
    ],
    costBreakdown: {
      initial: "COP 35,000M",
      annual: "COP 18,000M",
      total: "COP 107,000M (5 años)",
    },
    conclusion:
      "Política viable con impacto social positivo. Se recomienda implementación gradual comenzando por zonas urbanas.",
    recommendation: "APROBAR",
    mcpValidation: {
      confidence: 81,
      similarCases: 10,
      evidenceFound: true,
    },
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "Presupuesto",
    description: "Costo fiscal excede proyección inicial en 15%",
    severity: "ALTA",
  },
  {
    id: "2",
    type: "Viabilidad",
    description: "Infraestructura tecnológica insuficiente",
    severity: "MEDIA",
  },
]

export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "TENDENCIA",
    title: "Incremento en Políticas de Salud Digital",
    description:
      "Se ha detectado un aumento del 45% en propuestas relacionadas con telemedicina y salud digital en los últimos 3 meses. Esta tendencia refleja la necesidad de modernizar el sistema de salud y mejorar el acceso en zonas rurales.",
    action:
      "Considerar crear un marco regulatorio específico para telemedicina que facilite la implementación de futuras políticas en este sector.",
  },
  {
    id: "2",
    type: "ALERTA",
    title: "Déficit en Políticas de Transporte Sostenible",
    description:
      "Solo el 12% de las políticas analizadas abordan transporte sostenible, mientras que el 68% de ciudades principales reportan problemas críticos de movilidad y contaminación. Existe una brecha significativa entre necesidad y propuestas.",
    action:
      "Priorizar el desarrollo de políticas de movilidad sostenible en el próximo trimestre, especialmente para ciudades intermedias.",
  },
  {
    id: "3",
    type: "OPORTUNIDAD",
    title: "Sinergia entre Educación y Tecnología",
    description:
      "El análisis cruzado revela que políticas que combinan educación con componentes tecnológicos tienen un 35% más de probabilidad de éxito y un score promedio de 8.2/10. Existe oportunidad de replicar este modelo.",
    action:
      "Diseñar políticas educativas con componente tecnológico integrado, aprovechando infraestructura digital existente.",
  },
]

export const categoryColors = {
  Salud: "bg-blue-500",
  Educación: "bg-green-500",
  Transporte: "bg-yellow-500",
  Economía: "bg-orange-500",
  Ambiente: "bg-red-500",
}

export const getScoreColor = (score: number): string => {
  if (score >= 8) return "text-green-500 border-green-500"
  if (score >= 6) return "text-yellow-500 border-yellow-500"
  if (score >= 4) return "text-orange-500 border-orange-500"
  return "text-red-500 border-red-500"
}

export const getStatusBadge = (score: number): { text: string; color: string } => {
  if (score >= 8) return { text: "ALTA VIABILIDAD", color: "bg-green-100 text-green-800" }
  if (score >= 6) return { text: "VIABLE CON AJUSTES", color: "bg-yellow-100 text-yellow-800" }
  if (score >= 4) return { text: "REQUIERE REVISIÓN", color: "bg-orange-100 text-orange-800" }
  return { text: "NO RECOMENDADA", color: "bg-red-100 text-red-800" }
}
