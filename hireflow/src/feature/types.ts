export type Role = "CANDIDATE" | "RECRUITER" | "ADMIN";
export type WorkspaceUser = {
  id: number;
  username: string;
  email: string;
  phoneNo: string;
  role?: Role;
};
export type WorkspacePage = "Dashboard" | "Find jobs" | "My applications" | "Saved jobs" | "My jobs" | "Candidates" | "Interviews" | "Users" | "Analytics" | "Profile" | "Notifications" | "Settings";
export type Job = { id: number; title: string; company: string; logo: string; color: string; location: string; mode: string; type: string; salary: string; posted: string; tags: string[]; featured?: boolean };

