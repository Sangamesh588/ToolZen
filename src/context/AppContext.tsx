"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  recents: string[];
  addRecent: (slug: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load persisted client data after initial mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("ToolGen_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      const savedRecents = localStorage.getItem("ToolGen_recents");
      if (savedRecents) setRecents(JSON.parse(savedRecents));
      const savedTheme = localStorage.getItem("ToolGen_theme") as "light" | "dark" | null;
      if (savedTheme) setTheme(savedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(slug);
      const updated = exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem("ToolGen_favorites", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  const addRecent = (slug: string) => {
    setRecents((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, 12);
      try {
        localStorage.setItem("ToolGen_recents", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("ToolGen_theme", nextTheme);
    } catch {}
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K search palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        recents,
        addRecent,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

