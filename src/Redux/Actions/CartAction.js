import {DELETE_CART ,ADD_CART} from "../Action";

export const addToCart = (productDetails) => {
    return {
        type: ADD_CART,
        payload: productDetails,
    };
};

export const deleteCart = (productId) => {
    return {
        type: DELETE_CART,
        payload: productId, 
    };
};
