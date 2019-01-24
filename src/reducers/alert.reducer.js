import { LOG_OUT } from "./user.reducer";

export const CREATE_ALERT = 'CREATE_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REMOVE_ALERT_ALL = 'REMOVE_ALERT_ALL';

const defaultState = [];

export const alertReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === CREATE_ALERT) return [action.result, ...state];
    if (type === REMOVE_ALERT) return state.filter(v => v._id !== action._id);
    if (type === LOG_OUT || type === REMOVE_ALERT_ALL) return defaultState;
    return state;
}