import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/otp";
import authReducer from "./slices/auth";
import cartSlice from "./slices/cart";

const store = configureStore({
    reducer: { otpReducer, authReducer, cartSlice },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
export { type AppDispatch, type RootState, type AppThunk };
