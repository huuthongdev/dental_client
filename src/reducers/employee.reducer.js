import { LOG_OUT } from "../actions/user.actions";

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const SET_EMPLOYEE_DETAIL = 'SET_EMPLOYEE_DETAIL';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

const defaultState = [];
export const employeeReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_EMPLOYEE) return action.result;
    if (type === CREATE_EMPLOYEE) return [action.result, ...state];
    if (type === SET_EMPLOYEE_DETAIL) return state.map(v => v._id === action.result._id ? action.result : v);
    if (type === UPDATE_EMPLOYEE) return state.map((v, i) => v._id === action.result._id ? { ...action.result, detail: state[i].detail } : v);
    if (type === LOG_OUT) return defaultState;
    return state;
}