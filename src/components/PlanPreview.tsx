import { LessonPlan } from "@/types/lesson-plan";
import { motion } from "framer-motion";

interface Props {
  plan: LessonPlan;
}

export default function PlanPreview({ plan }: Props) {
  const fadeIn = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 },
  };

  return (
    <div className="space-y-6 font-body">
      <motion.div {...fadeIn}>
        <h2 className="font-display text-2xl font-bold text-foreground">{plan.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {plan.subject} · {plan.grade} · {plan.duration}
        </p>
      </motion.div>

      {/* General Objective */}
      <motion.section {...fadeIn} transition={{ delay: 0.05 }} className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-primary mb-2">Objetivo General</h3>
        <p className="text-foreground leading-relaxed">{plan.generalObjective}</p>
      </motion.section>

      {/* Specific Objectives */}
      <motion.section {...fadeIn} transition={{ delay: 0.1 }} className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-primary mb-3">Objetivos Específicos</h3>
        <ol className="list-decimal list-inside space-y-2 text-foreground">
          {plan.specificObjectives.map((obj, i) => (
            <li key={i} className="leading-relaxed">{obj}</li>
          ))}
        </ol>
      </motion.section>

      {/* ABCD Objectives */}
      <motion.section {...fadeIn} transition={{ delay: 0.15 }} className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-primary mb-3">Objetivos ABCD</h3>
        <div className="space-y-4">
          {plan.abcdObjectives.map((obj, i) => (
            <div key={i} className="rounded-md bg-secondary/50 p-4 space-y-2">
              <p className="text-foreground leading-relaxed">{obj.full}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span><strong className="text-foreground">A</strong> (Audiencia): {obj.audience}</span>
                <span><strong className="text-foreground">B</strong> (Comportamiento): {obj.behavior}</span>
                <span><strong className="text-foreground">C</strong> (Condición): {obj.condition}</span>
                <span><strong className="text-foreground">D</strong> (Grado): {obj.degree}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Activities */}
      <motion.section {...fadeIn} transition={{ delay: 0.2 }} className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-primary mb-3">Actividades</h3>
        <div className="space-y-4">
          {plan.activities.map((act, i) => (
            <div key={i} className="border-l-2 border-accent pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-semibold text-foreground">{act.name}</h4>
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{act.duration}</span>
              </div>
              <p className="mt-1 text-foreground leading-relaxed text-sm">{act.description}</p>
              {act.materials && (
                <p className="mt-1 text-xs text-muted-foreground">📦 {act.materials}</p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Rubric */}
      <motion.section {...fadeIn} transition={{ delay: 0.25 }} className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-primary mb-3">Rúbrica de Evaluación</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 font-display font-semibold text-foreground">Criterio</th>
                <th className="text-left py-2 px-3 font-display font-semibold text-foreground">Excelente</th>
                <th className="text-left py-2 px-3 font-display font-semibold text-foreground">Bueno</th>
                <th className="text-left py-2 px-3 font-display font-semibold text-foreground">En desarrollo</th>
                <th className="text-left py-2 pl-3 font-display font-semibold text-foreground">Inicio</th>
              </tr>
            </thead>
            <tbody>
              {plan.rubric.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-medium text-foreground">{r.criterion}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.excellent}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.good}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.developing}</td>
                  <td className="py-3 pl-3 text-muted-foreground">{r.beginning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
