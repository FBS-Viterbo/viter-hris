import React from "react";
import Layout from "../../Layout";
import RolesList from "./RolesList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";

const Roles = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="Settings" submenu="roles">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Roles</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <RolesList />
        </div>
      </Layout>

      {store.isAdd && <> </>}
    </>
  );
};

export default Roles;
