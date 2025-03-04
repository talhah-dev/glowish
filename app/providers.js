"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext(undefined);
export const SmallScreenContext = createContext(undefined);

export function Providers({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsSidebarOpen(true);
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <SmallScreenContext.Provider
          value={{ isSmallScreen, setIsSmallScreen }}
        >
          {children}
        </SmallScreenContext.Provider>
      </SidebarContext.Provider>
    </NextUIProvider>
  );
}
