import React from "react";
import { FaPlus } from "react-icons/fa";
import { setIsAdd, setIsMemoOpen } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import Layout from "../Layout";
import MemoList from "./MemoList";
import ModalAddMemo from "./ModalAddMemo";
import ModalViewMemo from "./ModalViewMemo";

const Memo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [itemView, setItemView] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleCloseView = () => {
    dispatch(setIsMemoOpen(false));
    setItemView(null);
  };

  return (
    <>
      <Layout menu="memo">
        <div className="flex items-center justify-between w-full">
          <h1>Memo</h1>
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
          <MemoList
            itemEdit={itemEdit}
            setItemEdit={setItemEdit}
            setItemView={setItemView}
          />
        </div>
      </Layout>

      {store.isAdd && <ModalAddMemo itemEdit={itemEdit} />}
      {store.isMemoOpen && itemView && (
        <ModalViewMemo itemView={itemView} handleClose={handleCloseView} />
      )}
    </>
  );
};

export default Memo;
