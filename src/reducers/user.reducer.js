export const SET_USER_INFO = 'SET_USER_INFO';
export const LOG_OUT = 'LOG_OUT';

const defaultState = {}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.result;
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}