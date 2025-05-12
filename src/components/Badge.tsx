"use client";

import type React from "react";
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function Badge({
  children,
  className = "",
  onClick,
  active = false,
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  const defaultClasses =
    "bg-gray-700 text-white hover:bg-gray-700";
  const activeClasses = "bg-blue-500 text-white bg-blue-600";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:bg-gray-200 hover:bg-gray-600"
    : "";

  return (
    <span
      className={`${baseClasses} ${
        active ? activeClasses : defaultClasses
      } ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
