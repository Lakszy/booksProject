import { createSlice } from '@reduxjs/toolkit';



const initialObj = {
    cartQty : 0,
    cart : [],
};

const slice = createSlice({
    name: 'ecom',
    initialState: initialObj,
    reducers: {
        addToCart: (state, { payload }) => {
            state.cartQty += 1;
            state.cart.push(payload);
        },
        removeFromCart: (state, { payload }) => {
            state.cartQty -= 1;
            state.cart = state.cart.filter(item => item.id !== payload.id);
        },
        updateCartItem : (state, {payload}) => {
            state.cart = state.cart.map(item => item.id === payload.id ? payload : item);
        },
        setCartReducer : (state, {payload}) => {
            state.cart = payload;
            state.cartQty = payload.length;
        },
        emptyCart : (state) => {
            state.cart = [];
            state.cartQty = 0;
        }
    },
});

export const { addToCart , removeFromCart, updateCartItem, setCartReducer, emptyCart } =
    slice.actions;

export default slice.reducer;



