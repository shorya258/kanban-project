import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./columnSlice";
const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
  },
});
export default store;
