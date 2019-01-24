import { LOG_OUT } from "./user.reducer";

const defaultState = [];

export const SET_CLIENT_DETAIL = 'SET_CLIENT_DETAIL';

export const clientDetailReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_CLIENT_DETAIL) {
        const check = state.find(v => v._id === action.id);
        // Client fetched
        if (check) return state.map(v => v._id === action._id ? action.result : v);
        // Client initial fetch
        return [action.result, ...state];
    }
    if (type === LOG_OUT) return defaultState;
    return state;
}