import { useFormik } from "formik";
import * as yup from "yup";
import { FormInput, Button, Spinner, Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { useRedux } from "@/hooks/useRedux";
import { useEffect } from "react";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import { loginUser, resetLoginState } from "@/redux";
import { emailRegex, passwordRegex } from "@/constant";

export const Login = () => {
  // Login Schema
  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Please Enter Your Email")
      .matches(emailRegex, "Please enter a valid email"),
    password: yup
      .string()
      .required("Please Enter Your Password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, a number and special character"
      ),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: defaultValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const { handleBlur, handleChange, handleSubmit, values } = validation;

  const navigate = useNavigate();
  const { dispatch, useStateSelector } = useRedux();

  // get the login state
  const { isLoggedIn, isLoginReqLoading, loginError, message } =
    useStateSelector((state) => state.Login);

  useEffect(() => {
    if (isLoggedIn) {
      if (message) {
        showSuccessNotification(message);
      }
      dispatch(resetLoginState());
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      if (loginError.includes("locked")) {
        showErrorNotification(
          "Your account has been locked. Please contact admin for fixing",
          3000
        );
      } else {
        showErrorNotification(loginError, 1200);
      }
      dispatch(resetLoginState());
      return;
    }
  }, [loginError]);

  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] max-w-80">
          <h1 className="text-center text-white text-3xl font-bold neue-regular">
            Admin Login
          </h1>
          <p className="text-center text-sm text-gray-400 neue-regular mt-3">
            Login to Kannie Admin
          </p>
          {isLoginReqLoading && <Loader />}
          <form
            className="mt-8 auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              return false;
            }}
          >
            <FormInput
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              placeholder="example@gmail.com"
              validation={validation}
              className="neue-regular text-gray-300"
            />
            <FormInput
              name="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              placeholder="Enter your password"
              validation={validation}
              className="neue-regular text-gray-300"
            />
            <Button
              type="submit"
              className="mt-6 neue-regular"
              disabled={isLoginReqLoading}
            >
              {isLoginReqLoading && <Spinner type="plain" />}
              {isLoginReqLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
