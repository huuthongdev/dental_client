import { Store, RequestService, AlertService, TicketService, MainService } from "../refs";
import { SET_CALENDAR_DENTIST } from '../reducers/calendarDentist.reducer'

const { dispatch } = Store;

export default class CalendarDentistService {
    static async get(dentistId) {
        return RequestService.get('/calendar-dentist/' + dentistId)
            .then(result => {
                dispatch({ type: SET_CALENDAR_DENTIST, result });
                return result;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }

    static async create(payload) {
        return RequestService.post('/calendar-dentist', payload)
            .then(async () => {
                await this.get(payload.dentistId);
                await TicketService.getDetail(payload.ticketId);
                AlertService.success(`Tạo lịch hẹn thành công`);
                MainService.getMainDashboadInfo();
                return true;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async changeStatus(_id, status) {
        return RequestService.put('/calendar-dentist/change-status/' + _id, { status })
            .then(async () => {
                await MainService.getMainDashboadInfo();
                AlertService.success('Cập nhật thành công');
                return true;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            })
    }

    static convertStatus(status) {
        if (status === 'PENDING') return 'Đợi...';
        if (status === 'WORKING') return 'Đang điều trị...';
        if (status === 'DONE') return 'Hoàn thành';
        return 'INVALID';
    }
}