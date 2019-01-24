const defaultState = []

export const SET_RECEIPT_VOUCHER = 'SET_RECEIPT_VOUCHER';

export const receiptVoucherReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_RECEIPT_VOUCHER) return result;
    return state;
}