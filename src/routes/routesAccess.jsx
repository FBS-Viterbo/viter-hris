import { devNavUrl } from "../functions/functions-general";
import CreatePasswordOther from "../pages/access/CreatePassword";

export const routesAccess = [
  {
    path: `${devNavUrl}/create-password`,
    element: <CreatePasswordOther />,
  },
];
