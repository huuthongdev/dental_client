export function convertToSave(value, valueToSaveIfYes = value, valueToSaveIfNo = undefined) {
    return value ? valueToSaveIfYes : valueToSaveIfNo;
}
