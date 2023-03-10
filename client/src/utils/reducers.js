import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    TOGGLE_CART
} from "./actions";

const initialState = {
    products: [],
    categories: [],
    currentCategory: [],
    cart: [],
    cartOpen: []
}

export const reducers = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PRODUCTS:
            return{
                ...state,
                products: [...action.products],
                };

            case UPDATE_CATEGORIES:
                return {
                    ...state,
                    categories: [...action.categories],
                };

            case UPDATE_CURRENT_CATEGORY:
                return{
                    ...state,
                    currentCategory: action.currentCategory,
                };

            case UPDATE_CART_QUANTITY:
                return{
                    ...state,
                    cartOpen: true,
                    cart: state.cart.map(product => {
                        if( action._id === product._id) {
                            product.purchaseQuantity = action.purchaseQuantity;
                        }
                        return product
                    })
                };

            case ADD_TO_CART:
                return{
                    ...state,
                    cartOpen: true,
                    cart: [...state.cart, action.product],
                };
                
            case ADD_MULTIPLE_TO_CART:
                return{
                    ...state,
                    cart: [...state.cart, ...action.products],
                };
            
            case REMOVE_FROM_CART:
            let updatedState = state.cart.filter(product => {
                return product._id !== action._id;
                });

                return {
                    ...state,
                    cartOpen: updatedState.length > 0,
                    cart: updatedState
                };
            
            case EMPTY_CART:
                return{
                    ...state,
                    cartOpen: false,
                    cart: [],
                };
            
            case TOGGLE_CART:
                return{
                    ...state,
                    cartOpen: !state.cartOpen,
                };

                default: 
                return state;
        
    }
};


export function useProductReducer(initialState) {
    return useReducer(reducers, initialState)
  }
  