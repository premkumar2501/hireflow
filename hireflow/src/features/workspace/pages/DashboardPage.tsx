import { useState } from "react";
import { applications, recentCandidates } from "../data";
import type { Role, WorkspaceUser } from "../types";
import { Icon } from "../components/Icon";

function Metric({
  label,
  value,
  change,
  icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}) {
  return (
    <article className="metric-card">
      <span className={`metric-icon ${color}`}>
        <Icon name={icon} size={17} />
      </span>
      <span className="metric-change">↗ {change}</span>
      <small>{label}</small>
      <strong>{value}</strong>
      <span className="metric-period">vs. last month</span>
    </article>
  );
}

function ActivityChart() {
  const [range, setRange] = useState("Last 7 days");
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Application activity</h2>
          <p>Keep an eye on your progress</p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Chart date range"
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="chart-legend">
        <span>
          <i className="legend-blue" />
          Applications
        </span>
        <span>
          <i className="legend-cyan" />
          Profile views
        </span>
      </div>
      <div className="line-chart">
        <div className="chart-y-labels">
          <span>60</span>
          <span>45</span>
          <span>30</span>
          <span>15</span>
          <span>0</span>
        </div>
        <svg
          viewBox="0 0 700 210"
          preserveAspectRatio="none"
          aria-label="Applications and profile views chart"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2f5fd6" stopOpacity=".14" />
              <stop offset="100%" stopColor="#2f5fd6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="chart-grid"
            d="M0 15H700M0 58H700M0 101H700M0 144H700M0 187H700"
          />
          <path
            className="chart-area"
            d="M0 157 C40 150 48 129 92 138 S145 105 190 116 S241 130 280 100 S331 102 376 87 S425 102 466 69 S523 86 558 56 S622 66 650 31 S682 51 700 20 L700 190 L0 190Z"
          />
          <path
            className="chart-line blue-line"
            d="M0 157 C40 150 48 129 92 138 S145 105 190 116 S241 130 280 100 S331 102 376 87 S425 102 466 69 S523 86 558 56 S622 66 650 31 S682 51 700 20"
          />
          <path
            className="chart-line cyan-line"
            d="M0 171 C42 166 52 151 92 157 S149 141 190 147 S242 153 280 131 S337 140 376 118 S424 127 466 111 S520 122 558 91 S613 108 650 75 S677 87 700 62"
          />
        </svg>
        <div className="chart-x-labels">
          <span>Sep 25</span>
          <span>Sep 26</span>
          <span>Sep 27</span>
          <span>Sep 28</span>
          <span>Sep 29</span>
          <span>Sep 30</span>
          <span>Oct 01</span>
        </div>
      </div>
    </section>
  );
}

function CandidateDashboard({
  user,
  onExplore,
}: {
  user: WorkspaceUser;
  onExplore: () => void;
}) {
  return (
    <>
      <div className="workspace-welcome">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> SATURDAY, OCTOBER 3, 2026
          </div>
          <h1>
            Good morning, {user.username.split(" ")[0]} <span>✳</span>
          </h1>
          <p>Your next opportunity could be one click away.</p>
        </div>
        <button className="workspace-primary" onClick={onExplore}>
          <Icon name="search" size={16} /> Explore jobs
        </button>
      </div>
      <div className="metric-grid">
        <Metric
          label="Applications sent"
          value="12"
          change="18%"
          icon="clipboard"
          color="blue"
        />
        <Metric
          label="Profile views"
          value="48"
          change="12%"
          icon="users"
          color="cyan"
        />
        <Metric
          label="Interviews"
          value="03"
          change="2 new"
          icon="calendar"
          color="violet"
        />
        <Metric
          label="Saved jobs"
          value="08"
          change="3 new"
          icon="briefcase"
          color="gold"
        />
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main-column">
          <ActivityChart />
          <RecentApplications />
        </div>
        <aside className="dashboard-side-column">
          <ProfileStrength />
          <UpcomingInterview />
          <WeeklyTip />
        </aside>
      </div>
    </>
  );
}

function RecruiterDashboard() {
  return (
    <>
      <div className="workspace-welcome">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> TEAM OVERVIEW
          </div>
          <h1>Your hiring, at a glance.</h1>
          <p>Here’s what’s happening across your open roles.</p>
        </div>
        <button className="workspace-primary">
          <Icon name="plus" size={17} /> Create a job
        </button>
      </div>
      <div className="metric-grid">
        <Metric
          label="Active jobs"
          value="08"
          change="2 this month"
          icon="briefcase"
          color="blue"
        />
        <Metric
          label="Applications"
          value="126"
          change="24%"
          icon="clipboard"
          color="cyan"
        />
        <Metric
          label="New this week"
          value="18"
          change="8 today"
          icon="users"
          color="violet"
        />
        <Metric
          label="Interviews"
          value="12"
          change="4 upcoming"
          icon="calendar"
          color="gold"
        />
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main-column">
          <ActivityChart />
          <RecentCandidates />
        </div>
        <aside className="dashboard-side-column">
          <HiringFunnel />
          <UpcomingInterview />
          <WeeklyTip />
        </aside>
      </div>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="workspace-welcome">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> PLATFORM OVERVIEW
          </div>
          <h1>Everything is in flow.</h1>
          <p>Here’s how your Hireflow community is growing.</p>
        </div>
        <button className="workspace-secondary">
          <Icon name="download" size={15} /> Export report
        </button>
      </div>
      <div className="metric-grid">
        <Metric
          label="Total users"
          value="2,846"
          change="14%"
          icon="users"
          color="blue"
        />
        <Metric
          label="Active jobs"
          value="384"
          change="9%"
          icon="briefcase"
          color="cyan"
        />
        <Metric
          label="Applications"
          value="8,429"
          change="22%"
          icon="clipboard"
          color="violet"
        />
        <Metric
          label="Hires this month"
          value="126"
          change="18%"
          icon="chart"
          color="gold"
        />
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main-column">
          <ActivityChart />
          <RecentCandidates admin />
        </div>
        <aside className="dashboard-side-column">
          <HiringFunnel />
          <PlatformHealth />
          <WeeklyTip />
        </aside>
      </div>
    </>
  );
}

function RecentApplications() {
  return (
    <section className="panel data-panel">
      <div className="panel-heading">
        <div>
          <h2>Recent applications</h2>
          <p>Stay up to date on your journey</p>
        </div>
        <button className="panel-link">
          View all <Icon name="arrow" size={14} />
        </button>
      </div>
      <div className="recent-list">
        {applications.map((item) => (
          <article className="recent-row" key={item.company}>
            <span className="company-logo" style={{ background: item.color }}>
              {item.logo}
            </span>
            <span className="recent-info">
              <b>{item.title}</b>
              <small>
                {item.company} · Applied {item.date}
              </small>
            </span>
            <span className={`status-pill ${item.tone}`}>{item.stage}</span>
            <Icon name="more" size={18} />
          </article>
        ))}
      </div>
    </section>
  );
}
function RecentCandidates({ admin = false }: { admin?: boolean }) {
  return (
    <section className="panel data-panel">
      <div className="panel-heading">
        <div>
          <h2>{admin ? "Recent platform activity" : "Recent applicants"}</h2>
          <p>
            {admin
              ? "A pulse on the Hireflow community"
              : "The latest people to join your pipeline"}
          </p>
        </div>
        <button className="panel-link">
          View all <Icon name="arrow" size={14} />
        </button>
      </div>
      <div className="recent-list">
        {recentCandidates.map((item) => (
          <article className="recent-row candidate-row" key={item.name}>
            <span className="person-avatar" style={{ background: item.color }}>
              {item.initials}
            </span>
            <span className="recent-info">
              <b>{item.name}</b>
              <small>
                {admin ? "Joined Hireflow" : item.role} · {item.time}
              </small>
            </span>
            <span className="status-pill blue">
              {admin ? "New user" : item.stage}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
function ProfileStrength() {
  return (
    <section className="panel strength-panel">
      <div className="panel-heading">
        <div>
          <h2>Profile strength</h2>
          <p>A little more can go a long way</p>
        </div>
        <span className="strength-score">72%</span>
      </div>
      <div className="progress-track">
        <span style={{ width: "72%" }} />
      </div>
      <div className="strength-todo">
        <span className="todo-check">✓</span>
        <span>Contact details</span>
        <span className="todo-check">✓</span>
        <span>Work experience</span>
        <span className="todo-pending">○</span>
        <span>Add a profile photo</span>
      </div>
      <button className="panel-link">
        Complete your profile <Icon name="arrow" size={14} />
      </button>
    </section>
  );
}
function UpcomingInterview() {
  return (
    <section className="panel interview-panel">
      <div className="panel-heading">
        <div>
          <h2>Coming up</h2>
          <p>Your next interview</p>
        </div>
        <span className="interview-calendar">
          <b>08</b>
          <small>OCT</small>
        </span>
      </div>
      <b className="interview-title">Portfolio conversation</b>
      <span className="interview-company">
        Linear · Senior Product Designer
      </span>
      <div className="interview-meta">
        <span>
          <Icon name="calendar" size={14} /> Thu, Oct 08
        </span>
        <span>
          <span className="tiny-dot" /> 10:30 AM
        </span>
      </div>
      <div className="interview-people">
        <span className="person-avatar tiny" style={{ background: "#e8c3ad" }}>
          JL
        </span>
        <span className="person-avatar tiny" style={{ background: "#c4d8cb" }}>
          AK
        </span>
        <small>with Jordan + 1</small>
      </div>
      <button className="interview-button">
        View details <Icon name="arrow" size={14} />
      </button>
    </section>
  );
}
function HiringFunnel() {
  return (
    <section className="panel funnel-panel">
      <div className="panel-heading">
        <div>
          <h2>Hiring funnel</h2>
          <p>Applicants by stage</p>
        </div>
        <button className="kebab">
          <Icon name="more" />
        </button>
      </div>
      <div className="funnel">
        <div>
          <span style={{ width: "100%" }} />
          <b>
            126 <small>Applied</small>
          </b>
        </div>
        <div>
          <span style={{ width: "78%" }} />
          <b>
            82 <small>Screening</small>
          </b>
        </div>
        <div>
          <span style={{ width: "54%" }} />
          <b>
            48 <small>Interview</small>
          </b>
        </div>
        <div>
          <span style={{ width: "31%" }} />
          <b>
            24 <small>Offer</small>
          </b>
        </div>
        <div>
          <span style={{ width: "18%" }} />
          <b>
            12 <small>Hired</small>
          </b>
        </div>
      </div>
    </section>
  );
}
function PlatformHealth() {
  return (
    <section className="panel health-panel">
      <div className="panel-heading">
        <div>
          <h2>Platform health</h2>
          <p>All systems looking good</p>
        </div>
        <span className="health-status">● Live</span>
      </div>
      <div className="health-stat">
        <span>Verification rate</span>
        <b>94.8%</b>
      </div>
      <div className="health-stat">
        <span>Jobs awaiting review</span>
        <b>08</b>
      </div>
      <div className="health-stat">
        <span>Support requests</span>
        <b>03</b>
      </div>
    </section>
  );
}
function WeeklyTip() {
  return (
    <section className="weekly-tip">
      <span>
        <Icon name="sparkle" size={17} />
      </span>
      <div>
        <b>A little profile polish</b>
        <p>Profiles with a photo get 2× more recruiter views.</p>
      </div>
      <Icon name="chevron" size={16} />
    </section>
  );
}

export function DashboardPage({
  role,
  user,
  onExplore,
}: {
  role: Role;
  user: WorkspaceUser;
  onExplore: () => void;
}) {
  return (
    <div className="workspace-content dashboard-content">
      {role === "CANDIDATE" ? (
        <CandidateDashboard user={user} onExplore={onExplore} />
      ) : role === "RECRUITER" ? (
        <RecruiterDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}
