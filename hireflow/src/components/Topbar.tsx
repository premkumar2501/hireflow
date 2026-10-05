import { useState } from "react";
import type { Role, WorkspacePage, WorkspaceUser } from "../feature/types";
import { Icon } from "./Icon";
import { roleLabels } from "../feature/data";


export function Topbar({
  user,
  role,
  page,
  menu,
  onPage,
}: {
  user: WorkspaceUser;
  role: Role;
  page: WorkspacePage;
  menu: () => void;
  onPage: (page: WorkspacePage) => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <header className="workspace-topbar">
      <button
        className="mobile-menu-button"
        onClick={menu}
        aria-label="Open navigation"
      >
        <Icon name="menu" size={20} />
      </button>
      <div className="topbar-crumb">
        <span>Workspace</span>
        <Icon name="chevron" size={14} />
        <b>{page}</b>
      </div>
      <div className="topbar-tools">
        <label className="workspace-search">
          <Icon name="search" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
          />
          <kbd>⌘ K</kbd>
        </label>
        <button
          className={`topbar-icon ${noticeOpen ? "selected" : ""}`}
          onClick={() => {
            setNoticeOpen(!noticeOpen);
            setProfileOpen(false);
          }}
          aria-label="Notifications"
        >
          <Icon name="bell" size={18} />
          <i />
        </button>
        <button
          className="topbar-profile"
          onClick={() => {
            setProfileOpen(!profileOpen);
            setNoticeOpen(false);
          }}
          aria-expanded={profileOpen}
        >
          <span className="user-avatar">
            {user.username.slice(0, 1).toUpperCase()}
          </span>
          <span className="topbar-user-text">
            <b>{user.username}</b>
            <small>{roleLabels[role]}</small>
          </span>
          <span className="topbar-chevron">⌄</span>
        </button>
        {noticeOpen && (
          <div className="topbar-popover notification-popover">
            <div className="popover-heading">
              <b>Notifications</b>
              <button onClick={() => setNoticeOpen(false)}>
                Mark all read
              </button>
            </div>
            <div className="popover-notice">
              <span className="notice-dot blue" />
              <p>
                <b>Your profile is getting noticed</b>
                <small>3 recruiters viewed your profile · 2h ago</small>
              </p>
            </div>
            <div className="popover-notice">
              <span className="notice-dot green" />
              <p>
                <b>New jobs match your interests</b>
                <small>4 new product design roles · 1d ago</small>
              </p>
            </div>
            <button
              className="popover-footer"
              onClick={() => {
                onPage("Notifications");
                setNoticeOpen(false);
              }}
            >
              View all notifications <Icon name="arrow" size={14} />
            </button>
          </div>
        )}
        {profileOpen && (
          <div className="topbar-popover profile-popover">
            <div className="profile-popover-head">
              <span className="user-avatar">
                {user.username.slice(0, 1).toUpperCase()}
              </span>
              <p>
                <b>{user.username}</b>
                <small>{user.email}</small>
              </p>
            </div>
            <button
              onClick={() => {
                onPage("Profile");
                setProfileOpen(false);
              }}
            >
              <Icon name="user" size={16} /> My profile
            </button>
            <button
              onClick={() => {
                onPage("Settings");
                setProfileOpen(false);
              }}
            >
              <Icon name="settings" size={16} /> Account settings
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
