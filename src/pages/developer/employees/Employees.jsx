import React from "react";
import Layout from "../Layout";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import EmployeesList from "./EmployeesList";

const Employees = () => {
  const { store, dispatch } = React.useState(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="employees">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Employees</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
              //   onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <EmployeesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {/* {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />} */}
    </>
  );
};

export default Employees;
