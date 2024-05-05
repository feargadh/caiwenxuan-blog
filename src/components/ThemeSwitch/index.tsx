"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Sun from "./sun.svg";
import Moon from "./moon.svg";

const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    let isDark = theme === "dark";

    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    const transition = document.startViewTransition(async () => {
      setTheme(isDark ? "light" : "dark");
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-in",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });
  };

  if (!mounted) {
    return null;
  }
  return (
    <label className="relative flex justify-center cursor-pointer hover:text-[var(--title)] transition-all">
      {theme === "dark" ? <Moon /> : <Sun />}
      <input
        className=" absolute hidden"
        type="checkbox"
        onClick={(event) => toggleTheme(event)}
      />
    </label>
  );
};

export default ThemeSwitch;
