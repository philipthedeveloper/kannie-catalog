import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

export const getAllContents = <ResData>() => {
  return api.get<ResData>(url.GET_ALL_CONTENTS);
};

export const getContentById = <ResData>(id: string) => {
  return api.get<ResData>(`${url.GET_CONTENT_BY_ID}/${id}`);
};

export const createContent = <ResData>(data: FormData) => {
  return api.createWithFile<ResData>(url.CREATE_CONTENT, data, "form-data");
};

export const updateContent = <ResData>(id: string, data: FormData) => {
  return api.updateWithFile<ResData>(
    `${url.UPDATE_CONTENT}/${id}`,
    data,
    "form-data"
  );
};

export const deleteContent = <ResData>(id: string) => {
  return api.delete<ResData>(`${url.DELETE_CONTENT}/${id}`);
};
