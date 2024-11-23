import { configureStore } from "@reduxjs/toolkit";
import fileUploadReducer from "./slices/fileUploadSlice";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
