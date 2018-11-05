import { SET_USER_INFO, LOG_OUT } from "../actions/user.actions";

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