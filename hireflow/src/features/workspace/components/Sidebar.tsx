import { useState } from "react";
import logo from "../../../assets/images/hireflow_logo.png";
import { roleLabels, roleNav } from "../data";
import type { Role, WorkspacePage } from "../types";
import { Icon } from "./Icon";

type Props = {
  role: Role;
  page: WorkspacePage;
  setPage: (page: WorkspacePage) => void;
  setRole: (role: Role) => void;
  open: boolean;
  close: () => void;
  signOut: () => void;
};
const iconByPage: Record<string, string> = {
  Dashboard: "dashboard",
  "Find jobs": "search",
  "My jobs": "briefcase",
  "My applications": "clipboard",
  "Saved jobs": "briefcase",
  Candidates: "users",
  Interviews: "calendar",
  Users: "users",
  Analytics: "chart",
  Profile: "user",
  Notifications: "bell",
  Settings: "settings",
};

export function Sidebar({
  role,
  page,
  setPage,
  setRole,
  open,
  close,
  signOut,
}: Props) {
  const [roleMenu, setRoleMenu] = useState(false);
  const changePage = (item: WorkspacePage) => {
    setPage(item);
    close();
  };
  return (
    <>
      {open && (
        <button
          className="workspace-scrim"
          aria-label="Close navigation"
          onClick={close}
        />
      )}
      <aside className={`workspace-sidebar ${open ? "is-open" : ""}`}>
        <div className="workspace-brand">
          <img src={logo} alt="" />
          <span>hireflow</span>
          <button
            className="sidebar-close"
            onClick={close}
            aria-label="Close navigation"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-monogram">H</div>
          <span>
            <b>Hireflow workspace</b>
            <small>Free plan</small>
          </span>
          <span className="switcher-chevron">⌄</span>
        </div>
        <div className="sidebar-scroll">
          <p className="sidebar-label">WORKSPACE</p>
          <nav className="workspace-nav" aria-label="Workspace navigation">
            {roleNav[role].map((item) => (
              <button
                key={item}
                className={page === item ? "active" : ""}
                onClick={() => changePage(item)}
              >
                <Icon name={iconByPage[item]} />
                <span>{item}</span>
                {item === "My applications" && role === "RECRUITER" && (
                  <i className="nav-count">12</i>
                )}
              </button>
            ))}
          </nav>
          <p className="sidebar-label sidebar-label-lower">PERSONAL</p>
          <nav className="workspace-nav">
            {(["Profile", "Notifications", "Settings"] as WorkspacePage[]).map(
              (item) => (
                <button
                  key={item}
                  className={page === item ? "active" : ""}
                  onClick={() => changePage(item)}
                >
                  <Icon name={iconByPage[item]} />
                  <span>{item}</span>
                  {item === "Notifications" && <i className="nav-dot" />}
                </button>
              ),
            )}
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="preview-box">
            <span>PREVIEW ROLE</span>
            <button
              onClick={() => setRoleMenu(!roleMenu)}
              aria-expanded={roleMenu}
            >
              {roleLabels[role]}
              <span>⌄</span>
            </button>
            {roleMenu && (
              <div className="role-menu">
                {(["CANDIDATE", "RECRUITER", "ADMIN"] as Role[]).map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setRole(option);
                        setPage("Dashboard");
                        setRoleMenu(false);
                      }}
                    >
                      {roleLabels[option]}
                      {role === option && <span>✓</span>}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
          <button className="sidebar-signout" onClick={signOut}>
            <Icon name="logout" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
