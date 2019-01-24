import { LOG_OUT } from "./user.reducer";

const defaultState = {
    method: null,
    objectType: null,
    nameRelated: null,
    content: null,
    onNext: null
}

export const ON_CONFIRM = 'ON_CONFIRM';
export const OFF_CONFIRM = 'OFF_CONFIRM';

export const confirmReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === ON_CONFIRM) return {
        method: action.method,
        objectType: action.objectType,
        nameRelated: action.nameRelated,
        content: action.content,
        onNext: action.onNext
    }
    if (type === OFF_CONFIRM || type === LOG_OUT) return defaultState;
    return state;
}