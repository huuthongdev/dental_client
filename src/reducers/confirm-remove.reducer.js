import { ON_CONFIRM_REMOVE, OFF_CONFIRM_REMOVE } from "../actions/confirm-remove.actions";

const defaultState = {
    nameRelated: null,
    onCancel: null,
    content: null,
    objectType: null,
    onNext: null
}
export const confirmRemoveReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ON_CONFIRM_REMOVE:
            return {
                nameRelated: action.nameRelated,
                content: action.content,
                objectType: action.objectType,
                onNext: action.onNext
            }
        case OFF_CONFIRM_REMOVE:
            return defaultState;
        default:
            return state;
    }
}