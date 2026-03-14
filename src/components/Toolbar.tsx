import { LessonPlan } from "@/types/lesson-plan";
import { Button } from "@/components/ui/button";
import { Download, FileDown, Save } from "lucide-react";
import { exportToPdf, exportToDocx } from "@/lib/export";
import { savePlan } from "@/lib/storage";
import { toast } from "sonner";

interface Props {
  plan: LessonPlan | null;
}

export default function Toolbar({ plan }: Props) {
  const handleSave = () => {
    if (!plan) return;
    savePlan(plan);
    toast.success("Plan guardado localmente");
  };

  const handlePdf = async () => {
    if (!plan) return;
    await exportToPdf(plan);
    toast.success("PDF descargado");
  };

  const handleDocx = async () => {
    if (!plan) return;
    await exportToDocx(plan);
    toast.success("DOCX descargado");
  };

  return (
    <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 sticky top-0 z-10">
      <span className="font-display text-sm font-semibold text-foreground mr-auto">Vista Previa</span>
      <Button variant="outline" size="sm" onClick={handleSave} disabled={!plan}>
        <Save className="h-3.5 w-3.5 mr-1.5" />
        Guardar
      </Button>
      <Button variant="export" size="sm" onClick={handlePdf} disabled={!plan}>
        <Download className="h-3.5 w-3.5 mr-1.5" />
        PDF
      </Button>
      <Button variant="export" size="sm" onClick={handleDocx} disabled={!plan}>
        <FileDown className="h-3.5 w-3.5 mr-1.5" />
        DOCX
      </Button>
    </div>
  );
}
