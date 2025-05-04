import { useMemo, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, ContactInput } from "@/components/form";
import { Loader } from "@/components/progress";
import axios from "axios";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: "",
      subject: "",
      email: "",
      message: "",
    }),
    []
  );

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please provide your name")
      .min(2, "Name is too short"),
    subject: yup
      .string()
      .required("Please provide subject")
      .min(4, "Minimum of 4 characters"),
    email: yup
      .string()
      .required("Please provide your email")
      .matches(emailRegex, "Enter a valid email"),
    message: yup.string().required("Please provide your message"),
  });

  const validation = useFormik({
    enableReinitialize: false,
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const { handleBlur, handleChange, resetForm } = validation;

  const submitForm = async (values: any) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        values
      );
      resetForm();
      return toast.success("Email submitted successfully");
    } catch (error) {
      return toast.error("An error occured! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      {submitting && <Loader />}
      <ContactInput
        type={"text"}
        name={"name"}
        label="Name"
        placeholder={"Enter your name"}
        validation={validation}
      />
      <ContactInput
        type={"text"}
        name={"subject"}
        label="Subject"
        placeholder={"Provide subject"}
        validation={validation}
      />
      <ContactInput
        type={"text"}
        name={"email"}
        label="Email"
        placeholder={"Provide your email"}
        validation={validation}
      />
      <ContactInput
        type={"textarea"}
        name={"message"}
        label="Message"
        placeholder={"Enter your message here..."}
        validation={validation}
      />
      <Button className="bg-blue-400 hover:bg-blue-600 py-4">
        Send message
      </Button>
    </form>
  );
};
