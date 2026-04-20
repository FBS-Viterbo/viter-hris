import React from "react";
import Layout from "../../Layout";
import UsersList from "./UsersList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModelAddUsers from "./ModalAddUsers";

const Users = () => {
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
          <h1>Users</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <UsersList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && <ModelAddUsers itemEdit={itemEdit} />}
    </>
  );
};

export default Users;
