const defaultState = {
    count: null,
    pages: []
}

export const SET_RECEIPT_VOUCHER = 'SET_RECEIPT_VOUCHER';

export const receiptVoucherReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_RECEIPT_VOUCHER) {
        const { pageNumber, data, count, forceUpdate } = action;
        if (forceUpdate) return { count, pages: [{ pageNumber, data }] }
        const checkExisted = state.pages.find(v => v.pageNumber === pageNumber);
        if (checkExisted) {
            const ouput = state.pages.map(v => v.pageNumber === pageNumber
                ? v = { ...v, data } : v
            );
            return { count, pages: ouput };
        }
        return { count, pages: [...state.pages, { pageNumber, data }] }
    };
    return state;
}