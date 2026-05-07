import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTimes, FaUsers } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { apiVersion } from "../../../../functions/functions-general";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import Layout from "../../Layout";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import ContentSpinner from "../../../../partials/spinners/ContentSpinner";
import MessageError from "../../../../partials/MessageError";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import Status from "../../../../partials/Status";
import { InputSelect } from "../../../../components/form-input/FormInputs";

const directReportEndpoint = `${apiVersion}/controllers/developers/settings/directreport/direct-report.php`;
const employeesEndpoint = `${apiVersion}/controllers/developers/employees/employees.php`;

const getEmployeeName = (employee) =>
  [employee?.employee_first_name, employee?.employee_last_name]
    .filter(Boolean)
    .join(" ");

const ModalAddDirectReport = ({ employees, directReports }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(directReportEndpoint, "post", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["direct-reports"] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      dispatch(setSuccess(true));
      dispatch(setMessage("Successfully updated"));
      dispatch(setIsAdd(false));
    },
    onError: (error) => {
      dispatch(setError(true));
      dispatch(setMessage(error.message));
    },
  });

  const yupSchema = Yup.object({
    direct_report_subordinate_id: Yup.string().trim().required("required"),
    direct_report_supervisor_id: Yup.string()
      .trim()
      .required("required")
      .test(
        "different-employee",
        "The subordinate and supervisor cannot be the same person.",
        function (value) {
          return value !== this.parent.direct_report_subordinate_id;
        },
      )
      .test(
        "reverse-assignment",
        "Invalid request, the supervisor cannot be assigned to the selected subordinate.",
        function (value) {
          const subordinateId = this.parent.direct_report_subordinate_id;

          if (!value || !subordinateId) return true;

          return !directReports.some(
            (item) =>
              String(item.direct_report_subordinate_id) === String(value) &&
              String(item.direct_report_supervisor_id) ===
                String(subordinateId),
          );
        },
      ),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

  return (
    <ModalWrapperSide
      handleClose={handleClose}
      className="transition-all ease-in-out transform duration-200"
    >
      <div className="modal-header relative mb-4">
        <h3 className="text-dark text-sm">Add Direct Report</h3>
        <button
          type="button"
          className="absolute top-0 right-4"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>

      <div className="modal-body">
        <Formik
          initialValues={{
            direct_report_subordinate_id: "",
            direct_report_supervisor_id: "",
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

                  <div className="relative mb-6">
                    <InputSelect
                      label="Supervisor"
                      name="direct_report_supervisor_id"
                      disabled={mutation.isPending}
                    >
                      <option value="" hidden>
                        --
                      </option>
                      {employees
                        .filter(
                          (item) =>
                            String(item.employee_aid) !==
                            String(props.values.direct_report_subordinate_id),
                        )
                        .map((item) => (
                          <option
                            key={item.employee_aid}
                            value={item.employee_aid}
                          >
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
                    {mutation.isPending ? <ButtonSpinner /> : "Add"}
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
      </div>
    </ModalWrapperSide>
  );
};

const DirectReport = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    data: directReportResult,
    error: directReportError,
    status: directReportStatus,
    isFetching: directReportFetching,
  } = useQueryData(directReportEndpoint, "get", "direct-reports");

  const {
    data: employeeResult,
    error: employeeError,
    status: employeeStatus,
  } = useQueryData(employeesEndpoint, "get", "employees");

  const directReports = directReportResult?.data || [];
  const activeEmployees =
    employeeResult?.data?.filter((item) => item.employee_is_active == 1) || [];

  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Layout menu="Settings" submenu="direct-report">
        <div className="flex items-center justify-between w-full">
          <h1>Direct Report</h1>
          <div>
            {employeeStatus === "pending" ? (
              <ButtonSpinner />
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 hover:underline"
                onClick={handleAdd}
                disabled={activeEmployees.length < 2}
              >
                <FaPlus className="text-primary" />
                Add
              </button>
            )}
          </div>
        </div>

        <div className="py-5 flex items-center gap-4">
          <div className="relative">
            <label htmlFor="">Status</label>
            <select disabled>
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <FaUsers />
            {directReports.length}
          </div>
        </div>

        <div className="relative">
          {directReportFetching && directReportStatus !== "pending" && (
            <ContentSpinner />
          )}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Supervisor</th>
                <th>Supervisor Email</th>
              </tr>
            </thead>
            <tbody>
              {(directReportStatus === "pending" ||
                employeeStatus === "pending") && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <ContentSpinner />
                  </td>
                </tr>
              )}

              {(directReportError || employeeError) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              )}

              {!directReportError &&
                directReportStatus !== "pending" &&
                directReports.length === 0 && (
                  <tr>
                    <td colSpan="100%" className="p-10">
                      <NoData />
                    </td>
                  </tr>
                )}

              {directReports.map((item, key) => (
                <tr key={item.direct_report_aid}>
                  <td>{key + 1}.</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddDirectReport
          employees={activeEmployees}
          directReports={directReports}
        />
      )}
    </>
  );
};

export default DirectReport;
