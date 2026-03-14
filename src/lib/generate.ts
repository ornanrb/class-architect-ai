import { LessonPlan, LessonPlanInput } from "@/types/lesson-plan";

// Mock generation for demo — will be replaced with Lovable Cloud edge function
export async function generateLessonPlan(input: LessonPlanInput): Promise<LessonPlan> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 2000));

  const id = crypto.randomUUID();
  return {
    id,
    title: `Plan de Clase: ${input.topic}`,
    subject: input.subject,
    grade: input.grade,
    topic: input.topic,
    duration: input.duration,
    generalObjective: `Al finalizar la clase, los estudiantes de ${input.grade} comprenderán los conceptos fundamentales de ${input.topic} en el área de ${input.subject}, demostrando capacidad de análisis y aplicación práctica.`,
    specificObjectives: [
      `Identificar los componentes principales de ${input.topic}.`,
      `Analizar la relación entre los conceptos clave de ${input.topic} y su aplicación en contextos reales.`,
      `Crear productos que demuestren comprensión de ${input.topic} usando recursos disponibles.`,
    ],
    abcdObjectives: [
      {
        audience: `Los estudiantes de ${input.grade}`,
        behavior: `identificarán y describirán los elementos clave de ${input.topic}`,
        condition: `utilizando material didáctico proporcionado en clase`,
        degree: `con al menos 80% de precisión en sus respuestas`,
        full: `Los estudiantes de ${input.grade} identificarán y describirán los elementos clave de ${input.topic}, utilizando material didáctico proporcionado en clase, con al menos 80% de precisión en sus respuestas.`,
      },
      {
        audience: `Los estudiantes de ${input.grade}`,
        behavior: `aplicarán los conceptos aprendidos para resolver problemas prácticos`,
        condition: `trabajando en equipos colaborativos`,
        degree: `completando al menos 3 de 4 ejercicios correctamente`,
        full: `Los estudiantes de ${input.grade} aplicarán los conceptos aprendidos para resolver problemas prácticos, trabajando en equipos colaborativos, completando al menos 3 de 4 ejercicios correctamente.`,
      },
    ],
    activities: [
      {
        name: "Activación de conocimientos previos",
        description: `Lluvia de ideas grupal sobre lo que los estudiantes ya saben acerca de ${input.topic}. El docente guía la discusión y registra las ideas en la pizarra.`,
        duration: "10 minutos",
        materials: "Pizarra, marcadores",
      },
      {
        name: "Presentación del contenido",
        description: `Exposición interactiva de los conceptos clave de ${input.topic} con apoyo de recursos visuales y ejemplos concretos.`,
        duration: "20 minutos",
        materials: "Presentación digital, proyector",
      },
      {
        name: "Actividad práctica",
        description: `Los estudiantes trabajan en parejas para completar una actividad de aplicación sobre ${input.topic}. Se fomenta la discusión y el análisis crítico.`,
        duration: "15 minutos",
        materials: "Hojas de trabajo, material de consulta",
      },
      {
        name: "Cierre y evaluación",
        description: `Socialización de resultados, retroalimentación del docente y autoevaluación de los estudiantes sobre su desempeño.`,
        duration: "10 minutos",
        materials: "Rúbrica de autoevaluación",
      },
    ],
    rubric: [
      {
        criterion: "Conocimiento del tema",
        excellent: "Demuestra comprensión profunda y puede explicar conceptos con sus propias palabras.",
        good: "Comprende los conceptos principales con mínimas imprecisiones.",
        developing: "Muestra comprensión parcial, necesita apoyo para algunos conceptos.",
        beginning: "Demuestra comprensión limitada del tema.",
      },
      {
        criterion: "Participación y colaboración",
        excellent: "Participa activamente, aporta ideas valiosas y apoya a sus compañeros.",
        good: "Participa de manera consistente y colabora con su equipo.",
        developing: "Participa ocasionalmente, necesita motivación para colaborar.",
        beginning: "Participación mínima, poco involucramiento en el trabajo grupal.",
      },
      {
        criterion: "Aplicación práctica",
        excellent: "Aplica conceptos de forma creativa y resuelve problemas complejos.",
        good: "Aplica conceptos correctamente en situaciones estándar.",
        developing: "Aplica conceptos con apoyo y guía del docente.",
        beginning: "Dificultad para aplicar los conceptos aprendidos.",
      },
    ],
    createdAt: new Date().toISOString(),
  };
}
