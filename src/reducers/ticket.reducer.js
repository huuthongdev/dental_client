import { LOG_OUT } from "./user.reducer";

const defaultState = []

export const SET_TICKETS = 'SET_TICKETS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const REMOVE_TICKET = 'REMOVE_TICKET';

export const ticketReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_TICKETS) return action.result;
    if (type === CREATE_TICKET) return [action.result, ...state];
    if (type === UPDATE_TICKET) return state.map((v, i) => (v._id === action.result._id ? { ...action.result, detail: state[i].detail } : v));
    if (type === REMOVE_TICKET) return state.filter(v => v._id !== action.result._id);
    if (type === LOG_OUT) return defaultState;
    return state;
}