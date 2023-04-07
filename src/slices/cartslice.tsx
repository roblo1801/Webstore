import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../store/store";
import Cookies from "js-cookie";

// Define a type for the slice state
interface CartState {
  cartItems: {
    name: string;
    url: string;
    price: number;
    description: string;
  }[];
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initializeCart: (state) => {
      state.cartItems = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart") || "")
        : [];
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      Cookies.set("cart", JSON.stringify(state.cartItems), {
        sameSite: "strict",
      });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems.splice(action.payload, 1);
      Cookies.set("cart", JSON.stringify(state.cartItems), {
        sameSite: "strict",
      });
    },
  },
});

export const { addToCart, removeFromCart, initializeCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const cart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
