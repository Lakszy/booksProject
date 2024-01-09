import { createSlice } from '@reduxjs/toolkit';



const initialObj = {
    cartQty : 0,
    cart : [],
    categories : [],
    productIds : [],
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
            state.productIds = payload.line_items.map(item => item.product_id);
            state.cartQty = payload.total_unique_items;
        },
        emptyCart : (state) => {
            state.cart = [];
            state.cartQty = 0;
        },
        setCategories : (state, {payload}) => {
            state.categories = payload;
        },
        setProductIds : (state, {payload}) => {
            state.productIds = payload;
            state.cartQty = payload.length;
        }
    },
});

export const { addToCart , removeFromCart, updateCartItem, setCartReducer, emptyCart,setCategories,setProductIds } =
    slice.actions;

export default slice.reducer;



