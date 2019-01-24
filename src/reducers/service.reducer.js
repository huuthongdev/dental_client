import { LOG_OUT } from "./user.reducer";

const defaultState = [];

export const SET_SERVICE = 'SET_SERVICE'; 
export const CREATE_SERVICE = 'CREATE_SERVICE'; 
export const UPDATE_SERVICE = 'UPDATE_SERVICE'; 
export const REMOVE_SERVICE = 'REMOVE_SERVICE'; 

export const serviceReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_SERVICE) return result;
    if (type === CREATE_SERVICE) return [result, ...state];
    if (type === UPDATE_SERVICE) return state.map(v => v._id === result._id ? result : v);
    if (type === REMOVE_SERVICE) return state.filter(v => v._id !== result._id);
    if (type === LOG_OUT) return defaultState;
    return state;
}