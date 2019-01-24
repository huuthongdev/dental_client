import { SET_BRANCH } from "./branch.reducer";
import { SET_EMPLOYEE } from "./employee.reducer";
import { SET_SERVICE } from "./service.reducer";
import { SET_PRODUCT } from "./product.reducer";
import { SET_CLIENT } from "./client.reducer";
import { SET_TICKETS } from "./ticket.reducer";
import { LOG_OUT } from "./user.reducer";
import { SET_DASHBOARD_INFO } from "./main.reducer";
import { SET_RECEIPT_VOUCHER } from "./receiptVoucher.reducer";

const defaultState = {
    branch: false,
    employee: false,
    service: false,
    product: false,
    client: false,
    ticket: false,
    initData: false,
    receiptVoucher: false,
    dashboardInfo: false
}

export const SET_INIT_DATA = 'SET_INIT_DATA';

export const fetchDataStatusReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_BRANCH) return { ...state, branch: true };
    if (type === SET_EMPLOYEE) return { ...state, employee: true };
    if (type === SET_SERVICE) return { ...state, service: true };
    if (type === SET_PRODUCT) return { ...state, product: true };
    if (type === SET_CLIENT) return { ...state, client: true };
    if (type === SET_TICKETS) return { ...state, ticket: true };
    if (type === SET_INIT_DATA) return { ...state, initData: true };
    if (type === SET_DASHBOARD_INFO) return { ...state, dashboardInfo: true };
    if (type === SET_RECEIPT_VOUCHER) return { ...state, receiptVoucher: true };
    if (type === LOG_OUT) return defaultState;
    return state;
}