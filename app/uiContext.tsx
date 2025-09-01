import React, { createContext, ReactNode, useContext, useState } from "react";
import { StatusBarStyle } from "react-native";

type UIContextProps = {
  statusBarStyle: StatusBarStyle;
  statusBarBg: string;
  setStatusBar: (style: StatusBarStyle, bg?: string) => void;
};

const UIContext = createContext<UIContextProps>({
  statusBarStyle: "dark-content",
  statusBarBg: "transparent",
  setStatusBar: () => {},
});

export function UIProvider({ children }: { children: ReactNode }) {
  const [statusBarStyle, setStyle] = useState<StatusBarStyle>("dark-content");
  const [statusBarBg, setBg] = useState("transparent");

  const setStatusBar = (style: StatusBarStyle, bg: string = "transparent") => {
    setStyle(style);
    setBg(bg);
  };

  return (
    <UIContext.Provider value={{ statusBarStyle, statusBarBg, setStatusBar }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
