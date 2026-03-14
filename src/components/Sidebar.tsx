import { SavedPlan } from "@/types/lesson-plan";
import { FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  plans: SavedPlan[];
  activePlanId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({ plans, activePlanId, onSelect, onNew, onDelete }: Props) {
  return (
    <aside className="flex h-full w-full flex-col bg-card border-r border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="font-display text-lg font-bold text-foreground tracking-tight">EduPlan AI</h1>
        <Button variant="ghost" size="icon" onClick={onNew} aria-label="Nuevo plan">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {plans.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            Aún no tienes planes guardados
          </p>
        )}
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
              activePlanId === plan.id
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
            onClick={() => onSelect(plan.id)}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{plan.title}</p>
              <p className="truncate text-xs text-muted-foreground">{plan.subject}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(plan.id); }}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              aria-label="Eliminar plan"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">Guardado local en tu navegador</p>
      </div>
    </aside>
  );
}
