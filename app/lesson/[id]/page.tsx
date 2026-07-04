import { notFound } from "next/navigation";
import { availableModules, getModule } from "@/lib/content";
import LessonView, { type LessonLink } from "./LessonView";

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

  // סדר מסלול הלמידה = סדר המודולים הזמינים בלבד (מודולים שאינם available מדולגים)
  const order = availableModules;
  const pos = order.findIndex((m) => m.id === module.id);

  const toLink = (m: (typeof order)[number] | undefined): LessonLink | null =>
    m ? { id: m.id, title: m.title } : null;

  const prev = toLink(pos > 0 ? order[pos - 1] : undefined);
  const next = toLink(pos >= 0 && pos < order.length - 1 ? order[pos + 1] : undefined);

  return <LessonView module={module} prev={prev} next={next} />;
}
