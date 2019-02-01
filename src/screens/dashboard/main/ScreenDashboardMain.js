import React, { Component, Fragment } from 'react';
import { ScreenDashboardWraper, ScreenDashboardCalendarsToday, ScreenDashboardMainTicketNotHaveCalendar, ScreenDashboardMainNumberReports } from '../../../refs';

class ScreenDashboardMain extends Component {
    render() {
        return (
            <Fragment>
                <ScreenDashboardWraper title="Thông tin chung">
                    <ScreenDashboardMainNumberReports />
                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col-sm-7">
                                <ScreenDashboardCalendarsToday />
                            </div>
                            <div className="col-sm-5">
                                <ScreenDashboardMainTicketNotHaveCalendar />
                            </div>
                        </div>
                    </div>
                </ScreenDashboardWraper>
            </Fragment>
        );
    }
}

export default ScreenDashboardMain;