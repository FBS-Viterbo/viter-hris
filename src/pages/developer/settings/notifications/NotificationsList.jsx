import React from "react";
import {
  apiVersion,
  formatDate,
} from "../../../../functions/functions-general";
import NoData from "../../../../partials/NoData";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import Status from "../../../../partials/Status";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/Loadmore";
import SearchBar from "../../../../partials/SearchBar";

const NotificationsList = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notifications", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``,
        `${apiVersion}/controllers/developers/settings/notifications/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="py-5 flex items-center justify-between">
        <div className="relative">
          <label htmlFor="">Status</label>
          <select
            name="status"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>
      <div className="relative">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Purpose</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              (status == "pending" || result?.pages[0]?.count == 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status == "pending" ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages.map((pages, key) => (
              <React.Fragment key={key}>
                {pages?.data.map((item, itemKey) => (
                  <tr key={itemKey}>
                    <td>{counter++}</td>
                    <td>
                      <Status text={item.notification_is_active == 1 ? "active" : "inactive"} />
                    </td>
                    <td>{`${item.first_name} ${item.last_name}`.trim()}</td>
                    <td>{item.email}</td>
                    <td className="capitalize">{item.purpose}</td>
                    <td>{formatDate(item.notification_created)}</td>
                    <td>{formatDate(item.notification_updated)}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        {item.notification_is_active == 1 ? (
                          <>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <FaTrashRestore />
                            </button>
                            <button
                              type="button"
                              className="tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="loadmore flex justify-center flex-col items-center pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || store?.isFilter}
          />
        </div>
      </div>

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/notifications/active.php`}
          dataItem={itemEdit}
          msg="Are you sure you want to archive this record?"
          successMsg={"Successfully archived"}
          item={itemEdit.email}
          queryKey="notifications"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/notifications/active.php`}
          dataItem={itemEdit}
          msg="Are you sure you want to restore this record?"
          successMsg={"Successfully restored"}
          item={itemEdit.email}
          queryKey="notifications"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/notifications/notifications.php`}
          dataItem={itemEdit}
          msg="Are you sure you want to delete this record?"
          successMsg={"Successfully deleted"}
          item={`${itemEdit.first_name} ${itemEdit.last_name}`.trim()}
          queryKey="notifications"
        />
      )}
    </>
  );
};

export default NotificationsList;
