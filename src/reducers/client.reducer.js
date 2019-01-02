import { LOG_OUT } from "./user.reducer";

export const SET_CLIENT = 'SET_CLIENT';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const SET_CLIENT_DETAIL = 'SET_CLIENT_DETAIL';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';

const defaultState = []
export const clientReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_CLIENT) return action.result;
    if (type === CREATE_CLIENT) return [action.result, ...state];
    if (type === SET_CLIENT_DETAIL) return state.map(v => (v._id === action.result._id ? action.result : v));
    if (type === UPDATE_CLIENT) return state.map(v => (v._id === action.result._id ? action.result : v));
    if (type === LOG_OUT) return defaultState;
    return state;
}