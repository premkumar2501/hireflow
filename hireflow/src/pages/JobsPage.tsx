import { useMemo, useState } from "react";
import type { Role } from "../feature/types";
import { jobs } from "../feature/data";
import { Icon } from "../components/Icon";


export function JobsPage({
  role,
  savedOnly = false,
}: {
  role: Role;
  savedOnly?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("All work modes");
  const [saved, setSaved] = useState<number[]>([3]);
  const [applied, setApplied] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const filtered = useMemo(
    () =>
      jobs.filter(
        (job) =>
          `${job.title} ${job.company} ${job.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (mode === "All work modes" || job.mode === mode) &&
          (!savedOnly || saved.includes(job.id)),
      ),
    [query, mode, savedOnly, saved],
  );
  const save = (id: number) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  return (
    <div className="workspace-content jobs-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {role === "CANDIDATE"
              ? "YOUR NEXT CHAPTER"
              : role === "RECRUITER"
                ? "TALENT, MEET OPPORTUNITY"
                : "PLATFORM MANAGEMENT"}
          </span>
          <h1>
            {role === "CANDIDATE"
              ? "Find your next role."
              : role === "RECRUITER"
                ? "Your open roles."
                : "All open positions."}
          </h1>
          <p>
            {role === "CANDIDATE"
              ? "Thoughtful opportunities, picked for people like you."
              : "Manage open positions and discover great talent."}
          </p>
        </div>
        {role !== "CANDIDATE" && (
          <button className="workspace-primary">
            <Icon name="plus" size={16} /> Create a job
          </button>
        )}
      </div>
      <section className="jobs-banner">
        <div>
          <span className="banner-kicker">
            <Icon name="sparkle" size={15} /> CURATED FOR YOU
          </span>
          <h2>
            Good work starts
            <br />
            with a good fit.
          </h2>
          <p>Explore opportunities from teams building what’s next.</p>
        </div>
        <div className="banner-orbit">
          <span>✳</span>
          <i />
          <b />
        </div>
      </section>
      <div className="jobs-toolbar">
        <label className="jobs-search">
          <Icon name="search" size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, company, or keyword"
          />
        </label>
        <label className="filter-select">
          <Icon name="filter" size={16} />
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>All work modes</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>On-site</option>
          </select>
        </label>
        <button className="filter-button">
          <Icon name="filter" size={16} /> More filters
        </button>
        <span className="job-result-count">{filtered.length} roles</span>
      </div>
      <div className="job-results">
        <div className="job-list">
          {filtered.map((job) => (
            <article className="job-card" key={job.id}>
              <div className="job-card-head">
                <span
                  className="company-logo large"
                  style={{ background: job.color }}
                >
                  {job.logo}
                </span>
                <div className="job-card-title">
                  <div className="job-title-row">
                    <h2>{job.title}</h2>
                    {job.featured && (
                      <span className="featured-tag">Featured</span>
                    )}
                  </div>
                  <p>
                    {job.company}
                    <span>·</span>
                    {job.location}
                  </p>
                </div>
                <button
                  className={`save-job ${saved.includes(job.id) ? "is-saved" : ""}`}
                  onClick={() => save(job.id)}
                  aria-label={
                    saved.includes(job.id) ? "Remove saved job" : "Save job"
                  }
                >
                  {saved.includes(job.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="job-meta">
                <span>{job.type}</span>
                <span>{job.mode}</span>
                <span>{job.salary}</span>
                <small>{job.posted}</small>
              </div>
              <div className="job-card-foot">
                <div className="skill-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button
                  className="job-apply"
                  onClick={() => {
                    setApplied((current) =>
                      current.includes(job.id) ? current : [...current, job.id],
                    );
                    setToast(`Application started for ${job.title}`);
                  }}
                >
                  {applied.includes(job.id) ? "Applied" : "View role"}
                  <Icon name="arrow" size={14} />
                </button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <span>
                <Icon name="search" size={23} />
              </span>
              <h3>No roles found</h3>
              <p>Try another title, skill, or work mode.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setMode("All work modes");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <aside className="jobs-aside">
          <section className="panel alert-panel">
            <span className="alert-icon">
              <Icon name="bell" size={17} />
            </span>
            <h3>Good things find you.</h3>
            <p>
              Get new roles like these in your inbox, as soon as they’re posted.
            </p>
            <label>
              Email address
              <input placeholder="you@example.com" />
            </label>
            <button onClick={() => setToast("Job alerts are ready to set up")}>
              Create a job alert <Icon name="arrow" size={14} />
            </button>
          </section>
          <section className="jobs-aside-tip">
            <span>✳</span>
            <p>
              <b>Your profile is your first hello.</b> Keep your skills up to
              date so the right teams can find you.
            </p>
          </section>
        </aside>
      </div>
      {toast && (
        <div className="workspace-toast" role="status">
          {toast}
          <button onClick={() => setToast("")}>×</button>
        </div>
      )}
    </div>
  );
}
