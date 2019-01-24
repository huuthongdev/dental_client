export const SET_USER_INFO = 'SET_USER_INFO';
export const LOG_OUT = 'LOG_OUT';

const defaultState = {}

export const userReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_USER_INFO) return result;
    if (type === LOG_OUT) return defaultState;
    return state; 
}