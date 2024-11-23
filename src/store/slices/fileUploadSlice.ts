
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileState } from "../../types";



const initialState: FileState = {
  uploadedFiles: [],
  error: null,
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    uploadFile: (state, action: PayloadAction<File>) => {
      state.uploadedFiles.push(action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { uploadFile, setError } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
