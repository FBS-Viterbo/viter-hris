import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiVersion } from "../../../functions/functions-general";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";

const EmployeesList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  // page
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState(null);
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["employees", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/donations/search`, // search endpoint
        `${apiVersion}/donations/page/${pageParam}`, // list endpoint
        // store.isSearch || isFilter, // search boolean, // search boolean
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        post,
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
      <div className="relative pt-4 rounded-md">
        {status !== "pending" && !isFetching && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Employee Name</th>
              <th>Email</th>
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesList;
