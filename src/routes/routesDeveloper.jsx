import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Dashboard from "../pages/developer/dashboard/Dashboard";
import Employees from "../pages/developer/employees/Employees";
import Memo from "../pages/developer/settings/memo/Memo";
import Roles from "../pages/developer/settings/roles/Roles";
import Users from "../pages/developer/settings/users/Users";

export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/`,
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/roles`,
    element: (
      <>
        <Roles />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/employees`,
    element: (
      <>
        <Employees />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users`,
    element: (
      <>
        <Users />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/memo`,
    element: (
      <>
        <Memo />
      </>
    ),
  },
];
