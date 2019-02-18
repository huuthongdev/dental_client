import React, { Component, Fragment } from 'react';
import { ScreenDashboardTicketDetailCalendarRow, CpnEmptyValue } from '../../../../refs';


class ScreenDashboardTicketDetailCalendar extends Component {
    render() {
        const { calendar } = this.props.ticket;
        const isEmpty = calendar.length === 0;
        return (
            <Fragment>
                {isEmpty
                    ? <CpnEmptyValue message="Chưa có lịch hẹn nào"/> : <table>
                        <thead>
                            <tr>
                                <th>ID</th> 
                                <th>Hẹn đến</th>
                                <th>Thời gian điều trị</th> 
                                <th>Nội dung</th>
                                <th>Bác sĩ</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map((value, key) => <ScreenDashboardTicketDetailCalendarRow item={value} key={key} />)}
                        </tbody>
                    </table>}
            </Fragment>
        );
    }
}

export default ScreenDashboardTicketDetailCalendar;