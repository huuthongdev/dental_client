import { LOG_OUT } from "./user.reducer";

export const SET_CLIENT = 'SET_CLIENT';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';

const defaultState = { 
    count: null,
    pages: []
}
export const clientReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_CLIENT) {
        const { pageNumber, data, count, forceUpdate } = action;
        if (forceUpdate) return { count, pages: [{ pageNumber, data }] }
        const checkExisted = state.pages.find(v => v.pageNumber === pageNumber);
        if (checkExisted) {
            const ouput = state.pages.map(v => v.pageNumber === pageNumber
                ? v = { ...v, data } : v
            );
            return { count, pages: ouput };
        }
        return { count, pages: [...state.pages, { pageNumber, data }] }
    };
    if (type === CREATE_CLIENT) return [action.result, ...state];
    if (type === UPDATE_CLIENT) return state.map(v => (v._id === action.result._id ? action.result : v));
    if (type === LOG_OUT) return defaultState;
    return state;
}