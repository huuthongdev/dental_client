import { RequestService, Store, AlertService, ITEMS_PER_PAGE } from "../refs";
import { SET_RECEIPT_VOUCHER } from "../reducers/receiptVoucher.reducer";

const { dispatch } = Store;

export default class ReceiptVoucherService {
    static async set(offset = 0, pageNumber = 1, forceUpdate = false) {
        return RequestService.get('/receipt-voucher', { offset, limit: ITEMS_PER_PAGE, forceUpdate })
            .then(result => {
                dispatch({
                    type: SET_RECEIPT_VOUCHER,
                    data: result.data,
                    count: result.count,
                    pageNumber,
                    forceUpdate
                });
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            });
    }
}