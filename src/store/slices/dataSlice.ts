import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {invoiceData} from "../../types/index"

  const initialState: invoiceData[] = [];
  
  const customersSlice = createSlice({
    name: "invoiceData",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<invoiceData[]>) => {
            console.log(action.payload);
            return action.payload; 
          },
          updateDataField: (state, action) => {
            const { index, field, value } = action.payload;
          
            // Dynamically update the specific field in the target row
            if (state[index]) {
              (state[index] as any)[field] = value;
            }
          },
          
    },
  });
  
  export const { updateDataField,setData } = customersSlice.actions;
  export default customersSlice.reducer;
  
