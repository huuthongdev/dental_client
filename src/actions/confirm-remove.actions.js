export const ON_CONFIRM_REMOVE = 'ON_CONFIRM_REMOVE';
export const onConfirmRemove = (nameRelated, content, objectType, onNext) => {
    return {
        type: ON_CONFIRM_REMOVE,
        nameRelated, content, objectType, onNext
    }
}

export const OFF_CONFIRM_REMOVE = 'OFF_CONFIRM_REMOVE';
export const offConfirmRemove = () => {
    return {
        type: OFF_CONFIRM_REMOVE
    }
}