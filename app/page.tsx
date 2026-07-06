"use client";

import LearningPathCard from "@/components/LearningPathCard";
import InstallCard from "@/components/InstallCard";
import { learningPaths } from "@/lib/learningPaths";
import { lessonsInStage, type StageId } from "@/lib/curriculum";
import { useProgress } from "@/lib/useProgress";

export default function HomePage() {
  const { progress } = useProgress();

  // חישוב התקדמות למסלול פעיל: אוסף את כל השיעורים בשלבים של המסלול (ללא כפילויות).
  function pathLessonStats(stageIds: StageId[]) {
    const ids = new Set<string>();
    stageIds.forEach((sid) =>
      lessonsInStage(sid).forEach((l) => ids.add(l.id))
    );
    const total = ids.size;
    const done = [...ids].filter((id) =>
      progress.completedLessons.includes(id)
    ).length;
    return { total, done };
  }

  return (
    <main className="px-4 pt-8">
      {/* פתיח נקי */}
      <header>
        <p className="eyebrow">מנטור החומרה האישי שלך</p>
        <h1 className="mt-1.5 text-[27px] font-extrabold leading-[1.15]">
          מנטור החומרה
        </h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
          מסלול לימוד אישי לעולם החומרה, הוולידציה וצוות Central.
        </p>
        <p className="mt-1 text-[13.5px] font-semibold text-blue-deep">
          בחר מסלול והתקדם שלב־שלב.
        </p>
      </header>

      {/* מסלולי למידה */}
      <section aria-label="מסלולי למידה" className="mt-7">
        <h2 className="mb-3.5 text-[20px] font-bold">מסלולי למידה</h2>
        <div className="space-y-4">
          {learningPaths.map((path) => {
            // מסלול פעיל או משולב (יש בו שיעורים פעילים) — מציגים התקדמות.
            const stats =
              path.relatedStageIds.length > 0
                ? pathLessonStats(path.relatedStageIds)
                : undefined;
            return (
              <LearningPathCard
                key={path.id}
                path={path}
                lessonsTotal={stats?.total}
                lessonsDone={stats?.done}
              />
            );
          })}
        </div>
      </section>

      {/* פילוסופיית למידה — כרטיס קטן ורגוע */}
      <section aria-label="איך ללמוד נכון" className="mt-6">
        <div className="rounded-2xl border border-line bg-blue-tint/60 p-4">
          <h2 className="text-[15.5px] font-bold text-blue-deep">
            איך ללמוד נכון?
          </h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
            מתקדמים לפי הסדר: קודם מבינים את הבסיס, אחר כך את תהליך העבודה, ורק אז
            את הכלים. אם מושג לא ברור — מסמנים אותו לחזרה וכותבים הערה אישית.
          </p>
        </div>
      </section>

      {/* התקנה כאפליקציה (PWA) — שקט, מוסתר כשכבר מותקן */}
      <InstallCard />
    </main>
  );
}
