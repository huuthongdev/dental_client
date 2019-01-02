import { LOG_OUT } from "../actions/user.actions";

const defaultState = [];

export const SET_SERVICE = 'SET_SERVICE'; 
export const CREATE_SERVICE = 'CREATE_SERVICE'; 
export const UPDATE_SERVICE = 'UPDATE_SERVICE'; 
export const REMOVE_SERVICE = 'REMOVE_SERVICE'; 

export const serviceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SERVICE:
            return action.result;
        case CREATE_SERVICE:
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