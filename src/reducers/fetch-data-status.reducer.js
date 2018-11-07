import { SET_BRANCH } from "../actions/branch.actions";
import { SET_EMPLOYEE } from "../actions/employee.actions";
import { LOG_OUT } from "../actions/user.actions";

const defaultState = {
    branch: false,
    employee: false,
    service: false
}

export const fetchDataStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_BRANCH:
            return { ...state, branch: true }
        case SET_EMPLOYEE:
            return { ...state, employee: true }
        case SET_SERVICE:
            return { ...state, service: true }
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}