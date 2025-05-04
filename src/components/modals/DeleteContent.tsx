import { DivWithoutScrollBar, Portal } from "../design";
import { useEffect } from "react";
import { useRedux } from "@/hooks";
import { updateErrorToast, updateSuccessToast } from "@/utils";
import { resetDeleteContent } from "@/redux";
import { Content } from "@/interfaces";
import { Loader } from "../progress";
import { toast } from "react-toastify";

const dataDeletionToastId = "kwerdf0u2490werdfsdfml";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  isOpen: boolean;
  dataToBeDeleted: Content;
  confirmDeletion: () => any;
}

export const ConfirmDeleteContentModal = ({
  onClose,
  isOpen,
  dataToBeDeleted,
  confirmDeletion,
}: ConfirmDeleteModalProps) => {
  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Product state
  const { deletingContent, contentDeleted, deleteContentError } =
    useStateSelector((state) => state.Content);

  // Successfully delete data
  useEffect(() => {
    if (contentDeleted) {
      updateSuccessToast(dataDeletionToastId, "Content deleted", 1300);
      dispatch(resetDeleteContent());
      onClose();
    }
  }, [contentDeleted]);

  // Delete data error
  useEffect(() => {
    if (deleteContentError) {
      updateErrorToast(dataDeletionToastId, deleteContentError, 1300);
      dispatch(resetDeleteContent());
    }
  }, [deleteContentError]);

  const confirmDataDeletion = () => {
    confirmDeletion();
    toast.loading(`Deleting...`, { toastId: dataDeletionToastId });
  };

  return (
    <Portal
      onClose={() => onClose()}
      shouldModalCloseOnClick={false}
      modalContentContainerStyle="rounded-md w-[90%] max-w-[400px] max-h-[220px] h-[85%] md:p-4 md:px-8 p-4 px-6 lg:px-6 lg:p-4"
      isOpen={isOpen}
      showBackdropElement={true}
      hideCloseModalButton={true}
      inlineModalContentStyle={{
        maxWidth: "400px",
        maxHeight: "210px",
        borderRadius: "0.75rem",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white neue-regular font-bold">
          Delete Product
        </h2>
      </div>
      {deletingContent && <Loader />}
      <DivWithoutScrollBar className="pb-60 sm:pb-32 h-5/6 overflow-auto relative">
        <div className="flex flex-col gap-2">
          <p className="text-white neue-regular text-sm">
            Are you sure you want to delete this content? This action cannot be
            undone.
          </p>
          <div className="flex items-center self-end gap-4 mt-3">
            <button
              className="text-white px-6 py-2 bg-gray-800 hover:bg-gray-700 transition-all duration-400 rounded-md"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className="text-white px-6 py-2 bg-red-700 hover:bg-red-900 transition-all duration-400 rounded-md"
              onClick={() => confirmDataDeletion()}
            >
              Delete
            </button>
          </div>
        </div>
      </DivWithoutScrollBar>
    </Portal>
  );
};
