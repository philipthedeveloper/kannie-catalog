import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { FormFeedback } from "../FormFeedback";

type FormGroupProps = {
  name: string;
  placeholder: string;
  label: string;
  type?: "text" | "textarea";
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  validation: Pick<
    ReturnType<typeof useFormik>,
    "handleChange" | "handleBlur" | "errors" | "touched" | "errors"
  >;
};

export const ContactInput = ({
  label,
  placeholder,
  name,
  type,
  labelClassName,
  inputClassName,
  validation,
  disabled,
}: FormGroupProps) => {
  switch (type) {
    case "textarea":
      return (
        <div className="flex flex-col">
          <label
            className={cn(
              "font-jost font-semibold text-sm text-gray-800 mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
          <textarea
            placeholder={placeholder}
            name={name}
            id={name}
            rows={7}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            disabled={disabled}
            className={cn(
              "px-4 py-4 font-jost text-gray-800 bg-white rounded-[8px] border border-gray-300 outline-none placeholder:text-[#5E6366]",
              inputClassName
            )}
          />
          {validation.touched[name] && validation.errors[name] ? (
            <FormFeedback type="invalid" className="font-jost">
              {validation.errors[name] as string}
            </FormFeedback>
          ) : null}
        </div>
      );
    default:
      return (
        <div className="flex flex-col">
          <label
            className={cn(
              "font-jost font-semibold text-sm text-gray-800 mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
          <input
            placeholder={placeholder}
            name={name}
            id={name}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            disabled={disabled}
            className={cn(
              "px-4 py-3 font-jost text-gray-800 bg-white border border-gray-300 rounded-[8px] outline-none placeholder:text-[#5E6366]",
              inputClassName
            )}
          />
          {validation.touched[name] && validation.errors[name] ? (
            <FormFeedback type="invalid" className="font-jost">
              {validation.errors[name] as string}
            </FormFeedback>
          ) : null}
        </div>
      );
  }
};
