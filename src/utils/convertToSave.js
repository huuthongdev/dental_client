export function convertToSave(value, valueToSaveIfYes = value, valueToSaveIfNo = '') {
    return value ? valueToSaveIfYes : valueToSaveIfNo;
}
