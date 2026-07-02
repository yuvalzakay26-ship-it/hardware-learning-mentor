import { notFound } from "next/navigation";
import { availableModules, getModule } from "@/lib/content";
import QuizView from "./QuizView";

export function generateStaticParams() {
  return availableModules.map((m) => ({ id: m.id }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const module = getModule(id);
  if (!module || !module.available || module.quiz.length === 0) notFound();

  return <QuizView module={module} />;
}
