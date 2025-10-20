# 🏛️ EvalPolicy

> Plataforma de análisis inteligente de políticas públicas para Colombia usando IA

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://evalpolicy.vercel.app)
[![API](https://img.shields.io/badge/API-Docs-blue)](https://evalpolicy-api.render.com/docs)

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Arquitectura](#arquitectura)
- [Demo](#demo)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Documentación](#documentación)
- [Roadmap](#roadmap)
- [Equipo](#equipo)

---

## 🎯 Descripción

**EvalPolicy** es una aplicación web que utiliza inteligencia artificial para analizar y evaluar políticas públicas, programas sociales y proyectos de ley en Colombia. 

La plataforma combina:
- 🤖 **LLM (Groq/Llama 3.1)** para análisis de texto
- 📚 **MCP (Model Context Protocol)** para consulta de datos históricos
- 🔄 **Arquitectura Agent-to-Agent (A2A)** para validación cruzada

### Problema que Resuelve

En Colombia se proponen cientos de políticas públicas cada año, pero:
- ❌ Pocas tienen análisis riguroso previo
- ❌ No se consultan antecedentes históricos
- ❌ Falta evaluación objetiva de impacto

**EvalPolicy automatiza este proceso en segundos.**

---

## ✨ Características Principales

### 🔍 Análisis Inteligente
- Extracción automática de beneficios, riesgos y costos
- Evaluación con scoring automático (0-10)
- Detección de alertas y banderas rojas

### 🤝 Agent-to-Agent (A2A)
- **Agent 1 (Analyzer)**: Analiza la política con LLM
- **Agent 2 (Validator)**: Valida con datos históricos del MCP
- Comunicación bidireccional para mayor precisión

### 📊 Dashboard Interactivo
- Métricas en tiempo real
- Visualizaciones por categoría
- Línea de tiempo de análisis
- Panel de recomendaciones IA

### 🔬 Simulación de Escenarios
- Modifica parámetros (presupuesto, población)
- Recalcula impactos en tiempo real
- Comparación side-by-side

### 📤 Exportación y Compartir
- Exportar a PDF con gráficos
- Compartir en redes sociales
- API pública para integraciones

---

## 🏗️ Arquitectura
```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)              │
│  - Dashboard con métricas                               │
│  - Análisis de políticas                                │
│  - Comparativas y simulaciones                          │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP REST
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ORQUESTADOR A2A                                  │ │
│  │  ┌─────────────┐      ┌─────────────┐           │ │
│  │  │ Analyzer    │◄────►│ Validator   │           │ │
│  │  │ Agent       │      │ Agent       │           │ │
│  │  │ (Groq LLM)  │      │ (MCP Query) │           │ │
│  │  └─────────────┘      └─────────────┘           │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────┬────────────────────┬───────────────────┘
                 │                    │
        ┌────────▼────────┐  ┌────────▼────────┐
        │   Supabase      │  │   Groq API      │
        │   PostgreSQL    │  │   Llama 3.1     │
        └─────────────────┘  └─────────────────┘
```

[Ver diagrama completo](docs/ARCHITECTURE.md)

---

## Demo

### Screenshots

<table>
  <tr>
    <td><img src="docs/assets/screenshots/dashboard.png" alt="Dashboard"/></td>
    <td><img src="docs/assets/screenshots/analysis.png" alt="Análisis"/></td>
  </tr>
  <tr>
    <td align="center">Dashboard Principal</td>
    <td align="center">Análisis de Política</td>
  </tr>
</table>

### Live Demo
🔗 **Frontend**: [evalpolicy.vercel.app](https://evalpolicy.vercel.app)  
🔗 **API Docs**: [evalpolicy-api.render.com/docs](https://evalpolicy-api.render.com/docs)

---

## 🛠️ Tecnologías

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **shadcn/ui** (componentes)
- **Recharts** (gráficos)
- **Lucide React** (iconos)

### Backend
- **FastAPI** (Python 3.11+)
- **Groq SDK** (LLM integration)
- **Supabase** (PostgreSQL database)
- **Pydantic** (validación de datos)
- **PyPDF2** + **python-docx** (parseo de documentos)

### Infraestructura
- **Vercel** (frontend hosting)
- **Render** (backend hosting)
- **Supabase** (database + storage)
- **GitHub Actions** (CI/CD)

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- Python 3.11+
- Cuenta de Groq (API key)
- Cuenta de Supabase

### Backend
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/evalpolicy.git
cd evalpolicy/backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor
uvicorn main:app --reload
```

### Frontend
```bash
cd ../frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local

# Iniciar desarrollo
npm run dev
```

### Base de Datos
```sql
-- Ejecutar en Supabase SQL Editor
CREATE TABLE evaluaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  categoria TEXT,
  score DECIMAL(3,1),
  resultado JSONB NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_created_at ON evaluaciones(created_at DESC);
CREATE INDEX idx_categoria ON evaluaciones(categoria);
```

---

## 📖 Uso

### 1. Analizar una Política
```bash
# Via API
curl -X POST "https://api.evalpolicy.app/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Subsidio de Transporte Juvenil",
    "texto": "Propuesta para subsidiar el 50% del transporte público..."
  }'
```

### 2. Simular Escenarios
```bash
curl -X POST "https://api.evalpolicy.app/simulate" \
  -H "Content-Type: application/json" \
  -d '{
    "policy_id": "abc-123",
    "parametros": {
      "subsidio_porcentaje": 75,
      "poblacion_objetivo": 50000
    }
  }'
```

### 3. Comparar Políticas
```bash
curl "https://api.evalpolicy.app/policies/abc-123/compare?with=def-456"
```

[Ver documentación completa de API](docs/API_DOCUMENTATION.md)

---

## 📚 Documentación

- 📘 [Guía de Arquitectura](docs/ARCHITECTURE.md) - Diseño técnico detallado
- 📗 [Documentación de API](docs/API_DOCUMENTATION.md) - Endpoints y ejemplos
- 📙 [Guía de Usuario](docs/USER_GUIDE.md) - Cómo usar la plataforma
- 📕 [Guía de Despliegue](docs/DEPLOYMENT.md) - Deploy en producción

---

## 🗺️ Roadmap

### Fase 1 - MVP ✅ (Completada)
- [x] Análisis básico con LLM
- [x] Dashboard interactivo
- [x] Integración con Supabase
- [x] Arquitectura A2A

### Fase 2 - Mejoras (En progreso)
- [ ] Análisis multiidioma (inglés/español)
- [ ] Integración con datos de DANE
- [ ] API pública con rate limiting
- [ ] Mobile app (React Native)

### Fase 3 - Escala (Q1 2026)
- [ ] Análisis en batch
- [ ] Sistema de usuarios y permisos
- [ ] Integración con MinHacienda
- [ ] Modelo fine-tuned para Colombia

### Fase 4 - Expansión (Q2 2026)
- [ ] Soporte para otros países LATAM
- [ ] WhatsApp bot
- [ ] Chrome extension
- [ ] API marketplace

---

## 👥 Equipo

### Hackathon Team

- **[Tu Nombre]** - Full Stack Developer
  - 🔗 [GitHub](https://github.com/tu-usuario)
  - 🔗 [LinkedIn](https://linkedin.com/in/tu-perfil)

### Colaboradores

¿Quieres contribuir? Lee [CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Anthropic** por Claude y el MCP protocol
- **Groq** por el acceso a Llama 3.1
- **Vercel** por el hosting del frontend
- **Comunidad open source** 

---

## 📞 Contacto

- 📧 Email: evalpolicy@tudominio.com
- 🐦 Twitter: [@evalpolicy](https://twitter.com/evalpolicy)
- 💬 Discord: [Unirse al servidor](https://discord.gg/evalpolicy)

---

<div align="center">

**Hecho con ❤️ en Colombia 🇨🇴**

[⬆ Volver arriba](#-evalpolicy)

</div>