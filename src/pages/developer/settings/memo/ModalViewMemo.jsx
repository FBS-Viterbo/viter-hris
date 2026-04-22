import React from "react";
import { formatDate } from "../../../../functions/functions-general";
import ModalWrapperCenter from "../../../../partials/modals/ModalWrapperCenter";

const ModalViewMemo = ({ itemView, handleClose }) => {
  return (
    <ModalWrapperCenter
      handleClose={handleClose}
      className="w-[92vw] max-w-[52rem] rounded-md p-8"
      topNone="top-5"
    >
      <div className="flex flex-col gap-6 text-sm text-gray-700">
        <div className="grid grid-cols-[6rem_1fr] gap-y-3 gap-x-6 border-b border-gray-200 pb-6">
          <span className="font-semibold text-gray-900">To:</span>
          <span>{itemView.memo_to}</span>

          <span className="font-semibold text-gray-900">From:</span>
          <span>{itemView.memo_from}</span>

          <span className="font-semibold text-gray-900">Date:</span>
          <span>{formatDate(itemView.memo_date, "--")}</span>

          <span className="font-semibold text-gray-900">Category:</span>
          <span>{itemView.memo_category}</span>
        </div>

        <div className="leading-7 whitespace-pre-line min-h-[18rem]">
          {itemView.memo_text}
        </div>

        <div className="flex justify-end">
          <button type="button" className="btn-modal-cancel" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </ModalWrapperCenter>
  );
};

export default ModalViewMemo;
