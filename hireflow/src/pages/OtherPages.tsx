import { useState } from "react";
import type { WorkspacePage, WorkspaceUser } from "../feature/types";
import { Icon } from "../components/Icon";
import { recentCandidates } from "../feature/data";

export function OtherPages({
  page,
  user,
}: {
  page: WorkspacePage;
  user: WorkspaceUser;
}) {
  const [message, setMessage] = useState("");
  if (page === "Profile")
    return (
      <div className="workspace-content other-content">
        <div className="page-heading">
          <div>
            <span className="eyebrow">MAKE A GOOD FIRST IMPRESSION</span>
            <h1>Your profile</h1>
            <p>A little context helps the right people find you.</p>
          </div>
          <button
            className="workspace-primary"
            onClick={() => setMessage("Your profile changes are saved.")}
          >
            Save changes
          </button>
        </div>
        <section className="panel profile-edit-panel">
          <div className="profile-cover">
            <div className="large-profile-avatar">
              {user.username.slice(0, 1).toUpperCase()}
            </div>
            <button className="cover-edit">Edit cover</button>
          </div>
          <div className="profile-edit-body">
            <div className="profile-form-section">
              <h2>Personal details</h2>
              <p>How you show up to the Hireflow community.</p>
              <div className="profile-form-grid">
                <label>
                  Full name
                  <input defaultValue={user.username} />
                </label>
                <label>
                  Email address
                  <input defaultValue={user.email} />
                </label>
                <label>
                  Phone number
                  <input defaultValue={user.phoneNo} />
                </label>
                <label>
                  Location
                  <input defaultValue="Bengaluru, India" />
                </label>
                <label className="full-field">
                  Professional headline
                  <input defaultValue="Product designer creating thoughtful digital experiences" />
                </label>
                <label className="full-field">
                  About you
                  <textarea defaultValue="I’m a product designer who loves making complex things feel simple. Currently exploring opportunities with teams building meaningful products." />
                </label>
              </div>
            </div>
            <div className="profile-form-section">
              <div className="section-title-row">
                <div>
                  <h2>Skills & strengths</h2>
                  <p>Help teams understand what you bring.</p>
                </div>
                <button
                  className="panel-link"
                  onClick={() =>
                    setMessage("Add skills from your profile editor.")
                  }
                >
                  <Icon name="plus" size={14} /> Add skill
                </button>
              </div>
              <div className="skill-tags profile-skills">
                <span>Product design</span>
                <span>Figma</span>
                <span>Design systems</span>
                <span>User research</span>
                <span>Prototyping</span>
                <span>+ Add another</span>
              </div>
            </div>
          </div>
        </section>
        {message && (
          <div className="workspace-toast">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}
      </div>
    );
  if (page === "Interviews")
    return (
      <div className="workspace-content other-content">
        <div className="page-heading">
          <div>
            <span className="eyebrow">MAKE THE CONVERSATION COUNT</span>
            <h1>Interviews</h1>
            <p>Your upcoming conversations and recent interviews.</p>
          </div>
          <button className="workspace-primary">
            <Icon name="plus" size={16} /> Schedule interview
          </button>
        </div>
        <div className="interview-date-label">UP NEXT · OCTOBER 2026</div>
        <section className="interview-list">
          {[
            {
              day: "08",
              dow: "THU",
              name: "Maya Chen",
              role: "Senior Product Designer",
              company: "Linear",
              type: "Portfolio review",
              time: "10:30 AM – 11:15 AM",
              color: "#e8c3ad",
            },
            {
              day: "09",
              dow: "FRI",
              name: "Ethan Williams",
              role: "Frontend Engineer",
              company: "Notion",
              type: "Technical interview",
              time: "2:00 PM – 3:00 PM",
              color: "#c4d8cb",
            },
            {
              day: "12",
              dow: "MON",
              name: "Sofia Patel",
              role: "Product Designer",
              company: "Webflow",
              type: "Hiring manager chat",
              time: "11:00 AM – 11:30 AM",
              color: "#d8c9e9",
            },
          ].map((row) => (
            <article className="interview-list-card" key={row.name}>
              <div className="interview-date-tile">
                <b>{row.day}</b>
                <small>{row.dow}</small>
              </div>
              <div className="interview-list-info">
                <span className="interview-kind">{row.type}</span>
                <h3>{row.name}</h3>
                <p>
                  {row.role} <span>·</span> {row.company}
                </p>
                <small>
                  <Icon name="calendar" size={14} />
                  {row.time}
                </small>
              </div>
              <div className="interview-list-actions">
                <span className="status-pill blue">Scheduled</span>
                <button className="workspace-secondary">View details</button>
              </div>
            </article>
          ))}
        </section>
        <div className="interview-prep panel">
          <span>
            <Icon name="sparkle" />
          </span>
          <div>
            <b>A little prep goes a long way.</b>
            <p>
              Review the role, revisit your notes, and bring your questions.
            </p>
          </div>
          <button className="panel-link">
            Interview tips <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>
    );
  if (page === "Notifications")
    return (
      <div className="workspace-content other-content">
        <div className="page-heading">
          <div>
            <span className="eyebrow">A FEW THINGS TO KNOW</span>
            <h1>Notifications</h1>
            <p>The little updates that help you keep things moving.</p>
          </div>
          <button
            className="panel-link"
            onClick={() => setMessage("Everything is marked as read.")}
          >
            Mark all as read
          </button>
        </div>
        <div className="notification-filter">
          <button className="active">
            All <span>6</span>
          </button>
          <button>
            Unread <span>3</span>
          </button>
        </div>
        <section className="panel notifications-list">
          {[
            {
              icon: "briefcase",
              tone: "blue",
              title: "A role you saved is still open",
              body: "Senior Product Designer at Linear is accepting applications.",
              time: "2 hours ago",
              unread: true,
            },
            {
              icon: "calendar",
              tone: "purple",
              title: "Your interview is coming up",
              body: "Portfolio conversation with Linear · Thursday, Oct 08 at 10:30 AM.",
              time: "Yesterday",
              unread: true,
            },
            {
              icon: "users",
              tone: "cyan",
              title: "Your profile is getting noticed",
              body: "3 recruiters viewed your profile this week. Nice work!",
              time: "Yesterday",
              unread: true,
            },
            {
              icon: "sparkle",
              tone: "gold",
              title: "New roles picked for you",
              body: "We found 4 new product design roles that match your interests.",
              time: "Sep 30",
              unread: false,
            },
            {
              icon: "clipboard",
              tone: "green",
              title: "Application update from Notion",
              body: "Your application is now being reviewed by the team.",
              time: "Sep 28",
              unread: false,
            },
          ].map((item) => (
            <article
              className={`notification-row ${item.unread ? "unread" : ""}`}
              key={item.title}
            >
              <span className={`notification-symbol ${item.tone}`}>
                <Icon name={item.icon} size={17} />
              </span>
              <div>
                <b>{item.title}</b>
                <p>{item.body}</p>
                <small>{item.time}</small>
              </div>
              {item.unread && <i />}
            </article>
          ))}
        </section>
        {message && (
          <div className="workspace-toast">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}
      </div>
    );
  if (page === "Settings")
    return (
      <div className="workspace-content other-content">
        <div className="page-heading">
          <div>
            <span className="eyebrow">MAKE IT YOURS</span>
            <h1>Settings</h1>
            <p>Set up Hireflow to work the way you do.</p>
          </div>
        </div>
        <div className="settings-layout">
          <nav className="settings-nav">
            <button className="active">
              <Icon name="user" size={16} /> Account
            </button>
            <button>
              <Icon name="bell" size={16} /> Notifications
            </button>
            <button>
              <Icon name="settings" size={16} /> Security
            </button>
          </nav>
          <div className="settings-sections">
            <section className="panel settings-card">
              <h2>Account preferences</h2>
              <p>Manage your account details and how you use Hireflow.</p>
              <label className="settings-field">
                Language
                <select defaultValue="English (US)">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                </select>
              </label>
              <label className="settings-field">
                Time zone
                <select defaultValue="India Standard Time (IST)">
                  <option>India Standard Time (IST)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                </select>
              </label>
            </section>
            <section className="panel settings-card">
              <h2>Email notifications</h2>
              <p>Choose the updates you’d like to hear about.</p>
              {[
                {
                  title: "Application updates",
                  body: "When something changes with an application.",
                },
                {
                  title: "Interview reminders",
                  body: "A helpful nudge before an upcoming conversation.",
                },
                {
                  title: "New job matches",
                  body: "Roles that line up with your interests.",
                },
              ].map((item, index) => (
                <label className="toggle-row" key={item.title}>
                  <span>
                    <b>{item.title}</b>
                    <small>{item.body}</small>
                  </span>
                  <input type="checkbox" defaultChecked={index !== 2} />
                  <i />
                </label>
              ))}
            </section>
            <button
              className="workspace-primary"
              onClick={() => setMessage("Your preferences have been saved.")}
            >
              Save preferences
            </button>
            {message && <span className="saved-note">{message}</span>}
          </div>
        </div>
      </div>
    );
  if (page === "Users")
    return (
      <div className="workspace-content other-content">
        <div className="page-heading">
          <div>
            <span className="eyebrow">YOUR HIRFLOW COMMUNITY</span>
            <h1>People & access</h1>
            <p>Keep an eye on the people making Hireflow what it is.</p>
          </div>
          <button className="workspace-primary">
            <Icon name="plus" size={16} /> Invite a teammate
          </button>
        </div>
        <div className="metric-grid">
          <article className="metric-card">
            <small>Total users</small>
            <strong>2,846</strong>
            <span className="metric-period">↑ 14% this month</span>
          </article>
          <article className="metric-card">
            <small>Recruiters</small>
            <strong>384</strong>
            <span className="metric-period">↑ 9% this month</span>
          </article>
          <article className="metric-card">
            <small>Candidates</small>
            <strong>2,462</strong>
            <span className="metric-period">↑ 16% this month</span>
          </article>
          <article className="metric-card">
            <small>Awaiting review</small>
            <strong>08</strong>
            <span className="metric-period">3 need attention</span>
          </article>
        </div>
        <section className="panel applications-panel">
          <div className="application-toolbar">
            <label className="jobs-search">
              <Icon name="search" size={16} />
              <input placeholder="Search people" />
            </label>
            <button className="filter-button">
              <Icon name="filter" size={16} /> Filters
            </button>
          </div>
          <div className="applications-table-wrap">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>PERSON</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>JOINED</th>
                  <th>LAST ACTIVE</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {recentCandidates.map((person, index) => (
                  <tr key={person.name}>
                    <td>
                      <div className="table-person">
                        <span
                          className="person-avatar"
                          style={{ background: person.color }}
                        >
                          {person.initials}
                        </span>
                        <span>
                          <b>{person.name}</b>
                          <small>
                            {person.name.toLowerCase().replace(" ", ".")}
                            @example.com
                          </small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="status-pill blue">
                        {index === 0 ? "Recruiter" : "Candidate"}
                      </span>
                    </td>
                    <td>
                      <span className="status-pill green">Active</span>
                    </td>
                    <td>
                      <span className="table-secondary">
                        Sep {28 - index * 3}, 2026
                      </span>
                    </td>
                    <td>
                      <span className="table-secondary">{person.time}</span>
                    </td>
                    <td>
                      <button className="table-more">
                        <Icon name="more" size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  return (
    <div className="workspace-content other-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE BIGGER PICTURE</span>
          <h1>Hiring analytics</h1>
          <p>Make thoughtful decisions with a clearer view of the process.</p>
        </div>
        <button className="workspace-secondary">
          <Icon name="download" size={15} /> Export report
        </button>
      </div>
      <section className="analytics-highlight">
        <div>
          <span>HIRES THIS MONTH</span>
          <strong>126</strong>
          <p>
            ↑ 18.4% <small>compared with last month</small>
          </p>
        </div>
        <div className="analytics-bars">
          {[32, 48, 38, 62, 53, 72, 61, 84, 73, 95, 79, 100].map(
            (height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ),
          )}
        </div>
      </section>
      <div className="metric-grid">
        <article className="metric-card">
          <small>Time to hire</small>
          <strong>
            24 <i>days</i>
          </strong>
          <span className="metric-period">↓ 3 days from last month</span>
        </article>
        <article className="metric-card">
          <small>Offer acceptance</small>
          <strong>86%</strong>
          <span className="metric-period">↑ 4.2% from last month</span>
        </article>
        <article className="metric-card">
          <small>Active jobs</small>
          <strong>384</strong>
          <span className="metric-period">Across 12 departments</span>
        </article>
        <article className="metric-card">
          <small>Candidate satisfaction</small>
          <strong>
            4.8 <i>/ 5</i>
          </strong>
          <span className="metric-period">From 284 responses</span>
        </article>
      </div>
      <section className="panel analytics-insight">
        <span className="metric-icon cyan">
          <Icon name="sparkle" />
        </span>
        <div>
          <b>Product & Design is moving quickly.</b>
          <p>
            That team’s average time to hire is 18 days, 25% faster than the
            platform average.
          </p>
        </div>
        <button className="panel-link">
          Explore report <Icon name="arrow" size={14} />
        </button>
      </section>
    </div>
  );
}
