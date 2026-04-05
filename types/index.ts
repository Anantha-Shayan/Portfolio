// types/index.ts
// Re-exports all shared types from the data layer so components
// can import from a single path: import type { Project } from "@/types"

export type {
  SkillGroup,
  ProjectCategory,
  Project,
  Experience,
  Education,
} from "@/data/profile";
