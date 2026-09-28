import React from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className = "w-5 h-5", size }: DynamicIconProps) {
  // @ts-expect-error LucideIcons dynamic indexing
  const IconComponent = LucideIcons[name] || LucideIcons.Wrench;
  return <IconComponent className={className} size={size} />;
}
