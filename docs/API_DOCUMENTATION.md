# 📡 Documentación de API - EvalPolicy

## Base URL
```
Producción: https://api.evalpolicy.app
Desarrollo: http://localhost:8000
Documentación interactiva: https://api.evalpolicy.app/docs
```

## Autenticación

Actualmente la API es pública. En futuras versiones requerirá API Key:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.evalpolicy.app/analyze
```

---

## 📌 Endpoints

### **1. POST /analyze**

Analiza una política y retorna evaluación completa.

#### Request
```bash
POST /analyze
Content-Type: application/json

{
  "titulo": "Subsidio de Transporte Juvenil Medellín",
  "texto": "Propuesta para subsidiar el 50% del costo del transporte público para estudiantes universitarios entre 18-25 años en Medellín...",
  "categoria": "Transporte",
  "parametros": {
    "subsidio_porcentaje": 50,
    "poblacion_objetivo": 80000
  }
}
```

#### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "titulo": "Subsidio de Transporte Juvenil Medellín",
  "score": 8.5,
  "categoria": "Transporte",
  "resultado": {
    "beneficios": "Mejora el acceso a educación superior, reduce la deserción estudiantil estimada en un 15%, fomenta la movilidad social y apoya a familias de bajos ingresos.",
    "riesgos": "Costos fiscales recurrentes de aproximadamente COP 4.800 millones anuales, posible fraude en verificación de estudiantes, presión sobre el sistema de transporte en horas pico.",
    "costos": "Inversión inicial de COP 500 millones para implementación del sistema de control, costo operativo anual de COP 5.000 millones (subsidio + administración).",
    "conclusion": "Política viable con alto impacto social. Se recomienda implementación piloto de 6 meses con 20.000 beneficiarios para validar supuestos antes de escalar.",
    "validation": {
      "confidence_score": 0.82,
      "similar_cases": 3,
      "evidence_found": true,
      "historical_data": [
        {
          "ciudad": "Bogotá",
          "programa": "Subsidio al Transporte Jóvenes",
          "año": 2019,
          "resultado": "Reducción de deserción estudiantil del 12%"
        }
      ]
    }
  },
  "alertas": [
    {
      "tipo": "Alto Costo Fiscal",
      "severidad": "MEDIA",
      "descripcion": "El costo anual representa 0.8% del presupuesto de Medellín"
    }
  ],
  "metadata": {
    "analyzed_at": "2025-10-17T15:30:00Z",
    "processing_time_ms": 3200,
    "agent_communication_log": [
      {
        "timestamp": "2025-10-17T15:30:00.100Z",
        "agent": "Analyzer",
        "action": "Started analysis"
      },
      {
        "timestamp": "2025-10-17T15:30:02.800Z",
        "agent": "Analyzer",
        "action": "Completed analysis"
      },
      {
        "timestamp": "2025-10-17T15:30:02.900Z",
        "agent": "Validator",
        "action": "Started validation with MCP"
      },
      {
        "timestamp": "2025-10-17T15:30:03.200Z",
        "agent": "Validator",
        "action": "Found 3 similar historical cases"
      }
    ]
  },
  "created_at": "2025-10-17T15:30:03Z"
}
```

#### Response Codes

| Code | Descripción                          |
|------|--------------------------------------|
| 200  | Análisis completado exitosamente     |
| 400  | Request inválido (falta titulo/texto)|
| 422  | Validación falló (texto muy corto)   |
| 429  | Rate limit excedido                  |
| 500  | Error interno del servidor           |

#### Errores
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El texto de la política es muy corto (mínimo 50 caracteres)",
    "details": {
      "field": "texto",
      "actual_length": 25,
      "min_length": 50
    }
  }
}
```

---

### **2. POST /analyze (con archivo)**

Analiza documento PDF o DOCX.

#### Request
```bash
POST /analyze
Content-Type: multipart/form-data

titulo: "Reforma Tributaria 2025"
archivo: [file.pdf]
categoria: "Economía"
```

#### Límites

- **Tamaño máximo**: 10 MB
- **Formatos**: PDF, DOCX
- **Páginas máximas PDF**: 50

#### Ejemplo con cURL
```bash
curl -X POST "https://api.evalpolicy.app/analyze" \
  -F "titulo=Reforma Tributaria 2025" \
  -F "archivo=@documento.pdf" \
  -F "categoria=Economía"
```

---

### **3. POST /simulate**

Simula cambios en parámetros de una política existente.

#### Request
```json
POST /simulate

{
  "policy_id": "550e8400-e29b-41d4-a716-446655440000",
  "parametros": {
    "subsidio_porcentaje": 75,
    "poblacion_objetivo": 120000
  }
}
```

#### Response
```json
{
  "scenario_id": "660f9511-f3ac-52e5-b827-557766551111",
  "original": {
    "score": 8.5,
    "costos": "COP 5.000 millones anuales",
    "poblacion_beneficiada": 80000
  },
  "simulado": {
    "score": 7.8,
    "costos": "COP 9.000 millones anuales",
    "poblacion_beneficiada": 120000,
    "beneficios": "Ampliado a 120.000 estudiantes (+50%)",
    "riesgos": "Mayor presión fiscal. Requiere fuentes de financiación adicionales."
  },
  "comparison": {
    "score_diff": -0.7,
    "costo_diff_pct": 80,
    "beneficiarios_diff": 40000,
    "recomendacion": "El aumento al 75% reduce la viabilidad fiscal. Considerar implementación gradual comenzando con 100.000 beneficiarios."
  }
}
```

---

### **4. GET /context/{tema}**

Consulta el MCP para obtener contexto histórico.

#### Request
```bash
GET /context/subsidio-transporte-estudiantes
```

#### Response
```json
{
  "tema": "subsidio-transporte-estudiantes",
  "resultados": [
    {
      "titulo": "Subsidio Transporte Universitario Bogotá",
      "año": 2019,
      "ciudad": "Bogotá",
      "descripcion": "Programa piloto que subsidió 40% del transporte para 50.000 estudiantes",
      "resultados": {
        "beneficiarios": 48500,
        "desercion_reducida": "12%",
        "satisfaccion": "87%",
        "duracion_meses": 24
      },
      "aprendizajes": [
        "La verificación digital redujo fraude en 95%",
        "Mayor impacto en estudiantes de estratos 1-2",
        "Requiere coordinación con operadores de transporte"
      ],
      "similitud_score": 0.92
    },
    {
      "titulo": "Tarifa Diferencial TransMilenio Jóvenes",
      "año": 2021,
      "ciudad": "Bogotá",
      "similitud_score": 0.78
    }
  ],
  "total_encontrados": 2,
  "query_time_ms": 245
}
```

---

### **5. GET /report/{id}**

Recupera un análisis previo por su ID.

#### Request
```bash
GET /report/550e8400-e29b-41d4-a716-446655440000
```

#### Response

Mismo formato que `POST /analyze`.

---

### **6. GET /dashboard/stats**

Obtiene estadísticas agregadas para el dashboard.

#### Request
```bash
GET /dashboard/stats
```

#### Response
```json
{
  "total_politicas": 47,
  "score_promedio": 7.2,
  "en_riesgo": 8,
  "alertas_activas": 12,
  "por_categoria": {
    "Salud": {
      "count": 12,
      "score_avg": 7.8,
      "score_min": 5.2,
      "score_max": 9.1
    },
    "Educación": {
      "count": 15,
      "score_avg": 8.1,
      "score_min": 6.5,
      "score_max": 9.4
    },
    "Transporte": {
      "count": 8,
      "score_avg": 6.9,
      "score_min": 4.3,
      "score_max": 8.7
    },
    "Economía": {
      "count": 7,
      "score_avg": 6.2,
      "score_min": 3.8,
      "score_max": 7.9
    },
    "Ambiente": {
      "count": 5,
      "score_avg": 5.4,
      "score_min": 4.1,
      "score_max": 7.2
    }
  },
  "tendencias": {
    "ultimos_30_dias": 23,
    "crecimiento_pct": 15.8,
    "categoria_mas_analizada": "Educación",
    "score_trending_up": true
  },
  "ultimas_actualizaciones": "2025-10-17T15:30:00Z"
}
```

---

### **7. GET /policies/search**

Búsqueda avanzada de políticas con filtros.

#### Request
```bash
GET /policies/search?q=transporte&categoria=Transporte&min_score=7&limit=10&offset=0
```

#### Query Parameters

| Parámetro    | Tipo    | Descripción                    | Requerido | Default |
|--------------|---------|--------------------------------|-----------|---------|
| q            | string  | Texto de búsqueda              | No        | -       |
| categoria    | string  | Filtrar por categoría          | No        | todas   |
| min_score    | float   | Score mínimo (0-10)            | No        | 0       |
| max_score    | float   | Score máximo (0-10)            | No        | 10      |
| limit        | integer | Resultados por página (max 50) | No        | 20      |
| offset       | integer | Para paginación                | No        | 0       |

#### Response
```json
{
  "results": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "titulo": "Subsidio Transporte Juvenil",
      "descripcion": "Propuesta para subsidiar el 50%...",
      "score": 8.5,
      "categoria": "Transporte",
      "created_at": "2025-10-12T10:30:00Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0,
  "has_more": false
}
```

---

### **8. POST /policies/{id}/compare**

Compara dos políticas lado a lado.

#### Request
```bash
POST /policies/550e8400-e29b-41d4-a716-446655440000/compare

{
  "compare_with": "660f9511-f3ac-52e5-b827-557766551111"
}
```

#### Response
```json
{
  "policy1": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Subsidio Transporte Juvenil",
    "score": 8.5,
    "categoria": "Transporte",
    "costos": "COP 5.000 millones anuales"
  },
  "policy2": {
    "id": "660f9511-f3ac-52e5-b827-557766551111",
    "titulo": "Tarifa Diferencial Metro",
    "score": 7.2,
    "categoria": "Transporte",
    "costos": "COP 3.200 millones anuales"
  },
  "comparison": {
    "similitud_contenido": 0.68,
    "score_diff": 1.3,
    "costos_comparados": {
      "policy1": "COP 5.000M",
      "policy2": "COP 3.200M",
      "diferencia_pct": 56,
      "mas_economica": "policy2"
    },
    "beneficiarios_comparados": {
      "policy1": 80000,
      "policy2": 120000,
      "policy2_alcanza": "50% más beneficiarios"
    },
    "recomendacion": "Policy 1 tiene mayor score pero es 56% más costosa. Policy 2 es más viable fiscalmente y alcanza a más beneficiarios, aunque con menor subsidio por persona."
  },
  "radar_metrics": {
    "policy1": {
      "viabilidad": 85,
      "impacto_social": 78,
      "costo_beneficio": 65,
      "evidencia": 82,
      "urgencia": 70
    },
    "policy2": {
      "viabilidad": 72,
      "impacto_social": 85,
      "costo_beneficio": 88,
      "evidencia": 71,
      "urgencia": 68
    }
  }
}
```

---

### **9. GET /recommendations**

Obtiene recomendaciones generadas automáticamente por IA.

#### Request
```bash
GET /recommendations
```

#### Response
```json
{
  "generado_en": "2025-10-17T15:30:00Z",
  "basado_en_politicas": 47,
  "periodo_analisis": "últimos 90 días",
  "recomendaciones": [
    {
      "tipo": "TENDENCIA",
      "titulo": "Enfoque en Salud Mental Muestra Alto Éxito",
      "descripcion": "Las últimas 5 políticas con mejor score incluyen componente de salud mental. Patrón detectado en análisis de los últimos 3 meses con consistencia del 92%.",
      "accion_sugerida": "Considerar componente de salud mental en futuras propuestas de políticas sociales. Datos históricos muestran aumento promedio de 1.8 puntos en score.",
      "confianza": 0.92,
      "evidencia": [
        "Política de Educación + Salud Mental (score 9.1)",
        "Programa de Juventud + Apoyo Psicológico (score 8.7)"
      ]
    },
    {
      "tipo": "ALERTA",
      "titulo": "Políticas Ambientales Restrictivas Tienen Bajo Score",
      "descripcion": "4 de 5 políticas con prohibiciones totales obtuvieron score < 5. Patrón: alta resistencia a medidas coercitivas sin incentivos compensatorios.",
      "accion_sugerida": "Priorizar incentivos positivos sobre prohibiciones. Considerar implementación gradual con períodos de adaptación de 12-18 meses.",
      "confianza": 0.89,
      "casos_identificados": 4,
      "impacto": "ALTO"
    },
    {
      "tipo": "OPORTUNIDAD",
      "titulo": "Brecha en Análisis de Educación Rural",
      "descripcion": "Solo 2 políticas analizadas sobre educación rural en 6 meses, a pesar de ser área prioritaria en Plan Nacional de Desarrollo 2023-2026.",
      "accion_sugerida": "Desarrollar políticas enfocadas en acceso a educación en zonas rurales. Datos del DANE muestran brecha de cobertura del 23% vs zonas urbanas.",
      "confianza": 0.78,
      "potencial_impacto": "Aproximadamente 850.000 estudiantes rurales",
      "fuentes": ["DANE 2024", "MinEducación"]
    }
  ]
}
```

---

### **10. POST /policies/{id}/export**

Exporta política a PDF con gráficos.

#### Request
```bash
POST /policies/550e8400-e29b-41d4-a716-446655440000/export
```

#### Response
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="policy-550e8400.pdf"

[Binary PDF data]
```

#### Ejemplo con cURL (descargar)
```bash
curl -X POST "https://api.evalpolicy.app/policies/550e8400/export" \
  --output policy-report.pdf
```

---

### **11. DELETE /policies/{id}**

Elimina una política del sistema.

#### Request
```bash
DELETE /policies/550e8400-e29b-41d4-a716-446655440000
```

#### Response (204 No Content)
```json
{
  "message": "Política eliminada exitosamente",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 🔌 Ejemplos de Integración

### JavaScript/TypeScript
```typescript
// services/evalpolicy.ts
const API_URL = 'https://api.evalpolicy.app';

export const analyzePolicy = async (data: {
  titulo: string;
  texto: string;
  categoria?: string;
}) => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }
  
  return await response.json();
};

// Uso
try {
  const result = await analyzePolicy({
    titulo: "Mi Política",
    texto: "Descripción completa...",
    categoria: "Salud"
  });
  console.log('Score:', result.score);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Python
```python
import requests
from typing import Optional, Dict

API_URL = "https://api.evalpolicy.app"

def analyze_policy(
    titulo: str, 
    texto: str, 
    categoria: Optional[str] = None
) -> Dict:
    """Analiza una política pública"""
    response = requests.post(
        f"{API_URL}/analyze",
        json={
            "titulo": titulo,
            "texto": texto,
            "categoria": categoria
        },
        timeout=60
    )
    response.raise_for_status()
    return response.json()

# Uso
try:
    result = analyze_policy(
        titulo="Mi Política",
        texto="Descripción completa...",
        categoria="Salud"
    )
    print(f"Score: {result['score']}")
    print(f"Conclusión: {result['resultado']['conclusion']}")
except requests.exceptions.HTTPError as e:
    print(f"Error: {e.response.json()['error']['message']}")
```

### cURL
```bash
# Analizar política
curl -X POST "https://api.evalpolicy.app/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Test Policy",
    "texto": "Esta es una política de prueba sobre subsidios educativos...",
    "categoria": "Educación"
  }'

# Buscar políticas
curl "https://api.evalpolicy.app/policies/search?q=salud&min_score=7"

# Obtener estadísticas
curl "https://api.evalpolicy.app/dashboard/stats"

# Simular escenario
curl -X POST "https://api.evalpolicy.app/simulate" \
  -H "Content-Type: application/json" \
  -d '{
    "policy_id": "550e8400-e29b-41d4-a716-446655440000",
    "parametros": {
      "subsidio_porcentaje": 75,
      "poblacion_objetivo": 100000
    }
  }'
```

---

## ⚠️ Rate Limits

| Tier       | Requests/minuto | Requests/hora | Requests/día |
|------------|-----------------|---------------|--------------|
| Free       | 10              | 100           | 1,000        |
| Pro        | 60              | 1,000         | 10,000       |
| Enterprise | Ilimitado       | Ilimitado     | Ilimitado    |

### Headers de Respuesta
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1697385600
Retry-After: 60
```

### Manejo de Rate Limit
```typescript
const response = await fetch(url);

if (response.status === 429) {
  const retryAfter = response.headers.get('Retry-After');
  console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
  
  // Esperar y reintentar
  await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
  return fetch(url); // Retry
}
```

---

## 🐛 Manejo de Errores

### Códigos de Error

| Código               | HTTP | Descripción                                  |
|----------------------|------|----------------------------------------------|
| VALIDATION_ERROR     | 400  | Datos de entrada inválidos                   |
| POLICY_NOT_FOUND     | 404  | ID de política no existe                     |
| RATE_LIMIT_EXCEEDED  | 429  | Límite de requests excedido                  |
| DOCUMENT_TOO_LARGE   | 413  | Archivo excede 10MB                          |
| UNSUPPORTED_FORMAT   | 415  | Formato de archivo no soportado              |
| LLM_SERVICE_ERROR    | 502  | Error en servicio de Groq                    |
| MCP_SERVICE_ERROR    | 502  | Error consultando contexto histórico         |
| DATABASE_ERROR       | 500  | Error de base de datos                       |
| TIMEOUT_ERROR        | 504  | Análisis excedió 60 segundos                 |

### Ejemplo de Manejo
```typescript
try {
  const result = await analyzePolicy(data);
} catch (error) {
  if (error.response) {
    const { code, message, details } = error.response.data.error;
    
    switch (code) {
      case 'VALIDATION_ERROR':
        console.error(`Validación: ${message}`, details);
        break;
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Demasiadas peticiones, espera un momento');
        break;
      case 'DOCUMENT_TOO_LARGE':
        console.error('El archivo es muy grande (máx 10MB)');
        break;
      default:
        console.error(`Error: ${message}`);
    }
  }
}
```

---

## 🔄 Versionado

La API usa versionado semántico:
```
https://api.evalpolicy.app/v1/analyze  (actual)
https://api.evalpolicy.app/v2/analyze  (futuro)
```

**Versión actual**: `v1.0.0`  
**Cambios breaking**: Se notificarán con 3 meses de anticipación

---

## 📊 Webhooks (Roadmap)
```json
POST https://tu-servidor.com/webhook

{
  "event": "analysis.completed",
  "policy_id": "550e8400-e29b-41d4-a716-446655440000",
  "score": 8.5,
  "timestamp": "2025-10-17T15:30:00Z"
}
```

---

## 📞 Soporte

- 📧 **Email**: api@evalpolicy.app
- 📚 **Docs**: https://docs.evalpolicy.app
- 💬 **Discord**: https://discord.gg/evalpolicy
- 🐛 **Issues**: https://github.com/evalpolicy/evalpolicy/issues

---

## 🔗 Recursos Adicionales

- [Guía de Usuario](USER_GUIDE.md)
- [Arquitectura del Sistema](ARCHITECTURE.md)
- [Guía de Despliegue](DEPLOYMENT.md)
- [Changelog](CHANGELOG.md)

---

<div align="center">

**Documentación actualizada**: Octubre 17, 2025

[⬆ Volver a README](../README.md)

</div>