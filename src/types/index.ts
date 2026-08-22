/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Achievement {
  name: string;
  score: number;
  icon?: string;
}

export interface ExperienceItem {
  id: string;
  category: string;
  categoryName: string;
  company: string;
  subTitle?: string;
  role: string;
  yearStart: string;
  yearEnd: string;
  time: string;
  staff: number;
  desc: string;
  tasks?: string[];
  achievements?: Achievement[];
  projects?: string[];
  photos?: string[];
  logo?: string;
  memoriesTag?: string;
  icon: string;
  color: string;
  bg: string;
  glow: string;
  pulse?: boolean;
}

export interface EducationItem {
  year: string;
  title: string;
  school: string;
  desc: string;
  icon?: string;
  color?: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface IndustryItem {
  id?: number;
  tag?: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  bg: string;
  glow: string;
  badge?: string;
  highlights?: string[];
  logos?: { name: string; url: string }[];
}

export interface MemoryItem {
  company: string;
  img: string;
  desc: string;
}

export type PageId =
  | "home"
  | "coverLetter"
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "industries"
  | "projects"
  | "systems"
  | "astrology"
  | "memories"
  | "interview"
  | "aiChat"
  | "wallpapers";

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  category: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  dueDate: string;
  status: "Active" | "In Review" | "Completed";
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  unread: boolean;
}

import { LucideIcon } from "lucide-react";

export interface TimelineEvent {
  year: string;
  company: string;
  role: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}

export interface CareerTimelineItem extends TimelineEvent {}

export interface CoreValue {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  num: string;
  gradient: string;
}

export interface Principle {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  colorClass: string;
}

export interface CoverLetterContent {
  greeting: string;
  intro: string;
  philosophy: string;
  skillsFocus: string;
  closing: string;
  signOff: string;
  signatureAlt: string;
}

export interface HeaderMetric {
  value: string;
  label: string;
  color: string;
}

export interface AudioConfiguration {
  rate: number;
  lang: string;
}

export interface ContactInformation {
  email: string;
  phone: string;
  fullName: string;
}
