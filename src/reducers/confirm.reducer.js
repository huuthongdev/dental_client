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
    switch (action.type) {
        case ON_CONFIRM:
            return {
                method: action.method,
                objectType: action.objectType,
                nameRelated: action.nameRelated,
                content: action.content,
                onNext: action.onNext
            }
        case OFF_CONFIRM:
            return defaultState;
        default:
            return state;
    }
}