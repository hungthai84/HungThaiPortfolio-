import { CaseStudy } from "./projectsData";
import { group1CaseStudies } from "./caseStudies/group1";
import { group2CaseStudies } from "./caseStudies/group2";
import { group3CaseStudies } from "./caseStudies/group3";
import { group4CaseStudies } from "./caseStudies/group4";
import { group5CaseStudies } from "./caseStudies/group5";
import { group6CaseStudies } from "./caseStudies/group6";

export const caseStudiesMap: Record<string, CaseStudy> = {
  ...group1CaseStudies,
  ...group2CaseStudies,
  ...group3CaseStudies,
  ...group4CaseStudies,
  ...group5CaseStudies,
  ...group6CaseStudies,
};
