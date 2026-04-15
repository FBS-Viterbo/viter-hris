import React from "react";
import useQueryData from "./../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";
import NoData from "../../../../partials/NoData";

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

  return (
    <>
      <div className="relative">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Date updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataRoles?.count == 0 ? (
              <tr>
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              dataRoles?.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}.</td>
                    <td>{item.role_name}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RolesList;
