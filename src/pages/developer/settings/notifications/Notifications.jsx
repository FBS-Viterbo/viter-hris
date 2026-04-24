import React from "react";
import Layout from "../../Layout";
import NotificationsList from "./NotificationsList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddNotifications from "./ModalAddNotifications";

const Notifications = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="Settings" submenu="notifications">
        <div className="flex items-center justify-between w-full">
          <h1>Notification</h1>
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

        <div>
          <NotificationsList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && <ModalAddNotifications itemEdit={itemEdit} />}
    </>
  );
};

export default Notifications;
