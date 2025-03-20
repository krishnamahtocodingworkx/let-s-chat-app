import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/AuthSlice";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";

/**
 * @name store
 * @description store for redux state management along persistor on auth and logger
 * @returns store for global state management
 */

const rootReducer = combineReducers({
  // combining all slices to root Reducer
  auth: authReducer,
});

const logger = createLogger({
  // add logger for development mode only
  predicate: () => process.env.NODE_ENV === "development",
});

const persistConfig = {
  // persisting auth reducer
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * @name store
 * @description store for App with middleware
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
