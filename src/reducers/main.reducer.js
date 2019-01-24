import { LOG_OUT } from "./user.reducer";

export const SET_TEMP = 'SET_TEMP';

const defaultState = {
    temp: null,
    dashboardInfo: null
};

export const SET_DASHBOARD_INFO = 'SET_DASHBOARD_INFO';

export const mainReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_TEMP) return { ...state, temp: action.temp }
    if (type === SET_DASHBOARD_INFO) return { ...state, dashboardInfo: result }
    if (type === LOG_OUT) return defaultState;
    return state;
}