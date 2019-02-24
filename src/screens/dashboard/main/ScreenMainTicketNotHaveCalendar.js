import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CpnFetchingData, CpnEmptyValue, ScreenMainTicketNotHaveCalendarRow } from '../../../refs';

class ScreenMainTicketNotHaveCalendar extends Component {
    render() {
        const { fetchDataStatus, main } = this.props;
        const { dashboardInfo } = main;
        return (
            <Fragment>
                <div className="box-title">
                    Hồ sơ chưa có lịch hẹn
                </div>
                {!fetchDataStatus.dashboardInfo ? <CpnFetchingData /> : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.ticketNotHaveCanlendar.length === 0 ? <CpnEmptyValue message="Danh sách trống" /> : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.ticketNotHaveCanlendar.length !== 0 ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Nội dung</th>
                            <th>Bác sĩ</th>
                            <th>Công nợ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardInfo.ticketNotHaveCanlendar
                            ? dashboardInfo.ticketNotHaveCanlendar.map((value, key) => (
                                <ScreenMainTicketNotHaveCalendarRow value={value} key={key} />
                            )) : null}
                    </tbody>
                </table> : null}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        main: state.main,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenMainTicketNotHaveCalendar);