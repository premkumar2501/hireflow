import type { Job, Role, WorkspacePage } from "./types";

export const roleLabels: Record<Role, string> = { CANDIDATE: "Candidate", RECRUITER: "Recruiter", ADMIN: "Admin" };
export const roleNav: Record<Role, WorkspacePage[]> = {
  CANDIDATE: ["Dashboard", "Find jobs", "My applications", "Saved jobs"],
  RECRUITER: ["Dashboard", "My jobs", "My applications", "Candidates", "Interviews"],
  ADMIN: ["Dashboard", "Users", "My jobs", "My applications", "Analytics"],
};
export const jobs: Job[] = [
  { id: 1, title: "Senior Product Designer", company: "Linear", logo: "L", color: "#625bf6", location: "Remote · US / Canada", mode: "Remote", type: "Full-time", salary: "$140k–$180k", posted: "2 days ago", tags: ["Product design", "Figma", "SaaS"], featured: true },
  { id: 2, title: "Frontend Engineer, Growth", company: "Notion", logo: "N", color: "#272923", location: "San Francisco, CA", mode: "Hybrid", type: "Full-time", salary: "$150k–$210k", posted: "1 day ago", tags: ["React", "TypeScript", "Growth"], featured: true },
  { id: 3, title: "Product Marketing Manager", company: "Webflow", logo: "W", color: "#4258e8", location: "Remote · North America", mode: "Remote", type: "Full-time", salary: "$120k–$155k", posted: "3 days ago", tags: ["Marketing", "B2B", "Product" ] },
  { id: 4, title: "Software Engineer, Platform", company: "Figma", logo: "F", color: "#8a57dc", location: "New York, NY", mode: "Hybrid", type: "Full-time", salary: "$165k–$220k", posted: "5 days ago", tags: ["Python", "Distributed systems", "AWS"] },
];
export const applications = [
  { title: "Product Designer", company: "Linear", logo: "L", color: "#625bf6", date: "Oct 01, 2026", stage: "Interview", tone: "purple", next: "Portfolio review · Oct 08" },
  { title: "UX Designer, Growth", company: "Notion", logo: "N", color: "#272923", date: "Sep 28, 2026", stage: "In review", tone: "blue", next: "The team is reviewing your application" },
  { title: "Product Designer", company: "Vercel", logo: "▲", color: "#20211e", date: "Sep 24, 2026", stage: "Applied", tone: "gray", next: "Application sent successfully" },
];
export const recentCandidates = [
  { name: "Maya Chen", role: "Senior Product Designer", initials: "MC", color: "#e8c3ad", time: "12 min ago", stage: "New applicant" },
  { name: "Ethan Williams", role: "Frontend Engineer", initials: "EW", color: "#c4d8cb", time: "48 min ago", stage: "Screening" },
  { name: "Sofia Patel", role: "Product Designer", initials: "SP", color: "#d8c9e9", time: "2 hours ago", stage: "Shortlisted" },
  { name: "Noah Kim", role: "Product Marketing Manager", initials: "NK", color: "#e7dba9", time: "Yesterday", stage: "Interview" },
];
