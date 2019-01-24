import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CpnFetchingData, CpnEmptyValue, ScreenDashboardCalendarsTodayRow } from '../../../refs';

class ScreenDashboardCalendarsToday extends Component {
    render() {
        const { fetchDataStatus, main } = this.props;
        const { dashboardInfo } = main;

        return (
            <Fragment>
                <div className="box-title">
                    Lịch hẹn hôm nay
                </div>
                {!fetchDataStatus.dashboardInfo ? <CpnFetchingData /> : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.calendarsToday.length === 0 ? <CpnEmptyValue message="Không có lịch hẹn nào hôm nay" /> : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.calendarsToday.length !== 0 ? <table>
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
                        {dashboardInfo.calendarsToday
                            ? dashboardInfo.calendarsToday.map((value, key) => (
                                <ScreenDashboardCalendarsTodayRow value={value} key={key} />
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
export default connect(mapStateToProps)(ScreenDashboardCalendarsToday);