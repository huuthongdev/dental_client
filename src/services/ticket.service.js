import { Store, RequestService, AlertService } from "../refs";
import { SET_TICKETS, CREATE_TICKET } from "../reducers/ticket.reducer";
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
            .then(async result => {
                AlertService.success(`Đã đặt lịch hẹn cho khách hàng ${clientName}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }
}