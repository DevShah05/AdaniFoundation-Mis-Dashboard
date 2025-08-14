import type { ReactNode } from "react";
import logoDefault from "../assets/adani-logo.png";

type HeaderProps = {
  title?: string;
  icon?: ReactNode;
  logoSrc?: string;
  showDate?: boolean;
  iconColor?: string;
};

export default function Header({
  title = "Education",
  icon,
  logoSrc,
  showDate = true,
  iconColor = "#A4C639",
}: HeaderProps) {
  return (
    <header className="w-full bg-white shadow-md py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={logoSrc || logoDefault}
          alt="Adani Foundation"
          className="h-10 w-auto object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-[#007BBD] flex items-center gap-2">
          {icon ? <span style={{ color: iconColor }}>{icon}</span> : null}
          <span className="truncate">{title}</span>
        </h1>
      </div>

      {showDate && (
        <div className="hidden md:flex items-center text-gray-600 text-sm">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata",
          })}
        </div>
      )}
    </header>
  );
}
