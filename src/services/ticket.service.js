import { Store, RequestService, AlertService, MainService } from "../refs";
import { SET_TICKETS } from "../reducers/ticket.reducer";
import { SET_CLIENT_DETAIL } from "../reducers/client.detail.reducer";

const { dispatch } = Store;
export default class TicketService {
    static async set() {
        return RequestService.get('/ticket')
            .then(result => dispatch({ type: SET_TICKETS, result }))
            .catch(error => AlertService.error(error.message));
    }

    static async create(payload) {
        return RequestService.post('/ticket', payload)
            .then(async result => {
                dispatch({ type: SET_CLIENT_DETAIL, result });
                MainService.getMainDashboadInfo();
                AlertService.success(`Đã tạo phiếu cho khách hàng ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async update(ticketId, dentistId, items, createAt, discountAmount) {
        return RequestService.put('/ticket/' + ticketId, { dentistId, items, createAt, discountAmount })
            .then(async result => {
                dispatch({ type: SET_CLIENT_DETAIL, result });
                AlertService.success(`Đã tạo phiếu cho khách hàng ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async createCalendarForTicket(payload, clientName) {
        return await RequestService.post('/calendar-dentist', payload)
            .then(result => {
                AlertService.success(`Đã đặt lịch hẹn cho khách hàng ${clientName}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async payment(payload) {
        return RequestService.post('/receipt-voucher/ticket', payload)
            .then(result => {
                MainService.getMainDashboadInfo();
                AlertService.success(`Thanh toán thành công`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            });
    }

    static async changeStatus(_id, status) {
        return RequestService.put('/ticket/status/' + _id, { status })
            .then(result => {
                dispatch({ type: SET_CLIENT_DETAIL, result });
                AlertService.success(`Cập nhật hồ sơ thành công`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            })
    }
}