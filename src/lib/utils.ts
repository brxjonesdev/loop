import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Goal } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  export function getCardClass(color: Goal["color"]) {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-500/10 border-red-500/50",
      blue: "bg-blue-500/10 border-blue-500/50",
      green: "bg-green-500/10 border-green-500/50",
      yellow: "bg-yellow-500/10 border-yellow-500/50",
      orange: "bg-orange-500/10 border-orange-500/50",
      purple: "bg-purple-500/10 border-purple-500/50",
      pink: "bg-pink-500/10 border-pink-500/50",
    };
    return colorMap[color] || "";
  }

  export function getButtonClass(color: Goal["color"]) {
    const colorMap: { [key: string]: string } = {
      red: "text-red-500 border-red-500 hover:bg-red-500/10",
      blue: "text-blue-500 border-blue-500 hover:bg-blue-500/10",
      green: "text-green-500 border-green-500 hover:bg-green-500/10",
      yellow: "text-yellow-500 border-yellow-500 hover:bg-yellow-500/10",
      orange: "text-orange-500 border-orange-500 hover:bg-orange-500/10",
      purple: "text-purple-500 border-purple-500 hover:bg-purple-500/10",
      pink: "text-pink-500 border-pink-500 hover:bg-pink-500/10",
    };
    return colorMap[color] || "";
  }

export function getDotClass(color: Goal["color"]) {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-500/10 border-red-500/50",
      blue: "bg-blue-500/10 border-blue-500/50",
      green: "bg-green-500/10 border-green-500/50",
      yellow: "bg-yellow-500/10 border-yellow-500/50",
      orange: "bg-orange-500/10 border-orange-500/50",
      purple: "bg-purple-500/10 border-purple-500/50",
      pink: "bg-pink-500/10 border-pink-500/50",
    };
    return colorMap[color] || "";
  }