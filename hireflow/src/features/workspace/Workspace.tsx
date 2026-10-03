import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { DashboardPage } from "./pages/DashboardPage";
import { JobsPage } from "./pages/JobsPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { OtherPages } from "./pages/OtherPages";
import type { Role, WorkspacePage, WorkspaceUser } from "./types";
import "./workspace.css";

export function Workspace({
  user,
  onSignOut,
}: {
  user: WorkspaceUser;
  onSignOut: () => void;
}) {
  const [role, setRole] = useState<Role>(user.role ?? "CANDIDATE");
  const [page, setPage] = useState<WorkspacePage>("Dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className="workspace-layout">
      <Sidebar
        role={role}
        page={page}
        setPage={setPage}
        setRole={setRole}
        open={mobileNav}
        close={() => setMobileNav(false)}
        signOut={onSignOut}
      />
      <div className="workspace-main">
        <Topbar
          user={user}
          role={role}
          page={page}
          menu={() => setMobileNav(true)}
          onPage={setPage}
        />
        {page === "Dashboard" ? (
          <DashboardPage
            role={role}
            user={user}
            onExplore={() => setPage("Find jobs")}
          />
        ) : page === "Find jobs" ||
          page === "My jobs" ||
          page === "Saved jobs" ? (
          <JobsPage role={role} savedOnly={page === "Saved jobs"} />
        ) : page === "My applications" ? (
          <ApplicationsPage role={role} />
        ) : (
          <OtherPages page={page} user={user} />
        )}
        <footer className="workspace-footer">
          <span>© 2026 Hireflow</span>
          <span>Good people. Great teams.</span>
          <span>
            <i /> All systems operational
          </span>
        </footer>
      </div>
    </div>
  );
}
