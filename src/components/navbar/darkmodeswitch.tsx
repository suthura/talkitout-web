import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme(); // type
  return (
    <Switch
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
};
