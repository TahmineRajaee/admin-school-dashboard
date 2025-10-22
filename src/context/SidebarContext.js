"use client";

import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpenSidebar, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
