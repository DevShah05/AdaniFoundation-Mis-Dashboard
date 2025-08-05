import React from "react";
import adaniLogo from "../assets/adani-logo.png";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex items-center justify-between bg-white shadow px-4 sm:px-6 py-4 mb-6 rounded">
      <div className="flex items-center space-x-4">
        <img
          src={adaniLogo}
          alt="Adani Foundation"
          className="h-10 w-auto max-h-10 object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-semibold text-[#6B1E82] truncate max-w-[80vw]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
