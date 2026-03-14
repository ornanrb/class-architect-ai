import { useState } from "react";
import { LessonPlanInput } from "@/types/lesson-plan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

interface Props {
  onGenerate: (input: LessonPlanInput) => void;
  isLoading: boolean;
}

const grades = [
  "Preescolar", "1° Primaria", "2° Primaria", "3° Primaria", "4° Primaria", "5° Primaria", "6° Primaria",
  "1° Secundaria", "2° Secundaria", "3° Secundaria",
  "1° Bachillerato", "2° Bachillerato", "3° Bachillerato",
];

const subjects = [
  "Matemáticas", "Ciencias Naturales", "Lengua y Literatura", "Estudios Sociales",
  "Inglés", "Educación Física", "Arte", "Tecnología", "Música", "Historia", "Geografía", "Filosofía", "Otra",
];

export default function GeneratorForm({ onGenerate, isLoading }: Props) {
  const [form, setForm] = useState<LessonPlanInput>({
    subject: "",
    grade: "",
    topic: "",
    duration: "45 minutos",
    objectives: "",
    additionalNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.grade || !form.topic) return;
    onGenerate(form);
  };

  const update = (field: keyof LessonPlanInput, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="subject" className="font-display text-sm font-medium">Materia</Label>
        <Select value={form.subject} onValueChange={(v) => update("subject", v)}>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Selecciona una materia" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade" className="font-display text-sm font-medium">Grado / Nivel</Label>
        <Select value={form.grade} onValueChange={(v) => update("grade", v)}>
          <SelectTrigger id="grade">
            <SelectValue placeholder="Selecciona el grado" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic" className="font-display text-sm font-medium">Tema de la clase</Label>
        <Input
          id="topic"
          placeholder="Ej: Fracciones equivalentes"
          value={form.topic}
          onChange={(e) => update("topic", e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration" className="font-display text-sm font-medium">Duración</Label>
        <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
          <SelectTrigger id="duration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["30 minutos", "45 minutos", "60 minutos", "90 minutos", "120 minutos"].map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objectives" className="font-display text-sm font-medium">
          Objetivos adicionales <span className="text-muted-foreground font-normal">(opcional)</span>
        </Label>
        <Textarea
          id="objectives"
          placeholder="Objetivos específicos que deseas incluir..."
          value={form.objectives}
          onChange={(e) => update("objectives", e.target.value)}
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="font-display text-sm font-medium">
          Notas adicionales <span className="text-muted-foreground font-normal">(opcional)</span>
        </Label>
        <Textarea
          id="notes"
          placeholder="Contexto, necesidades especiales, recursos disponibles..."
          value={form.additionalNotes}
          onChange={(e) => update("additionalNotes", e.target.value)}
          maxLength={500}
          rows={2}
        />
      </div>

      <Button
        type="submit"
        variant="generate"
        size="lg"
        className="w-full"
        disabled={isLoading || !form.subject || !form.grade || !form.topic}
      >
        {isLoading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generar Plan de Clase
          </>
        )}
      </Button>
    </form>
  );
}
