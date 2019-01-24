import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { CpnPopupWraper, CpnSvg, CalendarDentistService, calendarSetting, SubmitButtonsGroup, CpnFetchingData } from '../../../../refs';

import moment from 'moment'
import 'moment/locale/vi';
import Calendar from "react-big-calendar";
moment.locale('vi');
const localizer = Calendar.momentLocalizer(moment);

class ScreenDashboardTicketDetailCalendarPopupAdd extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            events: [],
            fetchingCalendarDentist: true,
            calendarDentistSelected: null,
            dentistResponsible: null,
            loading: false,
            isSelected: false
        }
    }

    componentDidMount() {
        const { dentistResponsible } = this.props;
        this.fetchDentistCalendar(dentistResponsible._id);
    }

    setEvents = (calendar) => {
        this.setState({
            fetchingCalendarDentist: false,
            events: calendar.map(v => {
                return {
                    _id: v._id,
                    start: new Date(v.startTime),
                    end: new Date(v.endTime),
                    title: `KH: ${v.ticket.client.name} - ${v.content}`,
                    ...v
                }
            })
        });
    }

    fetchDentistCalendar = (_id) => {
        this.setState({ fetchingCalendarDentist: true });
        const { calendarDentist } = this.props;
        const checkExisted = calendarDentist.find(v => v.dentistId === _id);
        if (checkExisted) return this.setEvents(checkExisted.calendar);
        CalendarDentistService.get(_id)
            .then(result => this.setEvents(result.calendar));
    }

    addEvent = (data) => {
        const title = window.prompt('Nhập nội dung điều trị');
        if (!title) return;
        const { events } = this.state;
        const ouput = events.filter(v => !v.isAdded);
        return this.setState({
            events: [...ouput, { ...data, title, isAdded: true }],
            isSelected: true
        });
    }

    handleSubmitEvent = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { dentistResponsible, ticketId } = this.props;
        const event = this.state.events.find(v => v.isAdded);
        const payload = {
            startTime: new Date(event.start).getTime(),
            endTime: new Date(event.end).getTime(),
            dentistId: dentistResponsible._id,
            ticketId,
            content: event.title
        }
        CalendarDentistService.create(payload)
            .then(success => {
                this.setState({ loading: false });
                if (success) return this.props.goBack();
            })
    }

    render() {
        const { employee, dentistResponsible } = this.props;
        const { fetchingCalendarDentist, events, isSelected, loading } = this.state;

        const dentistArr = employee.filter(v => {
            const currentBranchId = localStorage.getItem("BRANCH");
            return v.roleInBranchs && v.roleInBranchs.find(v => v.branch._id === currentBranchId
                && (v.roles.includes('DENTIST')
                    || v.roles.includes('DENTISTS_MANAGER')));
        });

        return (
            <CpnPopupWraper {...this.props} id="ticket-detail-calendar-popup-add">
                <div className="cpn-popup-title cpn-form">
                    <div className="container-fluid mb-1">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <CpnSvg name="DATE" />
                                    Thông tin lịch hẹn
                            </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.props.goBack()} className="cpn-form-close">
                                    <CpnSvg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">

                        <form className="form" onSubmit={(e) => this.handleSubmitEvent(e)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={`form-group required`}>
                                        <label>Bác sĩ điều trị:</label>
                                        <Select
                                            defaultValue={{ label: `BS: ${dentistResponsible.name}`, value: dentistResponsible }}
                                            options={dentistArr.map(v => v = { label: `BS: ${v.name}`, value: v })}
                                            className="select"
                                            classNamePrefix="react-select"
                                            onChange={selected => {
                                                this.fetchDentistCalendar(selected.value._id);
                                            }}
                                            isSearchable
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    {fetchingCalendarDentist
                                        ? <CpnFetchingData />
                                        : <Calendar
                                            selectable
                                            showMultiDayTimes
                                            localizer={localizer}
                                            events={events}
                                            style={{ height: "500px" }}
                                            step={5}
                                            length={120}
                                            defaultView="week"
                                            onDoubleClickEvent={event => {
                                                this.setState({ isShowPopupAdd: event });
                                            }}
                                            onSelectSlot={data => {
                                                // Validate Time
                                                const { events } = this.state;
                                                const { start, end } = data;
                                                const filterArr = events.filter(v => !v.isAdded);
                                                const check = filterArr.every(v => {
                                                    const condition1 = start <= v.start && end <= v.start;
                                                    const condition2 = start >= v.end && end >= v.end;
                                                    return condition1 || condition2;
                                                });
                                                if (!check) return alert('Lỗi: trùng giờ hẹn với các lịch khác!');
                                                return this.addEvent(data);
                                            }}
                                            {...calendarSetting}
                                        />}
                                </div>
                                <div className="col-sm-12">
                                    <SubmitButtonsGroup disabled={!isSelected} loading={loading} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </CpnPopupWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        calendarDentist: state.calendarDentist
    };
}
export default connect(mapStateToProps)(ScreenDashboardTicketDetailCalendarPopupAdd);