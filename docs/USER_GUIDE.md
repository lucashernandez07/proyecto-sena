# 📖 Guía de Usuario - EvalPolicy

Bienvenido a **EvalPolicy**, la plataforma de análisis inteligente de políticas públicas para Colombia.

---

## 🎯 ¿Qué es EvalPolicy?

EvalPolicy es una herramienta que utiliza inteligencia artificial para analizar y evaluar políticas públicas, programas sociales y proyectos de ley. En segundos, obtendrás un análisis estructurado con:

- ✅ **Beneficios** identificados automáticamente
- ⚠️ **Riesgos** y alertas potenciales
- 💰 **Costos** estimados
- 🎯 **Score de viabilidad** (0-10)
- 📊 **Validación con datos históricos**

---

## 🚀 Primeros Pasos

### 1. Acceder a la Plataforma

Visita: **[evalpolicy.vercel.app](https://evalpolicy.vercel.app)**

No se requiere registro para la versión demo.

### 2. Interfaz Principal

Al entrar verás el **Dashboard** con:
```
┌─────────────────────────────────────────────────────┐
│  📊 EvalPolicy                                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [47 Políticas] [7.2 Score] [8 Riesgo] [12 Alertas]│
│                                                      │
│  📈 Análisis por Categoría                          │
│  ■■■■■■■■■■ Salud (12)                             │
│  ■■■■■■■■ Educación (15)                           │
│  ...                                                 │
│                                                      │
│  🗂️ Políticas Recientes                             │
│  [Card] [Card] [Card]                               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 Analizar una Nueva Política

### Método 1: Escribir Directamente

1. Click en **"Nueva Evaluación"** en el menú lateral
2. Completa el formulario:
```
┌──────────────────────────────────────┐
│ Título de la Política *              │
│ ┌──────────────────────────────────┐ │
│ │ Ej: Subsidio de Transporte...    │ │
│ └──────────────────────────────────┘ │
│                                       │
│ Descripción Completa *                │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │  Describe la política aquí...    │ │
│ │                                  │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                       │
│ Categoría                             │
│ [Seleccionar ▼]                       │
│                                       │
│ [Analizar Política]                   │
└──────────────────────────────────────┘
```

3. Click en **"Analizar Política"**
4. Espera 15-30 segundos

### Método 2: Subir Documento

1. En **"Nueva Evaluación"**
2. Arrastra un archivo **PDF o DOCX** a la zona de carga
3. O click en **"Seleccionar archivo"**
4. El sistema extraerá el texto automáticamente

**Requisitos del archivo:**
- ✅ Formato: PDF o DOCX
- ✅ Tamaño máximo: 10 MB
- ✅ Páginas máximas (PDF): 50

---

## 📊 Entender los Resultados

Cada análisis incluye 5 secciones principales:

### 1. Score de Viabilidad (0-10)
```
┌─────────────────────────────┐
│         8.5                 │  ← Score
│    ═══════════════          │
│   ALTA VIABILIDAD           │
└─────────────────────────────┘
```

| Rango      | Interpretación            | Color   | Recomendación           |
|------------|---------------------------|---------|-------------------------|
| 8.0 - 10.0 | Alta viabilidad           | 🟢 Verde | Aprobar e implementar   |
| 6.0 - 7.9  | Viable con ajustes        | 🟡 Amarillo | Revisar y ajustar    |
| 4.0 - 5.9  | Requiere revisión mayor   | 🟠 Naranja | Rediseñar componentes |
| 0.0 - 3.9  | No recomendada            | 🔴 Rojo | Descartar o repensar    |

### 2. Beneficios Identificados

┌─────────────────────────────────────────────────┐
│ 📈 BENEFICIOS                                   │
├─────────────────────────────────────────────────┤
│                                                  │
│ • Mejora el acceso a educación superior         │
│ • Reduce la deserción estudiantil en 15%        │
│ • Fomenta la movilidad social                   │
│ • Apoya a familias de bajos ingresos