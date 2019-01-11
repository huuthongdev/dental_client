const defaultState = {}

export const SET_CALENDAR_DENTIST = 'SET_CALENDAR_DENTIST';

export const calendarDentistReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_CALENDAR_DENTIST) {
        
    }
    return state;
}