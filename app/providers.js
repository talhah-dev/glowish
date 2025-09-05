// app/providers.js
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { store } from "./redux/store";
import useUser from "./components/hooks/useUser";
import { Provider as ReduxProvider } from "react-redux";
import Loader from "./components/Loader";

export const SidebarContext = createContext(undefined);
export const SmallScreenContext = createContext(undefined);
export const TabContext = createContext(undefined);

function InitUser({ children }) {
  const { user, loading, error } = useUser();

  if (loading) return <Loader />;
  if (error) return <div>Failed to load user</div>;

  return children;
}


export function Providers({ children }) {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState({ tab: "news", title: "" });

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ReduxProvider store={store}>
      <NextUIProvider navigate={router.push}>
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
          <SmallScreenContext.Provider value={{ isSmallScreen, setIsSmallScreen }}>
            <TabContext.Provider value={{ activeTab, setActiveTab }}>
              <HeroUIProvider>
                <InitUser>
                  {children}
                </InitUser>
              </HeroUIProvider>
            </TabContext.Provider>
          </SmallScreenContext.Provider>
        </SidebarContext.Provider>
      </NextUIProvider>
    </ReduxProvider>
  );
}