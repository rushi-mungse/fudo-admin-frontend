import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartDataType } from "../../types";

interface InitialStateType {
    cart: CartDataType | null;
}

const initialState: InitialStateType = {
    cart: null,
};

interface PayLoad {
    productId: number;
}

export const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addProduct: (state, action: PayloadAction<PayLoad>) => {
            const { productId } = action.payload;

            if (!state.cart) {
                state.cart = {
                    items: {},
                    totalItems: 0,
                };
            }

            if (!state.cart.items[productId]) state.cart.items[productId] = 0;

            state.cart.items[productId] += 1;
            state.cart.totalItems += 1;

            window.localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        clearCart: (state) => {
            state.cart = null;
            window.localStorage.removeItem("cart");
        },

        setCart: (state, action: PayloadAction<CartDataType>) => {
            state.cart = action.payload;
        },
    },
});

export const { addProduct, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
