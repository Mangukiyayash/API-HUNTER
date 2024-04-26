import { ADD_CART, DELETE_CART } from '../Action';

const initialValue = {
    count: 0
};

export const CartReducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state,
                count: state.count + 1
            };

        case DELETE_CART:
            return {
                ...state,
                count: state.count > 0 ? state.count - 1 : 0
            };

        default:
            return state;
    }
};
