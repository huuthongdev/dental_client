import { RequestService, Store } from "../refs";
import { SET_RECEIPT_VOUCHER } from "../reducers/receiptVoucher.reducer";

const { dispatch } = Store;

export default class ReceiptVoucherService {
    static async set() {
        return RequestService.get('/receipt-voucher')
            .then(result => dispatch({ type: SET_RECEIPT_VOUCHER, result }))
            .catch(error => console.log(error));
    }
}