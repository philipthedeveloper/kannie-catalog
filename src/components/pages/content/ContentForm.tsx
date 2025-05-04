import * as yup from "yup";
import { useFormik } from "formik";
import { FormInput, Button } from "@/components/form";
import { DivWithoutScrollBar, Portal } from "@/components/design";
import { useEffect, useMemo, useState } from "react";
import { useRedux } from "@/hooks/useRedux";
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "@/utils";
import { Spinner, Loader } from "@/components/progress";
import styled from "styled-components";
import { Content } from "@/interfaces";
import {
  createContent,
  resetCreateContent,
  resetUpdateContent,
  updateContent,
} from "@/redux";
import { ContentType } from "@/enums";

interface ContentFormProps {
  onClose: () => void;
  isOpen: boolean;
  editData?: Content | null;
}

interface FileMetaData {
  name: string;
  size: number;
  fullPath: string;
  timeCreated: Date | string;
}

export interface FeaturedImageFileInterface {
  id: string;
  file: File | null;
  url?: string;
  metadata?: FileMetaData;
}

const getDateDetails = (value: string | Date) => {
  const newDate = new Date(value);
  return {
    day: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
  };
};

export const doDatesMatch = (
  dateOne: string | Date,
  dateTwo: string | Date
) => {
  const newDateOne = getDateDetails(dateOne);
  const newDateTwo = getDateDetails(dateTwo);
  return (
    newDateOne.day === newDateTwo.day &&
    newDateOne.month === newDateTwo.month &&
    newDateOne.year === newDateTwo.year
  );
};

export const ContentForm = ({
  onClose,
  isOpen,
  editData,
}: ContentFormProps) => {
  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Testimony state
  const {
    creatingContent,
    contentCreated,
    createContentError,

    updatingContent,
    contentUpdated,
    updateContentError,
  } = useStateSelector((state) => state.Content);

  // File Input State
  const [coverArt, setCoverArt] = useState<File | null | string>(
    editData?.mediaUrl || null
  );

  const [mediaFile, setMediaFile] = useState<File | null | string>(
    editData?.mediaUrl || null
  );

  const defaultValues = useMemo(
    () => ({
      type: editData?.type || ContentType.VIDEO,
      description: editData?.description || "",
      mediaFile: editData?.mediaUrl || "",
      coverArt: editData?.coverArtUrl || "",
    }),
    [editData]
  );

  const contentSchema = yup.object({
    type: yup
      .string()
      .oneOf(Object.values(ContentType), "Invalid content type")
      .required("Please provide content type"),
    description: yup
      .string()
      .required("Please provide description")
      .min(30, "Description should be 30 characters or more"),
    coverArt: yup.string().when("type", {
      is: ContentType.AUDIO,
      then: (schema) =>
        schema.required("Cover art is required for audio content"),
      otherwise: (schema) => schema.notRequired(),
    }),
    mediaFile: yup.string().required("Please provide media file"),
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: defaultValues,
    validationSchema: contentSchema,
    onSubmit: async (values) => {
      // let formData: Record<string, any> = {};
      const formData = new FormData();

      if (editData) {
        console.log(values);
      } else {
        formData.append("type", values.type);
        formData.append("description", values.description);
        formData.append("mediaFile", mediaFile!);
        if (coverArt && values.type === ContentType.AUDIO) {
          formData.append("coverArt", coverArt);
        }
      }

      if (editData) {
        /**
         * @description Prevent form submission if formData
         *  is empty otherwise dipatch the updateTestimony action
         *
         */
        if (Array.from(formData.keys()).length === 0) {
          return showInfoNotification("You haven't made any changes.");
        }
        dispatch(updateContent({ id: editData._id, data: formData }));
      } else {
        dispatch(createContent(formData));
      }
    },
  });

  // File Change Handler
  const handleFileChange = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      switch (e.target.name) {
        case "coverArt":
          setCoverArt(file);
          validation.setFieldValue("coverArt", file.name);
          break;
        case "mediaFile":
          setMediaFile(file);
          validation.setFieldValue("mediaFile", file.name);
          break;
        default:
          break;
      }
    }

    e.target.value = "";
  };

  // Successful testimony posting
  useEffect(() => {
    if (contentCreated) {
      showSuccessNotification("Content created", 1300);
      dispatch(resetCreateContent());
      onClose();
    }
  }, [contentCreated]);

  // Posting testimony error
  useEffect(() => {
    if (createContentError) {
      showErrorNotification(
        createContentError || "An error occured. Please try again",
        1300
      );
      dispatch(resetCreateContent());
    }
  }, [createContentError]);

  // Successful testimony update
  useEffect(() => {
    if (contentUpdated) {
      showSuccessNotification("Content updated", 1300);
      dispatch(resetUpdateContent());
      onClose();
    }
  }, [contentUpdated]);

  // Posting testimony error
  useEffect(() => {
    if (updateContentError) {
      showErrorNotification(
        updateContentError || "An error occured. Please try again",
        1300
      );
      dispatch(resetUpdateContent());
    }
  }, [updateContentError]);

  return (
    <Portal
      onClose={() => onClose()}
      shouldModalCloseOnClick={false}
      modalContentContainerStyle="rounded-md w-[90%] max-w-[950px] max-h-[750px] h-[80%]"
      isOpen={isOpen}
      showBackdropElement={true}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl text-white neue-regular font-bold">
          Content Form
        </h2>
      </div>
      {(creatingContent || updatingContent) && <Loader />}
      <DivWithoutScrollBar className="pb-60 sm:pb-32 h-5/6 overflow-auto relative">
        <form
          className="relative w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Called here!");
            validation.handleSubmit();
            return false;
          }}
        >
          <FormInput
            type="chad-select"
            name="type"
            label="Type"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="~~ Select ~~"
            value={validation.values.type || ""}
            validation={validation}
            options={Object.values(ContentType)}
            defaultValue={ContentType.VIDEO}
            disabled={!!editData}
            className="neue-regular text-gray-300"
          />

          <FormInput
            name="description"
            type="textarea"
            label="description"
            value={validation.values.description || ""}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="Enter customer description"
            validation={validation}
            className="neue-regular text-gray-300 min-h-20"
          />

          <FormInput
            name="mediaFile"
            type="file"
            label="Media Resource"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder={"Choose File"}
            value={validation.values.mediaFile}
            validation={validation}
            accept={
              validation.values.type === ContentType.AUDIO
                ? "audio/*"
                : "video/*"
            }
            hidden={true}
            handleFileChange={handleFileChange}
            disabled={!validation.values.type}
            className="neue-regular text-gray-300"
          />

          {validation.values.type === ContentType.AUDIO && !coverArt && (
            <FormInput
              name="coverArt"
              type="file"
              label="Cover art"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder={"Choose Image"}
              value={validation.values.coverArt}
              validation={validation}
              accept=".jpeg, .jpg, .png"
              hidden={true}
              handleFileChange={handleFileChange}
              disabled={!validation.values.type}
              className="neue-regular text-gray-300"
            />
          )}

          {coverArt && validation.values.type === ContentType.AUDIO && (
            <div className="flex gap-4 items-start">
              <button
                className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
                type={"button"}
                onClick={() => {
                  setCoverArt(null);
                  validation.setFieldValue("coverArt", "");
                }}
              >
                {typeof coverArt !== "string" ? (
                  <i
                    className={`text-white flex fi fi-rr-trash-xmark text-sm`}
                  ></i>
                ) : (
                  <i
                    className={`text-white flex fi fi-rr-minus-small text-sm`}
                  ></i>
                )}
              </button>
              <img
                src={
                  typeof coverArt === "string"
                    ? coverArt
                    : URL.createObjectURL(coverArt)
                }
                className="w-full h-auto min-h-56 max-h-64 rounded-md object-contain overflow-hidden"
              />
            </div>
          )}

          {/* 
            ACTION BUTTONS
          */}
          <div className="mt-8 col-span-full">
            <Button
              type="submit"
              className="bg-[var(--base-color)]"
              disabled={creatingContent || updatingContent}
            >
              {creatingContent && <Spinner type="plain" />}
              {!editData &&
                (creatingContent ? "Creating..." : "Upload content")}
              {editData && (updatingContent ? "Updating..." : "Update content")}
            </Button>
          </div>
        </form>
      </DivWithoutScrollBar>
    </Portal>
  );
};
