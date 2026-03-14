export interface LessonPlanInput {
  subject: string;
  grade: string;
  topic: string;
  duration: string;
  objectives: string;
  additionalNotes: string;
}

export interface ABCDObjective {
  audience: string;
  behavior: string;
  condition: string;
  degree: string;
  full: string;
}

export interface Activity {
  name: string;
  description: string;
  duration: string;
  materials: string;
}

export interface RubricCriterion {
  criterion: string;
  excellent: string;
  good: string;
  developing: string;
  beginning: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  duration: string;
  generalObjective: string;
  specificObjectives: string[];
  abcdObjectives: ABCDObjective[];
  activities: Activity[];
  rubric: RubricCriterion[];
  createdAt: string;
}

export interface SavedPlan {
  id: string;
  title: string;
  subject: string;
  createdAt: string;
}
