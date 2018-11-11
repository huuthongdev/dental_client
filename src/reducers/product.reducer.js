import { SET_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from "../actions/product.actions";
import { LOG_OUT } from "../actions/user.actions";

const defaultState = []
export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return action.result;
        case ADD_PRODUCT:
            return [action.result, ...state];
        case UPDATE_PRODUCT:
            return state.map(v => v._id === action.result._id ? action.result : v);
        case REMOVE_PRODUCT:
            return state.filter(v => v._id !== action.result._id);
        case LOG_OUT:
            return defaultState;
        default:
            return state;
    }
}