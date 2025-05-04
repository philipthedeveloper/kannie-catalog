import {
  AdminContentCard,
  ContentForm,
  MainContent,
  Button,
  Loader,
  ConfirmDeleteContentModal,
} from "@/components";
import { useRedux } from "@/hooks";
import { Content as IContent } from "@/interfaces";
import {
  deleteContent,
  fetchAllContents,
  resetFetchAllContents,
} from "@/redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Content = () => {
  const [isContentFormOpen, setIsContentFormOpen] = React.useState(false);
  const [editData, setEditData] = useState<IContent | null>();

  const openContentForm = () => setIsContentFormOpen(true);

  const closeContentForm = () => {
    setIsContentFormOpen(false);
    setEditData(null);
  };

  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Testimony states
  const {
    fetchingAllContents,
    allContentsFetched,
    fetchAllContentsError,
    contents,
  } = useStateSelector((state) => state.Content);

  // Deletion
  const [contentToBeDeleted, setContentToBeDelete] = useState<IContent | null>(
    null
  );

  useEffect(() => {
    if (!contents) {
      dispatch(fetchAllContents());
    }
  }, []);

  useEffect(() => {
    if (allContentsFetched) {
      dispatch(resetFetchAllContents());
    }
  }, [allContentsFetched]);

  const retryFetchContents = () => dispatch(fetchAllContents());

  const onRequestDelete = (contentToBeDeleted: IContent) => {
    setContentToBeDelete(contentToBeDeleted);
  };

  const cancelDeleteOperation = () => {
    setContentToBeDelete(null);
  };

  const confirmDeletion = () => {
    if (!contentToBeDeleted) return cancelDeleteOperation();
    dispatch(deleteContent(contentToBeDeleted?._id));
  };

  const onRequestEdit = (data: IContent) => {
    setEditData(data);
    openContentForm();
  };

  return (
    <MainContent>
      <div className="flex justify-between flex-end">
        <h1 className="text-white text-3xl neue-regular font-bold">Contents</h1>

        <span
          className={`w-10 h-10 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
          onClick={openContentForm}
        >
          <i className={`text-white flex fi fi-rr-multiple text-xl`}></i>
        </span>
      </div>
      {fetchingAllContents ? (
        <div className="w-full h-full transparent-white">
          <Loader type="brand" />
        </div>
      ) : !allContentsFetched && fetchAllContentsError ? (
        <div
          className="
            flex-1 transparent-white p-4 w-full flex justify-center items-center flex-col gap-3"
        >
          <p className="text-gray-300 neue-regular text-center text-sm">
            An unknown error occured. Please try again
          </p>
          <Button className="max-w-56" onClick={retryFetchContents}>
            <p className="text-white neue-regular text-xl">Retry</p>
          </Button>
        </div>
      ) : contents && contents.length === 0 ? (
        <div
          className="
            flex-1 transparent-white p-4 w-full flex justify-center items-center flex-col gap-3 rounded-sm"
        >
          <p className="text-gray-300 neue-regular text-center text-sm">
            You are yet to upload a content.
          </p>
          <Button className="max-w-56" onClick={openContentForm}>
            <p className="text-white neue-regular text-xl">Upload content</p>
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <ContentsContainer className="testimonies-container grid gap-4 w-full">
            {(contents || []).map((content) => (
              <AdminContentCard
                {...content}
                onRequestDelete={onRequestDelete}
                onRequestEdit={onRequestEdit}
              />
            ))}
          </ContentsContainer>
        </div>
      )}
      {isContentFormOpen && (
        <ContentForm
          onClose={closeContentForm}
          isOpen={isContentFormOpen}
          editData={editData}
        />
      )}

      {contentToBeDeleted && (
        <ConfirmDeleteContentModal
          dataToBeDeleted={contentToBeDeleted}
          isOpen={!!contentToBeDeleted}
          onClose={cancelDeleteOperation}
          confirmDeletion={confirmDeletion}
        />
      )}
    </MainContent>
  );
};

const ContentsContainer = styled.div`
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;
