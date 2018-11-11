import { LOG_OUT } from "../actions/user.actions";
import { SET_SERVICE, ADD_SERVICE, UPDATE_SERVICE, REMOVE_SERVICE } from "../actions/service.actions";

const defaultState = [];
export const serviceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SERVICE:
            return action.result;
        case ADD_SERVICE:
            return [action.result, ...state];
        case UPDATE_SERVICE:
            return state.map(v => v._id === action.result._id ? action.result : v);
        case REMOVE_SERVICE:
            return state.filter(v => v._id !== action.result._id);
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}