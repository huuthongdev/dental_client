import { Store, RequestService, AlertService, ClientService } from "../refs";
import { SET_TICKETS, CREATE_TICKET, UPDATE_TICKET } from "../reducers/ticket.reducer";
import { SET_TICKET_DETAIL } from "../reducers/ticket.detail.reducer";

const { dispatch } = Store;

export default class TicketService {
    static async set() {
        return RequestService.get('/ticket')
            .then(result => dispatch({ type: SET_TICKETS, result }))
            .catch(error => AlertService.error(error.message));
    }

    static async create(payload) {
        return RequestService.post('/ticket', payload)
            .then(result => {
                dispatch({ type: CREATE_TICKET, result })
                AlertService.success(`Đã tạo phiếu cho khách hàng ${result.client.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async getDetail(_id) {
        return RequestService.get('/ticket/' + _id)
            .then(result => {
                dispatch({ type: SET_TICKET_DETAIL, result });
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            });
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
            .then(async () => {
                await this.getDetail(payload.ticketId);
                await this.set();
                AlertService.success(`Thanh toán thành công`);
                return true;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            });
    }

    static async changeStatus(_id, status, clientId) {
        return RequestService.put('/ticket/status/' + _id, { status })
            .then(async (result) => {
                await ClientService.getDetail(clientId);
                AlertService.success(`Cập nhật hồ sơ: #${result.sid} thành công`);
                dispatch({ type: UPDATE_TICKET, result });
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            })
    }
}