const paths: Record<string, string> = {
  dashboard: "M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 14h7v7H3z",
  search: "m20 20-4.3-4.3M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  briefcase: "M3 7h18v14H3zM8 7V4h8v3M3 12h18M10 12v2h4v-2",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  clipboard: "M9 5H5v16h14V5h-4M9 3h6v4H9zM8 12h8M8 16h8",
  calendar: "M4 5h16v16H4zM8 3v4m8-4v4M4 10h16",
  chart: "M3 3v18h18M8 15l4-4 4 3 5-7",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m12.72 0-1.42-1.42M7.06 7.06 5.64 5.64",
  user: "M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  logout: "M10 17l5-5-5-5m5 5H3m9-9h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m18 6-12 12M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  arrow: "M7 17 17 7M7 7h10v10",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  chevron: "m9 18 6-6-6-6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3",
  filter: "M4 6h16M7 12h10m-7 6h4",
  sparkle:
    "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
};
export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.dashboard} />
    </svg>
  );
}
