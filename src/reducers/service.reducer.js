import { LOG_OUT } from "../actions/user.actions";

const defaultState = [];
export const serviceReducer = (state = defaultState, action) => {
    switch (action.type) {
        // case SET_EMPLOYEE:
        //     return action.result;
        // case ADD_EMPLOYEE:
        //     return [action.result, ...state];
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}