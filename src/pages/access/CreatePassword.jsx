import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { StoreContext } from "../../store/StoreContext";
import {
  apiVersion,
  devNavUrl,
  getUrlParam,
} from "../../functions/functions-general";
import useQueryData from "../../functions/custom-hooks/useQueryData";
import { queryData } from "../../functions/custom-hooks/queryData";
import PageNotFound from "../../partials/PageNotFound";
import FetchingSpinner from "../../partials/spinners/FetchingSpinner";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import { setCreatePassSuccess } from "../../store/StoreAction";
import { InputText } from "../../components/form-input/FormInputs";

const CreatePasswordOther = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [newPasswordShown, setNewPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const paramKey = getUrlParam().get("key");
  const queryClient = useQueryClient();
  const [lowerValidated, setLowerValidated] = React.useState(false);
  const [upperValidated, setUpperValidated] = React.useState(false);
  const [numberValidated, setNumberValidated] = React.useState(false);
  const [specialValidated, setSpecialValidated] = React.useState(false);
  const [lengthValidated, setLengthValidated] = React.useState(false);

  const { isLoading, data: key } = useQueryData(
    `${apiVersion}/other-user/key/${paramKey}`, // endpoint
    "get", // method
    "other-user-password", // key
  );

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${apiVersion}/other-user/password`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["other-user-password"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setIsSuccess(true);
      }
    },
  });

  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const initVal = {
    new_password: "",
    confirm_password: "",
    key: paramKey,
  };

  const yupSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[a-z]/, "At least one lowercase letter.")
      .matches(/[A-Z]/, "At least one uppercase letter.")
      .matches("(?=.*[!@#$%^&*`{;:',<.>/?}_-])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });
  const handleChange = (value) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*`{;:',<.>/?}_-])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  React.useEffect(() => {
    dispatch(setCreatePassSuccess(true));
  }, []);

  return (
    <>
      {isSuccess ? (
        <div
          className="relative flex justify-center items-center "
          style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center items-center flex-col">
              Logo
            </div>
            <FaCheck className="h-16 w-16 fill-success mx-auto mt-8" />
            <h2 className="mb-4 mt-2 text-lg text-center">Success!</h2>
            <p className="text-sm text-justify mb-6">
              Your password is set and ready to use. Click the button below to
              continue login
            </p>

            <p className="mt-2 text-sm">
              Go back to{" "}
              <a href={`${devNavUrl}/login`} className="w-full text-primary">
                <u> login</u>
              </a>
            </p>
          </div>
        </div>
      ) : key?.count == 0 || paramKey === null || paramKey === "" ? (
        <PageNotFound />
      ) : isLoading ? (
        <FetchingSpinner />
      ) : (
        <div
          className="relative flex justify-center items-center "
          style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center items-center flex-col">
              Logo
            </div>
            <p className="mt-8 mb-5 text-lg font-bold">CREATE PASSWORD</p>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form className="text-sm">
                    <div className="relative mb-8">
                      <InputText
                        label="New password"
                        type={newPasswordShown ? "text" : "password"}
                        name="new_password"
                        disabled={mutation.isPending}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      {props.values.new_password && (
                        <span
                          className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer"
                          onClick={toggleNewPassword}
                        >
                          {newPasswordShown ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Confirm password"
                        type={confirmPasswordShown ? "text" : "password"}
                        name="confirm_password"
                        disabled={
                          mutation.isPending || props.values.new_password === ""
                        }
                      />
                      {props.values.confirm_password && (
                        <span
                          className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer
                    "
                          onClick={toggleConfirmPassword}
                        >
                          {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={
                          mutation.isPending ||
                          props.values.new_password === "" ||
                          props.values.confirm_password === ""
                        }
                        className="btn-modal-submit relative"
                      >
                        {mutation.isPending ? <ButtonSpinner /> : "Save"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className="py-3 rounded-sm mt-3 mb-6 text-sm">
              <span className="block mb-1 italic">Password Strength</span>

              <div className="w-full flex items-center gap-x-1">
                {lengthValidated ? (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/60 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/60 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                )}

                {upperValidated && lowerValidated ? (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/75 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/75 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/75 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                )}

                {numberValidated && specialValidated ? (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/90 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/90 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/90 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/90 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                    <div className="w-full h-1 flex flex-col justify-center overflow-hidden bg-success/10 text-white text-center whitespace-nowrap transition duration-500"></div>
                  </>
                )}
              </div>
              <ul className="text-sm mt-5">
                <li className="text-body italic flex gap-2 items-center mb-2">
                  <BsCheckCircleFill
                    className={`duration-200 ${
                      lengthValidated ? "fill-green-700" : "opacity-50"
                    }`}
                  />
                  Must have 8 characters
                </li>
                <li className="text-body italic flex gap-2 items-center mb-2">
                  <BsCheckCircleFill
                    className={`duration-200 ${
                      upperValidated ? "fill-green-700" : "opacity-50"
                    }`}
                  />
                  At least 1 uppercase
                </li>
                <li className="text-body italic flex gap-2 items-center mb-2">
                  <BsCheckCircleFill
                    className={`duration-200 ${
                      lowerValidated ? "fill-green-700" : "opacity-50"
                    }`}
                  />
                  At least 1 lowercase
                </li>
                <li className="text-body italic flex gap-2 items-center mb-2">
                  <BsCheckCircleFill
                    className={`duration-200 ${
                      numberValidated ? "fill-green-700" : "opacity-50"
                    }`}
                  />
                  At least 1 number
                </li>
                <li className="text-body italic flex gap-2 items-center mb-1">
                  <BsCheckCircleFill
                    className={`duration-200 ${
                      specialValidated ? "fill-green-700" : "opacity-50"
                    }`}
                  />
                  At least 1 symbol
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePasswordOther;
