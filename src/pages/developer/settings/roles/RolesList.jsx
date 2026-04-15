import React from "react";
import useQueryData from "./../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";

const RolesList = ({ setItemEdit }) => {
  const {
    isLoading,
    isFetching,
    data: dataRoles,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/roles/roles.php`, //api path file
    "get", //method request
    "roles", //query key
  );

  return <></>;
};

export default RolesList;
