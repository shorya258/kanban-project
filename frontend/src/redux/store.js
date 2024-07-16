import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./columnSlice";
const store = configureStore({
  reducer: columnsSlice,
});
export default store;
