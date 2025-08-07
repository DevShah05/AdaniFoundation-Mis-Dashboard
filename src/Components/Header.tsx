// src/Components/Header.tsx
import React from "react";
import adaniLogo from "../assets/adani-logo.png";

interface HeaderProps {
  subtitle?: string; // Example: "Education Vertical"
}

const Header: React.FC<HeaderProps> = ({ subtitle }) => {
  return (
    <header className="w-full bg-white shadow px-4 sm:px-6 py-3 mb-4 rounded flex items-center space-x-4">
      {/* Logo */}
      <img
        src={adaniLogo}
        alt="Adani Foundation Logo"
        className="h-10 w-auto object-contain"
      />

      {/* Label */}
      <div className="leading-tight">
        <h1 className="text-xl sm:text-2xl font-bold text-[#6B1E82]">Adani Foundation</h1>
        {subtitle && (
          <p className="text-sm text-[#6B1E82] font-semibold">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default Header;
