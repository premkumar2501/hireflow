import { useState } from "react";
import { applications, recentCandidates } from "../feature/data";
import type { Role } from "../feature/types";
import { Icon } from "../components/Icon";


export function ApplicationsPage({ role }: { role: Role }) {
  const [view, setView] = useState("List view");
  const [filter, setFilter] = useState("All statuses");
  const recruiter = role !== "CANDIDATE";
  const rows = recruiter
    ? recentCandidates.map((item, index) => ({
        title: item.name,
        subtitle: item.role,
        logo: item.initials,
        color: item.color,
        date: ["Oct 02, 2026", "Oct 01, 2026", "Sep 30, 2026", "Sep 29, 2026"][
          index
        ],
        stage: item.stage,
        tone: ["blue", "gray", "purple", "green"][index],
      }))
    : applications.map((item) => ({
        title: item.title,
        subtitle: item.company,
        logo: item.logo,
        color: item.color,
        date: item.date,
        stage: item.stage,
        tone: item.tone,
      }));
  const visible =
    filter === "All statuses"
      ? rows
      : rows.filter((row) =>
          row.stage.toLowerCase().includes(filter.toLowerCase()),
        );
  return (
    <div className="workspace-content applications-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {recruiter ? "YOUR TALENT PIPELINE" : "KEEP THE MOMENTUM"}
          </span>
          <h1>{recruiter ? "Applications" : "My applications"}</h1>
          <p>
            {recruiter
              ? "Every promising connection, all in one place."
              : "A clear view of where every opportunity stands."}
          </p>
        </div>
        {recruiter && (
          <button className="workspace-secondary">
            <Icon name="download" size={15} /> Export
          </button>
        )}
      </div>
      <div className="application-summary">
        {(recruiter
          ? [
              { label: "All applicants", value: "126", tone: "blue" },
              { label: "New this week", value: "18", tone: "cyan" },
              { label: "In interviews", value: "12", tone: "violet" },
              { label: "Offers sent", value: "04", tone: "gold" },
            ]
          : [
              { label: "Total applications", value: "12", tone: "blue" },
              { label: "In review", value: "05", tone: "cyan" },
              { label: "Interviews", value: "03", tone: "violet" },
              { label: "Offers", value: "01", tone: "gold" },
            ]
        ).map((item) => (
          <article key={item.label}>
            <small>{item.label}</small>
            <b>{item.value}</b>
            <span className={`summary-dot ${item.tone}`} />
          </article>
        ))}
      </div>
      <section className="panel applications-panel">
        <div className="application-toolbar">
          <div className="view-tabs">
            <button
              className={view === "List view" ? "active" : ""}
              onClick={() => setView("List view")}
            >
              <Icon name="clipboard" size={15} /> List view
            </button>
            {recruiter && (
              <button
                className={view === "Pipeline" ? "active" : ""}
                onClick={() => setView("Pipeline")}
              >
                <Icon name="dashboard" size={15} /> Pipeline
              </button>
            )}
          </div>
          <div className="application-filters">
            <label className="filter-select">
              <Icon name="filter" size={15} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All statuses</option>
                <option>Interview</option>
                <option>Applied</option>
                <option>Screening</option>
                <option>Shortlisted</option>
              </select>
            </label>
            <button className="filter-button">
              <Icon name="search" size={16} /> Search
            </button>
          </div>
        </div>
        {view === "Pipeline" && recruiter ? (
          <div className="pipeline-board">
            {["New applicant", "Screening", "Shortlisted", "Interview"].map(
              (stage, stageIndex) => (
                <section className="pipeline-column" key={stage}>
                  <div className="pipeline-heading">
                    <b>{stage}</b>
                    <span>{[12, 8, 6, 4][stageIndex]}</span>
                  </div>
                  {recentCandidates
                    .slice(stageIndex % 2, (stageIndex % 2) + 2)
                    .map((item) => (
                      <article className="pipeline-card" key={item.name}>
                        <div className="pipeline-person">
                          <span
                            className="person-avatar"
                            style={{ background: item.color }}
                          >
                            {item.initials}
                          </span>
                          <button>
                            <Icon name="more" size={16} />
                          </button>
                        </div>
                        <b>{item.name}</b>
                        <small>{item.role}</small>
                        <div className="skill-tags">
                          <span>Product</span>
                          <span>Figma</span>
                        </div>
                        <div className="pipeline-card-foot">
                          <span>↗ {item.time}</span>
                          <span>⋯</span>
                        </div>
                      </article>
                    ))}
                </section>
              ),
            )}
          </div>
        ) : (
          <div className="applications-table-wrap">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>{recruiter ? "CANDIDATE" : "ROLE"}</th>
                  {recruiter && <th>POSITION</th>}
                  <th>APPLIED</th>
                  <th>STATUS</th>
                  <th>NEXT STEP</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible.map((row, index) => (
                  <tr key={row.title}>
                    <td>
                      <div className="table-person">
                        <span
                          className={
                            recruiter ? "person-avatar" : "company-logo"
                          }
                          style={{ background: row.color }}
                        >
                          {row.logo}
                        </span>
                        <span>
                          <b>{row.title}</b>
                          <small>{row.subtitle}</small>
                        </span>
                      </div>
                    </td>
                    {recruiter && (
                      <td>
                        <span className="table-secondary">
                          {
                            [
                              "Product Designer",
                              "Frontend Engineer",
                              "Product Designer",
                              "Marketing Manager",
                            ][index % 4]
                          }
                        </span>
                      </td>
                    )}
                    <td>
                      <span className="table-secondary">{row.date}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${row.tone}`}>
                        {row.stage}
                      </span>
                    </td>
                    <td>
                      <span className="table-secondary">
                        {recruiter
                          ? [
                              "Review portfolio",
                              "Schedule screen",
                              "Review feedback",
                              "Share next steps",
                            ][index % 4]
                          : applications[index % applications.length].next}
                      </span>
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
            {visible.length === 0 && (
              <div className="empty-state compact">
                <p>No applications match this status.</p>
              </div>
            )}
          </div>
        )}
        <div className="table-pagination">
          <span>
            Showing{" "}
            <b>
              {visible.length ? 1 : 0}–{visible.length}
            </b>{" "}
            of <b>{recruiter ? 126 : 12}</b>
          </span>
          <div>
            <button disabled>Previous</button>
            <button>
              Next <Icon name="chevron" size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
