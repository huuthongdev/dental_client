import React, { Component, Fragment } from 'react';
import moment from 'moment'
import 'moment/locale/vi';
import Calendar from "react-big-calendar";
import { TicketDetailCalendarPopupAdd, TicketService } from '../../../../refs';
// import { TicketDetailCalendarRow } from '../../../../refs';
moment.locale('vi');
const localizer = Calendar.momentLocalizer(moment);

class TicketDetailCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPopupAdd: false,
            events: [],
            isSubmitting: false,
            dentistSelected: null,
        }
    }

    getInitialEvents() {
        const { calendar, dentistResponsible } = this.props.ticket;
        this.setState({
            events: calendar.map(v => {
                const checkOutOfDate = v.endTime < Date.now();
                return {
                    _id: v._id,
                    start: new Date(v.startTime),
                    end: new Date(v.endTime),
                    title: `BS: ${dentistResponsible.name} - ${v.content} ${checkOutOfDate ? '(Hết hạn)' : ''}`,
                    ...v
                }
            })
        });
    }

    componentWillMount() {
        const { dentistResponsible } = this.props.ticket;
        this.getInitialEvents();
        this.setState({
            dentistSelected: {
                label: `BS: ${dentistResponsible.name}`,
                value: dentistResponsible._id
            },
        });
    }

    updateTitle(title) {
        // const { events } = this.state;
        // this.setState({ events: [{ ...events[0], title }], isShowPopupAdd: false });
    }

    addEvent(data) {
        const { events } = this.state;
        const { title, start, end } = data;
        const { dentistResponsible, _id, client } = this.props.ticket;
        this.setState({
            events: events.map(v => v.isAdded ? { ...v, title: 'Đang lưu...' } : v),
            isShowPopupAdd: false,
            isSubmitting: true
        });

        const payload = {
            startTime: new Date(start).getTime(),
            endTime: new Date(end).getTime(),
            dentistId: dentistResponsible._id,
            ticketId: _id,
            content: title
        }

        TicketService.createCalendarForTicket(payload, client.name)
            .then(async success => {
                if (success) {
                    await TicketService.getDetail(_id);
                    return this.setState({
                        events: events.map(v => v.isAdded ? { ...v, title, isAdded: false } : v),
                        isSubmitting: false
                    });
                };
                this.setState({
                    isSubmitting: false,
                    events: events.filter(v => !v.isAdded)
                })
            });
    }

    handleSubmit = () => {
        this.setState({ isSubmitting: true });
        const { dentistResponsible, _id, client } = this.props.ticket;
        const { start, end, title } = this.state.events[0];
        const payload = {
            startTime: new Date(start).getTime(),
            endTime: new Date(end).getTime(),
            dentistId: dentistResponsible._id,
            ticketId: _id,
            content: title
        };
        TicketService.createCalendarForTicket(payload, client.name)
            .then(async success => {
                if (success) {
                    await TicketService.getDetail(_id);
                    return this.props.goBack();
                };
                this.setState({ isSubmitting: false })
            });
    }

    render() {
        const { dentistResponsible } = this.props.ticket;
        const { isShowPopupAdd, events, isSubmitting } = this.state;

        const eventSelected = events.find(v => v.isSelected);

        return (
            <Fragment>
                <div className="cpn-detail-box-wraper">
                    <Calendar
                        className="time-table"
                        selectable={!isSubmitting}
                        showMultiDayTimes
                        localizer={localizer}
                        defaultDate={(() => {
                            const now = new Date();
                            const y = now.getFullYear();
                            const m = now.getMonth();
                            const d = now.getDate();
                            return new Date(y, m, d, 6, 30, 0, 0);
                        })()}
                        defaultView="week"
                        events={this.state.events}
                        style={{ height: "447px" }}
                        culture="vi"
                        step={15}
                        length={120}
                        onDoubleClickEvent={event => {
                            this.setState({ isShowPopupAdd: event });
                        }}
                        eventPropGetter={event => {
                            if (event.isAdded) return { className: 'isAdded' }
                            if (new Date(event.end) < Date.now()) return { className: 'out-off-date' };
                            if (event.status === 'PENDING') return { className: 'pending' };
                            if (event.status === 'DONE') return { className: 'done' };
                            if (event.status === 'WORKING') return { className: 'working' };
                            return {};
                        }}
                        onSelectSlot={data => {
                            // Validate Time
                            const { events } = this.state;
                            const { start, end } = data;
                            const check = events.every(v => {
                                const condition1 = start <= v.start && end <= v.start;
                                const condition2 = start >= v.end && end >= v.end;
                                return condition1 || condition2;
                            });
                            if (!check) return alert('Lỗi: trùng giờ hẹn với các lịch khác!');
                            // Open Popup
                            this.setState({
                                isShowPopupAdd: data,
                                events: [{ ...data, isAdded: true }, ...events]
                            });
                        }}
                        views={["week", "day", "agenda"]}
                        messages={{
                            allDay: 'Tất cả',
                            previous: '<',
                            next: '>',
                            today: 'Hôm nay',
                            month: 'Tháng',
                            week: 'Tuần',
                            day: 'Ngày',
                            agenda: 'Danh sách',
                            date: 'Date',
                            time: 'Thời gian',
                            event: 'Nội dung',
                            noEventsInRange: 'Không có lịch hẹn nào vào khung thời gian này'
                        }}
                        formats={{
                            dateFormat: 'dd',
                            dayRangeHeaderFormat: ({ start, end }) => {
                                const startTime = new Date(start).toLocaleDateString('en-GB');
                                const endTime = new Date(end).toLocaleDateString('en-GB');
                                return `${startTime} - ${endTime}`;
                            },
                            dayHeaderFormat: (day) => {
                                let nameDay;
                                const dayNum = new Date(day).getDay() + 1;
                                if (dayNum === 1) nameDay = 'Chủ nhật';
                                if (dayNum !== 1) nameDay = `Thứ ${dayNum}`;
                                return `${nameDay} - ${new Date(day).toLocaleDateString('en-GB')}`;
                            },
                            agendaDateFormat: (day) => {
                                let nameDay;
                                const dayNum = new Date(day).getDay() + 1;
                                if (dayNum === 1) nameDay = 'Chủ nhật';
                                if (dayNum !== 1) nameDay = `Thứ ${dayNum}`;
                                return `${nameDay} - ${new Date(day).toLocaleDateString('en-GB')}`;
                            }
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}

export default TicketDetailCalendar;