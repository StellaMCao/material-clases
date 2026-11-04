# 📊 Rúbrica Recargada — Generador de Rúbricas Analíticas Interactivas

> Herramienta pedagógica web para diseñar, ponderar, guardar y exportar matrices de evaluación analíticas con corrección interactiva.
>
> 🔗 **Acceso en línea:** [https://stellamcao.github.io/material-clases/rubrica-recargada/](https://stellamcao.github.io/material-clases/rubrica-recargada/)  
> 📖 **Guía web ilustrada:** [https://stellamcao.github.io/material-clases/rubrica-recargada/ayuda.html](https://stellamcao.github.io/material-clases/rubrica-recargada/ayuda.html)

---

## 🎯 ¿Qué es y para qué sirve?

**Rúbrica Recargada** es un entorno web diseñado para docentes, formadores y estudiantes de profesorados que necesitan elaborar instrumentos de evaluación transparentes, graduados y cualitativamente fundamentados.

A diferencia de una tabla convencional en procesadores de texto, esta aplicación permite:
- **Diseño flexible:** Modalidad cuantitativa (con notas ponderadas) o puramente cualitativa (formativa).
- **Redacción en vivo:** Editor matricial donde se redacta cada descriptor con vista previa simultánea.
- **Persistencia automática:** Guardado local (`localStorage`) que protege el trabajo frente a cierres accidentales.
- **Plantillas portables (.json):** Guardar y compartir la estructura completa de la rúbrica entre colegas.
- **Exportación interactiva (.html autónomo):** Genera una ficha de corrección digital con cálculo automático al hacer clic, campos para el nombre del alumno, fecha, devoluciones cualitativas y formato optimizado para imprimir o guardar en PDF.

---

## 🧭 Anatomía de la Aplicación

```
┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
│              PANEL IZQUIERDO                  │               PANEL DERECHO                   │
│          (Configuración y Datos)              │           (Vista Previa y Edición)            │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 1. Configuración:                             │ Encabezado Dinámico:                          │
│    - ¿Usa puntajes? [Sí / No]                 │    Docente | Materia | Trabajo                │
│    - Docente, Materia y Trabajo               │                                               │
│                                               │ Matriz de Criterios y Niveles:                │
│ 2. Niveles de Desempeño (Columnas):           │    [Filas = Criterios (pts)]                  │
│    - Nombre y valor relativo (ej. 4, 3, 2, 0) │    [Columnas = Niveles]                       │
│                                               │    [Celdas = Textareas para descriptores]     │
│ 3. Criterios de Evaluación (Filas):           │                                               │
│    - Nombre y puntaje máximo (ej. 25 pts)     │ Observaciones Generales de Cátedra            │
│                                               │                                               │
│ 4. Acciones:                                  │ Botones de Exportación:                       │
│    - Guardar plantilla (.json)                │    - Exportar a HTML (Interactivo)            │
│    - Cargar plantilla (.json)                 │    - Exportar a PDF (Imprimible)              │
│    - Reiniciar formulario                     │                                               │
└───────────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 🚀 Guía de Uso Paso a Paso

### 1. Definir modalidad de evaluación
En la sección **1. Configuración**, elige:
- **Sí**: si deseas que la rúbrica calcule notas cuantitativas.
- **No**: para rúbricas puramente formativas o diagnósticas (solo comentarios).

### 2. Configurar los Niveles de Desempeño (Columnas)
Define la escala de logro (habitualmente de mayor a menor):
- Ejemplos típicos: *Excelente (4)*, *Bueno (3)*, *Aceptable (2)*, *A desarrollar (0)*.
- **Asignación de cero (0):** Si un nivel representa reprobación o desempeño ausente, asígnale **0**. Esto evita que el estudiante sume puntos no merecidos por arrastre matemático.

### 3. Establecer Criterios de Evaluación (Filas)
Define las dimensiones del aprendizaje a evaluar:
- Ingresa el nombre del criterio y su puntaje máximo.
- *Recomendación:* Haz que la suma de los máximos de todos los criterios dé **100** (o 10) puntos.

### 4. Completar los Descriptores Cualitativos
En la vista previa de la derecha, escribe en cada celda la **evidencia observable** correspondiente a ese nivel y criterio. Evita términos ambiguos como "regular" o "hace poco"; describe comportamientos, producciones o comprensiones concretas.

### 5. Exportar y Corregir

#### Opción A: Exportar a HTML (Interactivo) — *Recomendado*
Genera un archivo `.html` que no requiere conexión a internet:
1. Ábrelo en cualquier navegador (Chrome, Edge, Firefox, Safari).
2. Completa el **Nombre del Estudiante** y la **Fecha** en las casillas superiores.
3. Haz clic sobre el descriptor que alcanzó el estudiante en cada criterio:
   - La celda se resalta visualmente en azul claro.
   - El puntaje se suma automáticamente en tiempo real.
4. Redacta comentarios, fortalezas y sugerencias en el cuadro **Comentarios y observaciones**.
5. Presiona **"Imprimir / Guardar como PDF"** para archivar la devolución o enviarla al alumno.

#### Opción B: Exportar a PDF (Imprimible)
Abre la vista de impresión con renglones punteados en blanco para llevar en soporte papel al aula física.

---

## 📐 Cómo se calculan los puntajes

La aplicación calcula el puntaje de cada celda mediante una regla proporcional estandarizada:

$$\text{Puntaje} = \left( \frac{\text{Valor relativo del nivel}}{\text{Valor máximo de los niveles}} \right) \times \text{Puntaje máximo del criterio}$$

### Ejemplo con escala 4, 3, 2, 0 y criterio de 25 puntos:
| Nivel | Valor relativo | Proporción | Puntaje obtenido |
| :--- | :---: | :---: | :---: |
| **Excelente** | 4 | $4 / 4 = 1.00$ | **25.0 pts** |
| **Bueno** | 3 | $3 / 4 = 0.75$ | **18.8 pts** |
| **Aceptable** | 2 | $2 / 4 = 0.50$ | **12.5 pts** |
| **A desarrollar** | 0 | $0 / 4 = 0.00$ | **0.0 pts** |

---

## 💾 Estructura del archivo de plantilla (.json)

Al presionar **"Guardar plantilla"**, se descarga un archivo `.json` que contiene el estado completo de la rúbrica:

```json
{
  "teacher": "Prof. Stella Maris Cao",
  "subject": "Taller de Evaluación (Profesorado en Psicología)",
  "work": "Propuesta de evaluación para el Nivel Medio",
  "observations": "Instrucciones generales de evaluación...",
  "isQualifiable": true,
  "levels": [
    { "name": "Excelente", "value": 4, "id": "lvl-1" },
    { "name": "Bueno", "value": 3, "id": "lvl-2" },
    { "name": "Aceptable", "value": 2, "id": "lvl-3" },
    { "name": "A desarrollar", "value": 0, "id": "lvl-4" }
  ],
  "criteria": [
    { "name": "Coherencia didáctica", "maxPoints": 25, "id": "crit-1" },
    { "name": "Tríada Medio-Técnica-Instrumento", "maxPoints": 30, "id": "crit-2" }
  ],
  "descriptors": {
    "crit-1-lvl-1": "Texto del descriptor para Excelente...",
    "crit-1-lvl-2": "Texto del descriptor para Bueno...",
    "crit-1-lvl-3": "Texto del descriptor para Aceptable...",
    "crit-1-lvl-4": "Texto del descriptor para A desarrollar..."
  }
}
```

Para recuperar una rúbrica en cualquier momento, basta con hacer clic en **"Cargar plantilla"** y seleccionar el archivo.

---

## 🔒 Privacidad y Funcionamiento Offline

- **100% en el cliente:** La aplicación no recopila información ni envía datos a servidores externos. Los nombres de los docentes, estudiantes y calificaciones permanecen exclusivamente en tu dispositivo.
- **Sin dependencias externas pesadas:** Los archivos exportados son ligeros y funcionan en cualquier equipo sin instalar programas adicionales.

---

## 📚 Marco Didáctico de Referencia

Esta herramienta se fundamenta en los aportes de:
- **Hamodi, López Pastor y López (2015):** *Medios, técnicas e instrumentos de evaluación formativa y compartida*.
- **Anijovich, R. y González, C. (2011):** *Evaluar para aprender: Conceptos e instrumentos*.
- **Wiggins, G. (1998):** *Educative Assessment: Designing Assessments to Inform and Improve Student Performance*.
