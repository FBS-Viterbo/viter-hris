import React from "react";
import {
  FaBell,
  FaBirthdayCake,
  FaBriefcase,
  FaBullhorn,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
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

const employeeEndpoint = `${apiVersion}/controllers/developers/employees/employees.php`;

const getEmployeeName = (employee) =>
  [
    employee?.employee_last_name ? `${employee.employee_last_name},` : "",
    employee?.employee_first_name,
    employee?.employee_middle_name,
  ]
    .filter(Boolean)
    .join(" ") || "Employee";

const parseDateValue = (date) => {
  if (!date || date.startsWith("0000")) return null;

  const [year, month, day] = date.split(" ")[0].split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

const formatDateValue = (date) => {
  const parsedDate = parseDateValue(date);
  return parsedDate ? parsedDate.toLocaleString("en", dateOptions) : "--";
};

const isUpcomingThisMonth = (date, today = new Date()) => {
  const parsedDate = parseDateValue(date);
  if (!parsedDate) return false;

  return parsedDate.getMonth() === today.getMonth() && parsedDate.getDate() >= today.getDate();
};

const isToday = (date, today = new Date()) => {
  const parsedDate = parseDateValue(date);
  if (!parsedDate) return false;

  return parsedDate.getMonth() === today.getMonth() && parsedDate.getDate() === today.getDate();
};

const isCurrentMonthAndYear = (date, today = new Date()) => {
  const parsedDate = parseDateValue(date);
  if (!parsedDate) return false;

  return parsedDate.getMonth() === today.getMonth() && parsedDate.getFullYear() === today.getFullYear();
};

const getWorkYears = (date, today = new Date()) => {
  const parsedDate = parseDateValue(date);
  if (!parsedDate) return 0;

  return today.getFullYear() - parsedDate.getFullYear();
};

const sortByMonthDay = (a, b, key) => {
  const firstDate = parseDateValue(a[key]);
  const secondDate = parseDateValue(b[key]);

  if (!firstDate || !secondDate) return 0;
  return firstDate.getDate() - secondDate.getDate();
};

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
  const displayName = name || "Employee";
  const initials = displayName
    .split(",")
    .map((s) => s.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colorClass = bgColors[displayName.charCodeAt(0) % bgColors.length];

  return (
    <div
      className={`${size} ${colorClass} ${textSize} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials || "E"}
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

const Celebrations = ({ employees, error, status }) => {
  const today = new Date();
  const birthdays = employees
    .filter((employee) => isUpcomingThisMonth(employee.employee_birthday, today))
    .sort((a, b) => sortByMonthDay(a, b, "employee_birthday"));
  const anniversaries = employees
    .filter((employee) => {
      const years = getWorkYears(employee.employee_start_work_date, today);
      return years > 0 && isUpcomingThisMonth(employee.employee_start_work_date, today);
    })
    .sort((a, b) => sortByMonthDay(a, b, "employee_start_work_date"));

  return (
    <Card>
      <CardHeader icon={<FaBell />} title="Celebrations" />
      <div className="px-4 py-4 max-h-[320px] overflow-y-auto">
        {status === "pending" && (
          <p className="text-[13px] text-gray-500">Loading celebrations...</p>
        )}

        {error && (
          <p className="text-[13px] text-red-600">Unable to load celebrations.</p>
        )}

        {!error && status !== "pending" && birthdays.length === 0 && anniversaries.length === 0 && (
          <p className="text-center text-gray-500 text-[13px] leading-relaxed">
            No birthday or work anniversary for the rest of this month.
          </p>
        )}

        {!error && status !== "pending" && birthdays.length > 0 && (
          <div className="mb-5">
            <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">
              BIRTHDAYS
            </p>
            {birthdays.map((employee) => (
              <div key={`birthday-${employee.employee_aid}`} className="flex items-center gap-2.5 mb-3">
                <Avatar name={getEmployeeName(employee)} />
                <div>
                  <p className="font-semibold text-[13px] text-gray-900">
                    {getEmployeeName(employee)}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {isToday(employee.employee_birthday, today) ? "Birthday today" : "Birthday this month"}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {formatDateValue(employee.employee_birthday)}
                  </p>
                </div>
                <FaBirthdayCake className="ml-auto text-pink-700" />
              </div>
            ))}
          </div>
        )}

        {!error && status !== "pending" && anniversaries.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">
              WORK ANNIVERSARIES
            </p>
            {anniversaries.map((employee) => (
              <div key={`anniversary-${employee.employee_aid}`} className="flex items-center gap-2.5 mb-3">
                <Avatar name={getEmployeeName(employee)} />
                <div>
                  <p className="font-semibold text-[13px] text-gray-900">
                    {getEmployeeName(employee)}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {getWorkYears(employee.employee_start_work_date, today)} year(s)
                    {isToday(employee.employee_start_work_date, today) ? " today" : " this month"}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Started {formatDateValue(employee.employee_start_work_date)}
                  </p>
                </div>
                <FaBriefcase className="ml-auto text-teal-700" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

const WelcomeNew = ({ employees, error, status }) => {
  const today = new Date();
  const newEmployees = employees
    .filter((employee) => isCurrentMonthAndYear(employee.employee_start_work_date, today))
    .sort((a, b) => {
      const firstDate = parseDateValue(a.employee_start_work_date);
      const secondDate = parseDateValue(b.employee_start_work_date);

      if (!firstDate || !secondDate) return 0;
      return firstDate - secondDate;
    });

  return (
    <Card>
      <CardHeader icon={<FaBuilding />} title="Welcome to Frontline Business Solutions Inc." />
      <div className="px-4 py-4 max-h-[280px] overflow-y-auto">
        {status === "pending" && (
          <p className="text-[13px] text-gray-500">Loading new employees...</p>
        )}

        {error && (
          <p className="text-[13px] text-red-600">Unable to load new employees.</p>
        )}

        {!error && status !== "pending" && newEmployees.length === 0 && (
          <p className="text-center text-gray-400 text-[13px]">No new employee this month.</p>
        )}

        {!error &&
          status !== "pending" &&
          newEmployees.map((employee) => (
            <div key={employee.employee_aid} className="flex items-center gap-2.5 mb-3">
              <Avatar name={getEmployeeName(employee)} />
              <div>
                <p className="font-semibold text-[13px] text-gray-900">
                  {getEmployeeName(employee)}
                </p>
                <p className="text-[12px] text-gray-500">{employee.department_name || "No department"}</p>
                <p className="text-[11px] text-gray-400">
                  Starts {formatDateValue(employee.employee_start_work_date)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

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

const MyTeam = ({ employees, error, status }) => {
  const groupedEmployees = employees.reduce((groups, employee) => {
    const department = employee.department_name || "No Department";

    return {
      ...groups,
      [department]: [...(groups[department] || []), employee],
    };
  }, {});

  const departmentNames = Object.keys(groupedEmployees).sort();

  return (
    <Card>
      <CardHeader icon={<FaUsers />} title="My Team" />
      <div className="p-4 max-h-[480px] overflow-y-auto">
        {status === "pending" && (
          <p className="text-[13px] text-gray-500">Loading employees...</p>
        )}

        {error && (
          <p className="text-[13px] text-red-600">Unable to load employees.</p>
        )}

        {!error && status !== "pending" && departmentNames.length === 0 && (
          <p className="text-[13px] text-gray-500">No employee yet.</p>
        )}

        {!error &&
          status !== "pending" &&
          departmentNames.map((department) => (
            <div key={department} className="mb-5 last:mb-0">
              <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-3">
                {department.toUpperCase()}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {groupedEmployees[department].map((employee) => (
                  <div key={employee.employee_aid} className="flex items-center gap-2.5">
                    <Avatar name={getEmployeeName(employee)} size="w-11 h-11" textSize="text-sm" />
                    <div>
                      <p className="font-semibold text-[13px] text-gray-900">
                        {getEmployeeName(employee)}
                      </p>
                      <p className="text-[12px] text-gray-500">{department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const {
    data: employeeResult,
    error: employeeError,
    status: employeeStatus,
  } = useQueryData(employeeEndpoint, "get", "dashboard-employees");
  const employees =
    employeeResult?.data?.filter((employee) => employee.employee_is_active == 1) || [];

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
          <Celebrations
            employees={employees}
            error={employeeError}
            status={employeeStatus}
          />
          <WelcomeNew
            employees={employees}
            error={employeeError}
            status={employeeStatus}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Announcements />
          <MyTeam
            employees={employees}
            error={employeeError}
            status={employeeStatus}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
