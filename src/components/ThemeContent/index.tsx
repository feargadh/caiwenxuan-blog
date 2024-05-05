"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "../header/header";
import Arrow from "./arrow.svg";

const ThemeContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backVisible, setBackVisible] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const io = useRef<IntersectionObserver>(
    new IntersectionObserver((entries) => {
      if (entries[0]) {
        setBackVisible(!entries[0].isIntersecting);
      } else {
        setBackVisible(false);
      }
    }),
  );

  useEffect(() => {
    if (topRef.current) {
      io.current.observe(topRef.current);
    }

    return () => {
      io.current.disconnect();
    };
  }, []);

  const handleBackTop = () => {
    mainRef.current &&
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <NextThemeProvider themes={["dark", "light"]}>
      <button
        className={`fixed bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full opacity-30 transition-all hover:bg-[var(--tagBg)] hover:text-[var(--title)] hover:opacity-100 ${backVisible ? "visible" : "hidden"}`}
        onClick={handleBackTop}
      >
        <Arrow />
      </button>
      <Header />
      <main
        ref={mainRef}
        className=" mt-[24px] h-[calc(100vh-48px)] max-w-[48rem] overflow-auto"
      >
        <div ref={topRef} className=" h-[1px] w-full"></div>
        {children}
      </main>
    </NextThemeProvider>
  );
};

export default ThemeContent;
