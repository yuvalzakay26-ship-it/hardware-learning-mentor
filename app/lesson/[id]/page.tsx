import { notFound } from "next/navigation";
import { availableModules, getModule } from "@/lib/content";
import LessonView from "./LessonView";

export function generateStaticParams() {
  return availableModules.map((m) => ({ id: m.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const module = getModule(id);
  if (!module || !module.available) notFound();

  return <LessonView module={module} />;
}
