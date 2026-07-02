"use client";

import { useEffect, useState } from "react";
import type { Progress } from "./types";
import { emptyProgress, loadProgress } from "./storage";

/**
 * טוען את ההתקדמות מ-localStorage אחרי שהעמוד עלה,
 * כדי להימנע מאי-התאמה בין שרת ללקוח (hydration mismatch).
 */
export function useProgress(): { progress: Progress; setProgress: (p: Progress) => void; ready: boolean } {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  return { progress, setProgress, ready };
}
