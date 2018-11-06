import { LOG_OUT } from "../actions/user.actions";
import { SET_EMPLOYEE, ADD_EMPLOYEE } from "../actions/employee.actions";

const defaultState = [];
export const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:
            return action.result;
        case ADD_EMPLOYEE:
            return [action.result, ...state];
        // case UPDATE_EMPLOYEE:
        //     return state.map(v => v._id === action.result._id ? action.result : v);
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}