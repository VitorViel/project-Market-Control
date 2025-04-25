import React from "react";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md hover:shadow-lg transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
};
