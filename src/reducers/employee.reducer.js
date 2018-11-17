import { LOG_OUT } from "../actions/user.actions";
import { SET_EMPLOYEE, CREATE_EMPLOYEE, SET_EMPLOYEE_DETAIL } from "../actions/employee.actions";

const defaultState = [];
export const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:
            return action.result;
        case CREATE_EMPLOYEE:
            return [action.result, ...state];
        case SET_EMPLOYEE_DETAIL:
            return state.map(v => v._id === action.result._id ? action.result : v);
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}