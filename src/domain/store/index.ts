import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../slice/profile";

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer
    }
})

export type IRootType = ReturnType<typeof store.getState>;

export default store