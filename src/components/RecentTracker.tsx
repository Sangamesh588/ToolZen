"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

export function RecentTracker({ slug }: { slug: string }) {
  const { addRecent } = useApp();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (slug && trackedRef.current !== slug) {
      trackedRef.current = slug;
      addRecent(slug);
    }
  }, [slug, addRecent]);

  return null;
}
