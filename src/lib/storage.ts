import { LessonPlan, SavedPlan } from "@/types/lesson-plan";

const STORAGE_KEY = "eduplan-saved-plans";

export function savePlan(plan: LessonPlan): void {
  const plans = getAllPlans();
  const existing = plans.findIndex((p) => p.id === plan.id);
  if (existing >= 0) {
    plans[existing] = plan;
  } else {
    plans.unshift(plan);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function getAllPlans(): LessonPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getPlan(id: string): LessonPlan | null {
  return getAllPlans().find((p) => p.id === id) ?? null;
}

export function deletePlan(id: string): void {
  const plans = getAllPlans().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function getSavedPlansList(): SavedPlan[] {
  return getAllPlans().map((p) => ({
    id: p.id,
    title: p.title,
    subject: p.subject,
    createdAt: p.createdAt,
  }));
}
