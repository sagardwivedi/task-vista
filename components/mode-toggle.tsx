"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isChecked = theme === "dark";

  const handleChange = () => {
    setTheme(isChecked ? "light" : "dark");
  };

  return (
    <div className="flex flex-row w-full justify-center p-3 items-center gap-4">
      <p className="text-gray-500">
        <SunIcon />
      </p>
      <Switch
        checked={isChecked}
        onCheckedChange={handleChange}
        className="peer"
        id="theme"
      />
      <p className="peer-[checked]:text-white text-gray-500">
        <MoonIcon />
      </p>
    </div>
  );
}
