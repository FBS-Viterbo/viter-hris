import React from "react";
import Layout from "../Layout";

// ── Static mock data ──────────────────────────────────────────────────────────

const whoIsOut = {
  today: [
    { name: "Bosinos, Maribel", type: "Maternity Leave", days: 74, avatar: null },
    { name: "Consignado, Thea Lyzette", type: "Vacation Leave", days: 1, avatar: null },
  ],
  tomorrow: [
    { name: "Bosinos, Maribel", type: "Maternity Leave", days: 74, avatar: null },
  ],
};

const announcements = [
  {
    id: 1,
    memoNo: "Memo No. 0929, Series 2025: MANDATORY WEARING OF COMPANY IDs",
    date: "September 29, 2025",
    body: [
      "This is a reminder that all employees of Frontline Business Solutions, Inc. are required to wear their company identification cards (IDs) at all times while inside the building.",
      "Since we are sharing the same building with Frontline Christian Academy, it is important to maintain proper identification for security, order, and professionalism. Wearing your ID will help distinguish our employees from students, parents, and visitors, and will ensure smoother coordination within the premises.",
      "We kindly ask everyone to comply with this policy at all times. Let us continue to uphold the values of professionalism and responsibility as representatives of Frontline Business Solutions.",
    ],
  },
  {
    id: 2,
    memoNo: "Memo No. 0825, Series 2025: LAUNCH OF CLIENT REFERRAL INCENTIVE PROGRAM",
    date: "August 4, 2025",
    body: [
      "Memo No. 0825, Series 2025\nTO: ALL EMPLOYEES\nRE: LAUNCH OF CLIENT REFERRAL INCENTIVE PROGRAM",
      "To further grow our client base and expand the reach of our service offerings, we are pleased to launch the Client Referral Incentive Program. This program provides monetary incentives to employees, partners, or external contacts who successfully refer a local client that closes a deal with Frontline Business Solutions in any of the following services:",
      "1. Website Development\n2. Web Applications Subscriptions\n3. Customized Web App Development\n4. Web and Graphic Design\n5. Business Registration\n6. Bookkeeping & Business Compliance",
      "Please note that this incentive applies to all employees, except those whose primary role or job function is to acquire clients (e.g., sales, marketing, or business development roles).",
      "The incentive amount will depend on the size and scope of the closed deal and may range from ₱500 to ₱1,000, as determined by the management, marketing team, and project lead.",
      "Thank you for your continued support in helping us expand our network and client base.",
    ],
  },
];

const myTeam = [
  { name: "Balacalda Jr., Teodoro", dept: "Web", avatar: null },
  { name: "Lumabas, Cyrene", dept: "Web", avatar: null },
  { name: "Manalo, Emmanuel", dept: "Web", avatar: null },
  { name: "Ramos, Jinuel Zymon", dept: "Web", avatar: null },
  { name: "Rubico, Lauren Isabel", dept: "Web", avatar: null },
];

// ── Avatar placeholder ────────────────────────────────────────────────────────
const Avatar = ({ name, size = 40 }) => {
  const initials = name
    .split(",")
    .map((s) => s.trim()[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colors = [
    "#C2185B","#7B1FA2","#1976D2","#00796B","#F57C00","#5D4037","#455A64",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

// ── Section card wrapper ──────────────────────────────────────────────────────
const Card = ({ children, style }) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ icon, title, color = "#C2185B" }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 16px",
      borderBottom: "1px solid #e5e7eb",
      background: "#fafafa",
    }}
  >
    <span style={{ color, fontSize: 15 }}>{icon}</span>
    <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{title}</span>
  </div>
);

// ── Who's Out ─────────────────────────────────────────────────────────────────
const WhosOut = () => (
  <Card>
    <CardHeader icon="📅" title="Who's Out" />
    <div style={{ padding: "12px 16px" }}>
      {[
        { label: "TODAY", people: whoIsOut.today },
        { label: "TOMORROW", people: whoIsOut.tomorrow },
      ].map(({ label, people }) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6b7280",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            {label}
          </div>
          {people.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <Avatar name={p.name} size={40} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{p.type}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>Day(s): {p.days}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </Card>
);

// ── Celebrations ──────────────────────────────────────────────────────────────
const Celebrations = () => (
  <Card>
    <CardHeader icon="🎉" title="Celebrations" color="#f59e0b" />
    <div
      style={{
        padding: "24px 16px",
        textAlign: "center",
        color: "#6b7280",
        fontSize: 13,
        lineHeight: 1.7,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 10 }}>🎊</div>
      No celebration for today. However, we would like to express our sincere
      appreciation and gratitude for all the hard work of all employees. You are the
      backbone of our company and we value your contributions immensely. Thank you for
      your understanding and cooperation.
    </div>
  </Card>
);

// ── Welcome New Employees ─────────────────────────────────────────────────────
const WelcomeNew = () => (
  <Card>
    <CardHeader icon="🏢" title="Welcome to Frontline Business Solutions Inc." />
    <div
      style={{
        padding: "24px 16px",
        textAlign: "center",
        color: "#9ca3af",
        fontSize: 13,
      }}
    >
      No new employee yet.
    </div>
  </Card>
);

// ── Announcements ─────────────────────────────────────────────────────────────
const Announcements = () => (
  <Card style={{ height: "100%" }}>
    <CardHeader icon="📢" title="Announcement" />
    <div style={{ padding: "16px 20px", maxHeight: 480, overflowY: "auto" }}>
      <p style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>
        Thank you for your continued support and participation!
      </p>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>— FBS Management</p>

      {announcements.map((a) => (
        <div key={a.id} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, marginTop: 2 }}>📢</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#111", marginBottom: 2 }}>
                {a.memoNo}
              </div>
              <div style={{ fontSize: 12, color: "#C2185B", marginBottom: 10 }}>
                <strong>Date:</strong> {a.date}
              </div>
              {a.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "#374151",
                    marginBottom: 8,
                    whiteSpace: "pre-line",
                    lineHeight: 1.65,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// ── My Team ───────────────────────────────────────────────────────────────────
const MyTeam = () => (
  <Card>
    <CardHeader icon="👥" title="My Team" color="#1976D2" />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        padding: 16,
      }}
    >
      {myTeam.map((m, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={m.name} size={44} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{m.dept}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = () => {
  return (
    <Layout menu="dashboard">
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>
          Welcome Manalo, Emmanuel!
        </h1>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <WhosOut />
          <Celebrations />
          <WelcomeNew />
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Announcements />
          <MyTeam />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;