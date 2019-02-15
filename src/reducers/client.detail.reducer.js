import { LOG_OUT } from "./user.reducer";

const defaultState = [];

export const SET_CLIENT_DETAIL = 'SET_CLIENT_DETAIL';

export const clientDetailReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_CLIENT_DETAIL) {
        const check = state.find(v => v._id === result._id);
        // Client fetched
        if (check) return state.map(v => v._id === result._id ? v = result : v);
        // Client initial fetch
        return [action.result, ...state];
    }
    if (type === LOG_OUT) return defaultState;
    return state;
}