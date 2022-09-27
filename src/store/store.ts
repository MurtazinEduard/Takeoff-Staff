import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { contactsReducer, IContactSlice } from "./slices/contacts";
import { IUserSlice } from "./types";

const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactsReducer,
    }
})

export default store

export type IState = {
    auth: IUserSlice;
    contacts: IContactSlice;
};

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>