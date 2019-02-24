import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CpnEmptyValue, ScreenMainCalendarsTodayRow } from '../../../refs';

class ScreenMainCalendarsToday extends Component {
    render() {
        const { fetchDataStatus, main } = this.props;
        const { dashboardInfo } = main;

        if (!fetchDataStatus.dashboardInfo) return <Fragment>
            <div className="box-title">
                Lịch hẹn hôm nay
                </div>
        </Fragment>

        let calendarsPending = dashboardInfo.calendarsToday.filter(v => v.status === 'PENDING');
        let calendarsWorking = dashboardInfo.calendarsToday.filter(v => v.status === 'WORKING');
        let calendarsDone = dashboardInfo.calendarsToday.filter(v => v.status === 'DONE');

        let calendarsToday = [...calendarsWorking, ...calendarsPending, ...calendarsDone];

        return (
            <Fragment>
                <div className="box-title">
                    Lịch hẹn hôm nay
                </div>
                {dashboardInfo.calendarsToday.length === 0 ? <CpnEmptyValue message="Không có lịch hẹn nào hôm nay" /> : null}
                {dashboardInfo.calendarsToday.length !== 0 ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hẹn lúc</th>
                            <th>Khách hàng</th>
                            <th>Nội dung</th>
                            <th>Bác sĩ</th>
                            <th>Trang thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendarsToday.map((value, key) => (
                            <ScreenMainCalendarsTodayRow value={value} key={key} />
                        ))}
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
export default connect(mapStateToProps)(ScreenMainCalendarsToday);