# 🏗️ Arquitectura de EvalPolicy

## Tabla de Contenidos
- [Visión General](#visión-general)
- [Arquitectura de Sistema](#arquitectura-de-sistema)
- [Arquitectura Agent-to-Agent](#arquitectura-agent-to-agent)
- [Flujo de Datos](#flujo-de-datos)
- [Decisiones de Diseño](#decisiones-de-diseño)
- [Seguridad](#seguridad)
- [Escalabilidad](#escalabilidad)

---

## 🎯 Visión General

EvalPolicy sigue una arquitectura de **3 capas** con comunicación **Agent-to-Agent**:
```
Presentación (Frontend)
    ↕️
Lógica de Negocio (Backend + A2A)
    ↕️
Datos (Supabase + Groq API)
```

### Principios de Diseño

1. **Separation of Concerns**: Frontend/Backend desacoplados
2. **API-First**: Todo expuesto via REST API
3. **Agent Autonomy**: Agentes con responsabilidades claras
4. **Data Persistence**: Estado en PostgreSQL
5. **Stateless Backend**: No sesiones en servidor

---

## 🔧 Arquitectura de Sistema

### Diagrama de Componentes
```
┌──────────────────────────────────────────────────────────┐
│                     USER INTERFACE                        │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐       │
│  │ Dashboard  │  │  Analysis  │  │ Comparison  │       │
│  │ Component  │  │ Component  │  │  Component  │       │
│  └────────────┘  └────────────┘  └─────────────┘       │
│           React + TypeScript + Tailwind                  │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS/REST
┌────────────────────▼─────────────────────────────────────┐
│                    API GATEWAY (FastAPI)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Endpoints Layer                                  │   │
│  │  /analyze  /simulate  /context  /report          │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                     │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │  Business Logic Layer                             │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │   Agent Orchestrator (A2A Coordinator)  │    │   │
│  │  │   ┌──────────────┐  ┌──────────────┐   │    │   │
│  │  │   │  Analyzer    │  │  Validator   │   │    │   │
│  │  │   │  Agent       │◄─┤  Agent       │   │    │   │
│  │  │   └──────────────┘  └──────────────┘   │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                     │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │  Services Layer                                   │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────┐  │   │
│  │  │ Groq   │ │  MCP   │ │ Parser │ │Supabase │  │   │
│  │  │Service │ │Service │ │Service │ │ Service │  │   │
│  │  └────────┘ └────────┘ └────────┘ └─────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬─────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼────────┐     ┌────────▼────────┐
│  Supabase       │     │  Groq Cloud     │
│  PostgreSQL     │     │  Llama 3.1 70B  │
│  + Storage      │     │  API            │
└─────────────────┘     └─────────────────┘
```

---

## 🤖 Arquitectura Agent-to-Agent (A2A)

### Concepto

Dos agentes autónomos que colaboran para mejorar la calidad del análisis:

#### **Agent 1: Analyzer**
- **Responsabilidad**: Analizar el texto de la política con LLM
- **Input**: Texto de política (raw)
- **Output**: Análisis estructurado (beneficios, riesgos, costos, conclusión)
- **Tecnología**: Groq API (Llama 3.1 70B)

#### **Agent 2: Validator**
- **Responsabilidad**: Validar análisis con datos históricos
- **Input**: Análisis del Agent 1 + contexto de la política
- **Output**: Análisis validado + confidence score + evidencia
- **Tecnología**: MCP (Model Context Protocol) + Vector search

### Flujo de Comunicación
```python
# Pseudocódigo del flujo A2A

async def analyze_policy(policy_text: str) -> dict:
    # 1. Analyzer Agent procesa
    analysis = await analyzer_agent.analyze(policy_text)
    
    # 2. Validator Agent valida
    validation = await validator_agent.validate(
        analysis=analysis,
        context=policy_text
    )
    
    # 3. Si confidence < threshold, re-analizar
    if validation.confidence_score < 0.7:
        refined_analysis = await analyzer_agent.refine(
            original=analysis,
            feedback=validation.issues
        )
        return refined_analysis
    
    # 4. Retornar análisis validado
    return {**analysis, "validation": validation}
```

### Ventajas del A2A

✅ **Mayor precisión**: Doble validación reduce alucinaciones  
✅ **Trazabilidad**: Log de comunicación entre agentes  
✅ **Escalabilidad**: Fácil agregar más agentes (Agent 3: CostEstimator)  
✅ **Resiliencia**: Si un agente falla, el otro puede compensar  

---

## 🔄 Flujo de Datos

### 1. Análisis de Política (POST /analyze)
```
Usuario sube documento
    ↓
Frontend envía a /analyze
    ↓
Parser Service extrae texto
    ↓
Analyzer Agent (LLM) analiza
    ↓
Validator Agent (MCP) valida
    ↓
Supabase Service guarda resultado
    ↓
Frontend recibe respuesta JSON
    ↓
Dashboard se actualiza
```

### 2. Simulación de Escenarios (POST /simulate)
```
Usuario modifica parámetros
    ↓
Frontend envía a /simulate
    ↓
Recuperar política original (Supabase)
    ↓
Inyectar nuevos parámetros en texto
    ↓
Re-analizar con Analyzer Agent
    ↓
Comparar con versión original
    ↓
Retornar diferencias
```

---

## 🧠 Decisiones de Diseño

### ¿Por qué FastAPI?

✅ **Performance**: Async/await nativo (10x más rápido que Flask)  
✅ **Documentación automática**: Swagger UI integrado  
✅ **Type safety**: Pydantic para validación  
✅ **WebSockets**: Para features en tiempo real  

### ¿Por qué Groq (no OpenAI)?

✅ **Velocidad**: 10x más rápido que GPT-4  
✅ **Costo**: 80% más económico  
✅ **Open source**: Llama 3.1 es código abierto  
✅ **Datos sensibles**: Políticas públicas no van a OpenAI  

### ¿Por qué Supabase (no MongoDB)?

✅ **SQL**: Queries complejas más eficientes  
✅ **JSONB**: Flexibilidad de NoSQL con poder de SQL  
✅ **Real-time**: Subscripciones para updates live  
✅ **Auth integrado**: Sistema de usuarios listo  

### ¿Por qué MCP?

✅ **Contexto histórico**: Acceso a políticas pasadas  
✅ **Estandarización**: Anthropic MCP protocol  
✅ **Vector search**: Búsqueda semántica eficiente  
✅ **Extensibilidad**: Fácil agregar más fuentes  

---

## 🔒 Seguridad

### Protecciones Implementadas

1. **API Keys en .env**: Nunca en código
2. **CORS restrictivo**: Solo dominios whitelistados
3. **Rate limiting**: 100 requests/hora por IP
4. **Input sanitization**: Prevención de SQL injection
5. **File validation**: Solo PDF/DOCX < 10MB
6. **HTTPS only**: Comunicación encriptada

### Ejemplo de Rate Limiting
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/analyze")
@limiter.limit("10/minute")
async def analyze_policy(...):
    ...
```

---

## 📈 Escalabilidad

### Estrategias de Escalado

#### Horizontal Scaling
- **Frontend**: CDN (Vercel Edge)
- **Backend**: Multiple instances (Render)
- **Database**: Read replicas (Supabase)

#### Caching
```python
from functools import lru_cache

@lru_cache(maxsize=100)
async def get_mcp_context(tema: str):
    # Cache MCP queries por 1 hora
    ...
```

#### Queue System (futuro)