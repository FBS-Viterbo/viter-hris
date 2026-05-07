import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTimes, FaUsers, FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import { apiVersion } from "../../../../functions/functions-general";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import Layout from "../../Layout";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import ContentSpinner from "../../../../partials/spinners/ContentSpinner";
import MessageError from "../../../../partials/MessageError";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import Status from "../../../../partials/Status";
import { InputSelect } from "../../../../components/form-input/FormInputs";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import SearchBar from "../../../../partials/SearchBar";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import Loadmore from "../../../../partials/Loadmore";
import TableLoading from "../../../../partials/TableLoading";

const directReportEndpoint = `${apiVersion}/controllers/developers/settings/directreport/direct-report.php`;
const employeesEndpoint = `${apiVersion}/controllers/developers/employees/employees.php`;

const getEmployeeName = (employee) =>
  [employee?.employee_first_name, employee?.employee_last_name]
    .filter(Boolean)
    .join(" ");

const ModalAddDirectReport = ({ employees, directReports, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(directReportEndpoint, itemEdit ? "put" : "post", values, itemEdit ? itemEdit.direct_report_aid : ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["direct-reports"] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      dispatch(setSuccess(true));
      dispatch(setMessage(itemEdit ? "Successfully updated" : "Successfully added"));
      dispatch(setIsAdd(false));
    },
    onError: (error) => {
      dispatch(setError(true));
      dispatch(setMessage(error.message));
    },
  });

  // ✅ FIXED VALIDATION
  const yupSchema = Yup.object({
    direct_report_subordinate_id: Yup.string()
      .trim()
      .required("required"),

    direct_report_supervisor_id: Yup.string()
      .trim()
      .required("required")

      // ❌ same person validation
      .test(
        "different-employee",
        "The subordinate and supervisor cannot be the same person.",
        function (value) {
          const subordinateId = this.parent.direct_report_subordinate_id;
          if (!value || !subordinateId) return true;

          return String(value) !== String(subordinateId);
        }
      )

      // ❌ duplicate + reverse relationship validation
      .test(
        "invalid-relationship",
        "Invalid request, the supervisor cannot be assigned to the selected subordinate.",
        function (value) {
          const subordinateId = this.parent.direct_report_subordinate_id;

          if (!value || !subordinateId) return true;

          const selectedSub = String(subordinateId);
          const selectedSup = String(value);

          const hasConflict = directReports.some((item) => {
            const sub = String(item.direct_report_subordinate_id);
            const sup = String(item.direct_report_supervisor_id);

            const normal = sub === selectedSub && sup === selectedSup;
            const reverse = sub === selectedSup && sup === selectedSub;

            // Exclude current item if editing
            if (itemEdit && item.direct_report_aid === itemEdit.direct_report_aid) return false;

            return normal || reverse;
          });

          return !hasConflict;
        }
      ),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

  return (
    <ModalWrapperSide handleClose={handleClose}>
      <div className="modal-header relative mb-4">
        <h3 className="text-dark text-sm">{itemEdit ? "Edit" : "Add"} Direct Report</h3>
        <button
          type="button"
          className="absolute top-0 right-4"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>

      <Formik
        initialValues={{
          direct_report_subordinate_id: itemEdit ? itemEdit.direct_report_subordinate_id : "",
          direct_report_supervisor_id: itemEdit ? itemEdit.direct_report_supervisor_id : "",
        }}
        validationSchema={yupSchema}
        onSubmit={(values) => {
          dispatch(setError(false));
          mutation.mutate(values);
        }}
      >
        {(props) => (
          <Form className="h-full">
            <div className="modal-form-container">
              <div className="modal-container">

                {/* SUBORDINATE */}
                <div className="relative mb-6">
                  <InputSelect
                    label="Subordinate"
                    name="direct_report_subordinate_id"
                    disabled={mutation.isPending}
                  >
                    <option value="" hidden>
                      --
                    </option>
                    {employees.map((item) => (
                      <option key={item.employee_aid} value={item.employee_aid}>
                        {getEmployeeName(item)}
                      </option>
                    ))}
                  </InputSelect>
                </div>

                {/* SUPERVISOR */}
                <div className="relative mb-6">
                  <InputSelect
                    label="Supervisor"
                    name="direct_report_supervisor_id"
                    disabled={mutation.isPending}
                  >
                    <option value="" hidden>
                      --
                    </option>
                    {employees.map((item) => (
                      <option key={item.employee_aid} value={item.employee_aid}>
                        {getEmployeeName(item)}
                      </option>
                    ))}
                  </InputSelect>

                  {store.error && <MessageError />}
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  disabled={mutation.isPending || !props.dirty}
                  className="btn-modal-submit"
                >
                  {mutation.isPending ? <ButtonSpinner /> : itemEdit ? "Update" : "Add"}
                </button>

                <button
                  type="reset"
                  className="btn-modal-cancel"
                  onClick={handleClose}
                  disabled={mutation.isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapperSide>
  );
};

const DirectReport = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  // page
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  // use if with load more button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["direct-reports", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search endpoint
        `${apiVersion}/controllers/developers/settings/directreport/page.php?start=${pageParam}`, // list endpoint
        // store.isSearch || isFilter, // search boolean, // search boolean
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

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
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

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  const handleFilterChange = (e) => {
    setPage(1);
    setFilterData(e.target.value);
  };

  const {
    data: employeeResult,
    error: employeeError,
    status: employeeStatus,
  } = useQueryData(employeesEndpoint, "get", "employees");

  const directReports = result?.pages?.flatMap(page => page.data) || [];
  const activeEmployees =
    employeeResult?.data?.filter((item) => item.employee_is_active == 1) || [];

  return (
    <>
      <Layout menu="Settings" submenu="direct-report">
        <div className="flex items-center justify-between w-full">
          <h1>Direct Report</h1>

          <button
            type="button"
            className="flex items-center gap-1 hover:underline"
            onClick={handleAdd}
            disabled={activeEmployees.length < 2}
          >
            <FaPlus className="text-primary" />
            Add
          </button>
        </div>

        <div className="py-5 flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <FaUsers />
            {result?.pages?.[0]?.total || 0}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <label htmlFor="">Status</label>
            <select onChange={handleFilterChange} value={filterData}>
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

        <div className="relative pt-4">
          {status !== "pending" && isFetching && <FetchingSpinner />}

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Supervisor</th>
                <th>Supervisor Email</th>
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
              {result?.pages?.map((page, key) => (
                <React.Fragment key={key}>
                  {page?.data?.map((item, key) => {
                    return (
                      <tr key={item.direct_report_aid}>
                        <td>{counter++}</td>
                        <td>
                          <Status
                            text={
                              item.direct_report_is_active == 1
                                ? "active"
                                : "inactive"
                            }
                          />
                        </td>
                        <td>
                          {item.subordinate_first_name} {item.subordinate_last_name}
                        </td>
                        <td>
                          {item.supervisor_first_name} {item.supervisor_last_name}
                        </td>
                        <td>{item.supervisor_email || "--"}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            {item.direct_report_is_active == 1 ? (
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
                    );
                  })}
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
              isSearchOrFilter={store.isSearch || result?.isFilter}
            />
          </div>
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddDirectReport
          employees={activeEmployees}
          directReports={directReports}
          itemEdit={itemEdit}
        />
      )}

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/directreport/direct-report.php?id=${itemEdit.direct_report_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to archive this record?"
          successMsg={"Successfully archived"}
          item={`${itemEdit.subordinate_first_name} ${itemEdit.subordinate_last_name} - ${itemEdit.supervisor_first_name} ${itemEdit.supervisor_last_name}`}
          queryKey="direct-reports"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/directreport/direct-report.php?id=${itemEdit.direct_report_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to restore this record?"
          successMsg={"Successfully restored"}
          item={`${itemEdit.subordinate_first_name} ${itemEdit.subordinate_last_name} - ${itemEdit.supervisor_first_name} ${itemEdit.supervisor_last_name}`}
          queryKey="direct-reports"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/directreport/direct-report.php?id=${itemEdit.direct_report_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to delete this record?"
          successMsg={"Successfully deleted"}
          item={`${itemEdit.subordinate_first_name} ${itemEdit.subordinate_last_name} - ${itemEdit.supervisor_first_name} ${itemEdit.supervisor_last_name}`}
          queryKey="direct-reports"
        />
      )}
    </>
  );
};

export default DirectReport;