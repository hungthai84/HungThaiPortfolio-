import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pageSequence: string[] = [
  "home",
  "coverLetter",
  "about",
  "experience",
  "education",
  "skills",
  "industries",
  "projects",
  "systems",
  "interview",
  "astrology",
  "memories",
  "wallpapers",
].filter((v, i, a) => a.indexOf(v) === i);
