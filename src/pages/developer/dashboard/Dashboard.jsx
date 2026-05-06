import React from "react";
import { FaBell, FaBullhorn, FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";
import Layout from "../Layout";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";

const whoIsOut = {
  today: [
    { name: "Bosinos, Maribel", type: "Maternity Leave", days: 74 },
    { name: "Consignado, Thea Lyzette", type: "Vacation Leave", days: 1 },
  ],
  tomorrow: [
    { name: "Bosinos, Maribel", type: "Maternity Leave", days: 74 },
  ],
};

const myTeam = [
  { name: "Balacalda Jr., Teodoro", dept: "Web" },
  { name: "Lumabas, Cyrene", dept: "Web" },
  { name: "Manalo, Emmanuel", dept: "Web" },
  { name: "Ramos, Jinuel Zymon", dept: "Web" },
  { name: "Rubico, Lauren Isabel", dept: "Web" },
];

const bgColors = [
  "bg-pink-700",
  "bg-purple-700",
  "bg-blue-700",
  "bg-teal-700",
  "bg-orange-600",
  "bg-stone-600",
  "bg-slate-600",
];

const dateOptions = { month: "long", day: "numeric", year: "numeric" };

const formatMemoCreated = (memo) => {
  const dates = [memo?.memo_created, memo?.memo_date];

  for (const date of dates) {
    if (!date || date.startsWith("0000")) continue;

    const parsedDate = new Date(date.replace(" ", "T"));
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString("en", dateOptions);
    }
  }

  return "--";
};

const Avatar = ({ name, size = "w-10 h-10", textSize = "text-sm" }) => {
  const initials = name
    .split(",")
    .map((s) => s.trim()[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colorClass = bgColors[name.charCodeAt(0) % bgColors.length];

  return (
    <div
      className={`${size} ${colorClass} ${textSize} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-gray-50">
    <span className="text-base">{icon}</span>
    <span className="font-bold text-sm text-gray-900">{title}</span>
  </div>
);

const WhosOut = () => (
  <Card>
    <CardHeader icon={<FaCalendarAlt />} title="Who's Out" />
    <div className="px-4 py-3">
      {[
        { label: "TODAY", people: whoIsOut.today },
        { label: "TOMORROW", people: whoIsOut.tomorrow },
      ].map(({ label, people }) => (
        <div key={label} className="mb-4">
          <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">{label}</p>
          {people.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 mb-3">
              <Avatar name={p.name} />
              <div>
                <p className="font-semibold text-[13px] text-gray-900">{p.name}</p>
                <p className="text-[12px] text-gray-500">{p.type}</p>
                <p className="text-[11px] text-gray-400">Day(s): {p.days}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </Card>
);

const Celebrations = () => (
  <Card>
    <CardHeader icon={<FaBell />} title="Celebrations" />
    <div className="px-4 py-6 text-center text-gray-500 text-[13px] leading-relaxed">
      <div className="text-4xl mb-2.5">*</div>
      No celebration for today. However, we would like to express our sincere appreciation
      and gratitude for all the hard work of all employees. You are the backbone of our
      company and we value your contributions immensely. Thank you for your understanding
      and cooperation.
    </div>
  </Card>
);

const WelcomeNew = () => (
  <Card>
    <CardHeader icon={<FaBuilding />} title="Welcome to Frontline Business Solutions Inc." />
    <div className="px-4 py-6 text-center text-gray-400 text-[13px]">
      No new employee yet.
    </div>
  </Card>
);

const Announcements = () => {
  const { data: result, error, isFetching, status } = useQueryData(
    `${apiVersion}/controllers/developers/memo/memo.php`,
    "get",
    "dashboard-announcements",
  );

  const announcements = result?.data?.filter((memo) => memo.memo_is_active == 1) || [];

  return (
    <Card>
      <CardHeader icon={<FaBullhorn />} title="Announcement" />
      <div className="px-5 py-4 max-h-[480px] overflow-y-auto">
        <p className="text-[13px] text-gray-700 mb-1">
          Thank you for your continued support and participation!
        </p>
        <p className="text-[12px] text-gray-500 mb-5">- FBS Management</p>

        {status === "pending" && (
          <p className="text-[13px] text-gray-500">Loading announcements...</p>
        )}

        {error && (
          <p className="text-[13px] text-red-600">Unable to load announcements.</p>
        )}

        {!error && status !== "pending" && announcements.length === 0 && (
          <p className="text-[13px] text-gray-500">No announcement yet.</p>
        )}

        {!error &&
          announcements.map((memo) => (
            <div key={memo.memo_aid} className="mb-7">
              <div className="flex gap-3 items-start">
                <span className="text-lg mt-0.5 text-pink-700">
                  <FaBullhorn />
                </span>
                <div>
                  <p className="font-bold text-[13px] text-gray-900 mb-0.5">
                    Memo No. {memo.memo_no}: {memo.memo_name}
                  </p>
                  <p className="text-[12px] text-pink-700 mb-2.5">
                    <strong>Date:</strong> {formatMemoCreated(memo)}
                  </p>
                  <div className="text-[13px] text-gray-700 mb-2 whitespace-pre-line leading-relaxed">
                    <p>
                      Memo No. {memo.memo_no}
                    </p>
                    <p>
                      <strong>TO:</strong> {memo.memo_to}
                    </p>
                    <p className="mb-2">
                      <strong>RE:</strong> {memo.memo_name}
                    </p>
                    <p>{memo.memo_text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!error && status !== "pending" && isFetching && (
          <p className="text-[12px] text-gray-400">Refreshing announcements...</p>
        )}
      </div>
    </Card>
  );
};

const MyTeam = () => (
  <Card>
    <CardHeader icon={<FaUsers />} title="My Team" />
    <div className="grid grid-cols-3 gap-4 p-4">
      {myTeam.map((m, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <Avatar name={m.name} size="w-11 h-11" textSize="text-sm" />
          <div>
            <p className="font-semibold text-[13px] text-gray-900">{m.name}</p>
            <p className="text-[12px] text-gray-500">{m.dept}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <Layout menu="dashboard">
      <div className="mb-5">
        <h1 className="text-[22px] font-bold text-gray-900">
          Welcome Manalo, Emmanuel!
        </h1>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
        <div className="flex flex-col gap-4">
          <WhosOut />
          <Celebrations />
          <WelcomeNew />
        </div>

        <div className="flex flex-col gap-4">
          <Announcements />
          <MyTeam />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
