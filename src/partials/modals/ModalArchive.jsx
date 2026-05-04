import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import { queryData } from "../../functions/custom-hooks/queryData";
import { handleEscape, isEmptyItem } from "../../functions/functions-general";
import {
  setError,
  setIsArchive,
  setMessage,
  setSuccess,
} from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import MessageError from "../MessageError";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalArchive = ({
  mysqlApiArchive,
  msg,
  successMsg,
  item,
  dataItem = {},
  queryKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (data.success) {
        dispatch(setIsArchive(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(successMsg));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
    onError: (error) => {
      dispatch(setError(true));
      dispatch(setMessage(error.message || "Unable to archive record."));
    },
  });

  const handleYes = () => {
    const primaryKey = Object.keys(dataItem).find((key) =>
      key.endsWith("_aid")
    );

    const activeKey = Object.keys(dataItem).find((key) =>
      key.endsWith("_is_active")
    );

    if (!primaryKey || !activeKey) {
      console.error("Missing required keys in dataItem:", dataItem);
      dispatch(setError(true));
      dispatch(setMessage("Unable to archive record."));
      return;
    }

    mutation.mutate({
      [primaryKey]: dataItem[primaryKey],
      [activeKey]: 0,
      isActive: 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsArchive(false));
  };

  handleEscape(() => handleClose());

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <div className="bg-dark/50 overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center animate-fadeIn">
        <div className="p-1 w-[350px] animate-slideUp">
          <div className="bg-white p-6 pt-10 text-center rounded-lg">
            <FaQuestion className="my-2 mx-auto animate-bounce h-11 w-11 text-red-700" />

            <p className="text-sm">{msg}</p>

            <p className="text-sm font-bold">{isEmptyItem(item, "")}</p>

            {store.error && <MessageError />}

            <div className="flex items-center gap-1 pt-8">
              <button
                type="button"
                className="btn-modal-submit"
                disabled={mutation.isPending}
                onClick={handleYes}
              >
                {mutation.isPending ? <ButtonSpinner /> : "Confirm"}
              </button>

              <button
                type="button"
                className="btn-modal-cancel"
                disabled={mutation.isPending}
                onClick={handleClose}
                autoFocus
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalArchive;
