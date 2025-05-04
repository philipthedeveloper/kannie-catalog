import { ApiResponse, Content } from "@/interfaces";

export interface IContentState {
  fetchingAllContents: boolean;
  allContentsFetched: boolean;
  fetchAllContentsError: string;
  contents: Content[] | null;

  creatingContent: boolean;
  contentCreated: boolean;
  createContentError: string;
  content: Content | null;

  updatingContent: boolean;
  contentUpdated: boolean;
  updateContentError: string;

  deletingContent: boolean;
  contentDeleted: boolean;
  deleteContentError: string;

  fetchingContent: boolean;
  contentFetched: boolean;
  fetchContentError: string;
}

type MetaData = {
  pages: number;
  prev: boolean;
  next: boolean;
  total: number;
  page: number;
  limit: number;
};

type AllContentData = {
  data: Content[];
  meta: MetaData;
};

export interface GetAllContentRes extends Omit<ApiResponse, "message"> {
  data: AllContentData;
}

export interface GetContentByIdRes extends Omit<ApiResponse, "message"> {
  data: Content;
}

export type CreateContentRes = GetContentByIdRes;

export type DeleteContentRes = GetContentByIdRes;

export type UpdateContentRes = GetContentByIdRes;
