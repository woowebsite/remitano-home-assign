import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotifyData } from "./notifySlice";

export const addNotify = createAsyncThunk(
  "notify/addNotifyToList",
  async (notify: NotifyData , { dispatch }) => {
    return notify
  }
);
