import { LOG_OUT } from "./user.reducer";

const defaultState = [];

export const SET_CALENDAR_DENTIST = 'SET_CALENDAR_DENTIST';

export const calendarDentistReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_CALENDAR_DENTIST) {
        const checkExited = state.find(v => v.dentistId === result.dentistId);
        if (checkExited) return state.map(v => v.dentistId === result.dentistId ? result : v);
        return [...state, result];
    }
    if (type === LOG_OUT) return defaultState;
    return state;
}