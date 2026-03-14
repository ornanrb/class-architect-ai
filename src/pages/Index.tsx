import { useState, useCallback, useEffect } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import PlanPreview from "@/components/PlanPreview";
import Sidebar from "@/components/Sidebar";
import Toolbar from "@/components/Toolbar";
import ShimmerLoader from "@/components/ShimmerLoader";
import { LessonPlan, LessonPlanInput, SavedPlan } from "@/types/lesson-plan";
import { generateLessonPlan } from "@/lib/generate";
import { getSavedPlansList, getPlan, deletePlan, savePlan } from "@/lib/storage";
import { toast } from "sonner";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSavedPlans(getSavedPlansList());
  }, []);

  const refreshSaved = () => setSavedPlans(getSavedPlansList());

  const handleGenerate = useCallback(async (input: LessonPlanInput) => {
    setIsLoading(true);
    try {
      const plan = await generateLessonPlan(input);
      setCurrentPlan(plan);
      savePlan(plan);
      refreshSaved();
      toast.success("Plan de clase generado exitosamente");
    } catch {
      toast.error("Error al generar el plan. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelect = (id: string) => {
    const plan = getPlan(id);
    if (plan) {
      setCurrentPlan(plan);
      setSidebarOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    deletePlan(id);
    refreshSaved();
    if (currentPlan?.id === id) setCurrentPlan(null);
    toast.success("Plan eliminado");
  };

  const handleNew = () => {
    setCurrentPlan(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar
          plans={savedPlans}
          activePlanId={currentPlan?.id ?? null}
          onSelect={handleSelect}
          onNew={handleNew}
          onDelete={handleDelete}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="font-display text-lg font-bold">EduPlan AI</h1>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Form panel */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 overflow-y-auto border-r border-border bg-card p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Nuevo Plan</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Completa los datos y genera tu plan de clase con IA.
              </p>
            </div>
            <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Preview panel */}
          <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
            <Toolbar plan={currentPlan} />
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <ShimmerLoader />
              ) : currentPlan ? (
                <PlanPreview plan={currentPlan} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center max-w-sm">
                    <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Tu plan aparecerá aquí
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Completa el formulario y presiona "Generar" para crear tu plan de clase con formato ABCD, objetivos, actividades y rúbricas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile preview (below form) */}
        <div className="lg:hidden">
          {(isLoading || currentPlan) && (
            <div className="border-t border-border">
              <Toolbar plan={currentPlan} />
              <div className="overflow-y-auto p-4 max-h-[60vh]">
                {isLoading ? <ShimmerLoader /> : currentPlan && <PlanPreview plan={currentPlan} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
