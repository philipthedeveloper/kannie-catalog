import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateContentRes,
  DeleteContentRes,
  GetAllContentRes,
  GetContentByIdRes,
  IContentState,
  UpdateContentRes,
} from "./interface";
import {
  getContentById as getContentByIdApi,
  getAllContents as getAllContentsApi,
  createContent as createContentApi,
  updateContent as updateContentApi,
  deleteContent as deleteContentApi,
} from "@/api";

const INIT_CONTENT_STATE: IContentState = {
  fetchingAllContents: false,
  allContentsFetched: false,
  fetchAllContentsError: "",
  contents: null,

  creatingContent: false,
  contentCreated: false,
  createContentError: "",
  content: null,

  updatingContent: false,
  contentUpdated: false,
  updateContentError: "",

  deletingContent: false,
  contentDeleted: false,
  deleteContentError: "",

  fetchingContent: false,
  contentFetched: false,
  fetchContentError: "",
};

export const fetchAllContents = createAsyncThunk(
  "FETCH_ALL_TESTIMONIES",
  async (_: void, thunkAPI) => {
    try {
      const response = await getAllContentsApi<GetAllContentRes>();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

export const getContentById = createAsyncThunk(
  "GET_CONTENT_BY_ID",
  async (id: string, thunkAPI) => {
    try {
      const response = await getContentByIdApi<GetContentByIdRes>(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

export const createContent = createAsyncThunk(
  "CREATE_CONTENT",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await createContentApi<CreateContentRes>(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

export const updateContent = createAsyncThunk(
  "UPDATE_CONTENT",
  async ({ id, data }: { id: string; data: FormData }, thunkAPI) => {
    try {
      const response = await updateContentApi<UpdateContentRes>(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

export const deleteContent = createAsyncThunk(
  "DELETE_CONTENT",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteContentApi<DeleteContentRes>(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

const contentSlice = createSlice({
  name: "Content",
  initialState: INIT_CONTENT_STATE,
  reducers: {
    resetContents: (state) => {
      state.contents = [];
    },

    resetFetchAllContents: (state) => {
      state.fetchingAllContents = false;
      state.allContentsFetched = false;
      state.fetchAllContentsError = "";
    },

    resetGetContentById: (state) => {
      state.fetchingContent = false;
      state.contentFetched = false;
      state.fetchContentError = "";
    },

    resetCreateContent: (state) => {
      state.creatingContent = false;
      state.contentCreated = false;
      state.createContentError = "";
    },

    resetUpdateContent: (state) => {
      state.updatingContent = false;
      state.contentUpdated = false;
      state.updateContentError = "";
    },

    resetDeleteContent: (state) => {
      state.deletingContent = false;
      state.contentDeleted = false;
      state.deleteContentError = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllContents.pending, (state) => {
      state.fetchingAllContents = true;
    });
    builder.addCase(fetchAllContents.fulfilled, (state, action) => {
      state.fetchingAllContents = false;
      state.allContentsFetched = true;
      state.contents = action.payload;
    });
    builder.addCase(fetchAllContents.rejected, (state, action) => {
      state.fetchingAllContents = false;
      state.allContentsFetched = false;
      state.fetchAllContentsError = action.payload as string;
    });

    // Get content by id
    builder.addCase(getContentById.pending, (state) => {
      state.fetchingContent = true;
    });
    builder.addCase(getContentById.fulfilled, (state, action) => {
      state.fetchingContent = false;
      state.contentFetched = true;
      state.content = action.payload;
    });
    builder.addCase(getContentById.rejected, (state, action) => {
      state.fetchingContent = false;
      state.contentFetched = false;
      state.fetchContentError = action.payload as string;
    });

    // Create content
    builder.addCase(createContent.pending, (state) => {
      state.creatingContent = true;
    });
    builder.addCase(createContent.fulfilled, (state, action) => {
      state.creatingContent = false;
      state.contentCreated = true;
      state.contents
        ? state.contents.push(action.payload)
        : (state.contents = [action.payload]);
    });
    builder.addCase(createContent.rejected, (state, action) => {
      state.creatingContent = false;
      state.contentCreated = false;
      state.createContentError = action.payload as string;
    });

    // Update content
    builder.addCase(updateContent.pending, (state) => {
      state.updatingContent = true;
    });
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.updatingContent = false;
      state.contentUpdated = true;
      state.contents = (state.contents || []).map((content) => {
        if (content._id === action.payload._id) return action.payload;
        return content;
      });
    });
    builder.addCase(updateContent.rejected, (state, action) => {
      state.updatingContent = false;
      state.contentUpdated = false;
      state.updateContentError = action.payload as string;
    });

    // Delete content
    builder.addCase(deleteContent.pending, (state) => {
      state.deletingContent = true;
    });
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.deletingContent = false;
      state.contentDeleted = true;
      state.contents = (state.contents || []).filter(
        (content) => content._id !== action.payload._id
      );
    });
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.deletingContent = false;
      state.contentDeleted = false;
      state.deleteContentError = action.payload as string;
    });
  },
});

export const contentReducer = contentSlice.reducer;
export const {
  resetContents,
  resetFetchAllContents,
  resetGetContentById,
  resetCreateContent,
  resetUpdateContent,
  resetDeleteContent,
} = contentSlice.actions;
