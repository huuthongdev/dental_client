import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { CpnPopupWraper, CpnSvg, convertToSave } from '../../../../refs';

import moment from 'moment'
import 'moment/locale/vi';
import Calendar from "react-big-calendar";
moment.locale('vi');
const localizer = Calendar.momentLocalizer(moment);

class TicketDetailCalendarPopupAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    render() {
        const { content, employee, dentistResponsible, event } = this.props;

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
                        <Formik
                            initialValues={{
                                dentistResponsible: convertToSave(dentistResponsible),
                                content: convertToSave(content)
                            }}
                            validationSchema={Yup.object().shape({
                                content: Yup.string().required('cần được cung cấp')
                            })}
                            onSubmit={(values) => {
                                this.props.onSubmit({
                                    ...event,
                                    title: `BS: ${values.dentistResponsible.name} | ${values.content}`,
                                    dentistResponsible: values.dentistResponsible
                                });
                            }}
                            render={props => {
                                const { errors, touched, setValues, values } = props;

                                const dentistArr = employee.filter(v => {
                                    const currentBranchId = localStorage.getItem("BRANCH");
                                    return v.roleInBranchs && v.roleInBranchs.find(v => v.branch._id === currentBranchId
                                        && (v.roles.includes('DENTIST')
                                            || v.roles.includes('DENTISTS_MANAGER')));
                                });

                                const dentistSelected = employee.find(v => v._id === dentistResponsible._id);

                                return <Form>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className={`form-group required`}>
                                                <label>Bác sĩ điều trị:</label>
                                                <Select
                                                    defaultValue={{ label: `BS: ${dentistSelected.name}`, value: dentistSelected }}
                                                    options={dentistArr.map(v => v = { label: `BS: ${v.name}`, value: v })}
                                                    className="select"
                                                    classNamePrefix="react-select"
                                                    onChange={selected => setValues({ ...values, dentistResponsible: selected.value })}
                                                    isSearchable
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className={`form-group required ${errors.content && touched.content ? 'error' : ''}`}>
                                                <label>Nội dung điều trị:</label><span className="error-message">{errors.content}</span>
                                                <Field name="content" component="textarea" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <Calendar
                                                className="time-table"
                                                selectable
                                                showMultiDayTimes
                                                localizer={localizer}
                                                defaultView="week"
                                                events={this.state.events}
                                                style={{ height: "400px" }}
                                                culture="vi"
                                                min={new Date(2019, 0, 1, 9, 0, 0)}
                                                max={new Date(2019, 0, 1, 22, 0, 0)}
                                                step={5}
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
                                        <div className="col-sm-12 text-right">
                                            <button style={{ marginRight: '0' }} type="submit" className="btn blue">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            }}
                        />
                    </div>
                </div>
            </CpnPopupWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    };
}
export default connect(mapStateToProps)(TicketDetailCalendarPopupAdd);