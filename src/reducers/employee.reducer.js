import { LOG_OUT } from "../actions/user.actions";
import { SET_EMPLOYEE, CREATE_EMPLOYEE, SET_EMPLOYEE_DETAIL, UPDATE_EMPLOYEE } from "../actions/employee.actions";

const defaultState = [];
export const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:
            return action.result;
        case CREATE_EMPLOYEE:
            return [action.result, ...state];
        case SET_EMPLOYEE_DETAIL:
            return state.map(v => v._id === action.result._id ? action.result : v);
        case UPDATE_EMPLOYEE:
            return state.map((v, i) => v._id === action.result._id ? { ...action.result, detail: state[i].detail } : v);
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}