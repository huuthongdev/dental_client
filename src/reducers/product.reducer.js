import { LOG_OUT } from "../actions/user.actions";

export const SET_PRODUCT = 'SET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const defaultState = []
export const productReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_PRODUCT) return action.result;
    if (type === CREATE_PRODUCT) return [action.result, ...state];
    if (type === UPDATE_PRODUCT) return state.map(v => v._id === action.result._id ? action.result : v);
    if (type === REMOVE_PRODUCT) return state.filter(v => v._id !== action.result._id);
    if (type === LOG_OUT) return defaultState;
    return state;
}