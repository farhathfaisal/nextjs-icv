import type { Question, ServiceResult, FlowData } from "@/types/directory";
import data from "@/data/services.json";

const flowData = data as FlowData;

export function getQuestion(id: string): Question | undefined {
  return flowData.questions.find((q) => q.id === id);
}

export function getStartQuestion(): Question {
  return flowData.questions[0];
}

export function getServices(ids: string[]): ServiceResult[] {
  return ids
    .map((id) => flowData.services.find((s) => s.id === id))
    .filter((s): s is ServiceResult => s !== undefined);
}

export function getTotalQuestions(): number {
  return flowData.questions.length;
}
