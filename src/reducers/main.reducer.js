export const LOG_OUT = 'LOG_OUT';
export const SET_TEMP = 'SET_TEMP';

const defaultState = {
    temp: null
};
export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TEMP:
            return { ...state, temp: action.temp }
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}