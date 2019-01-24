import React, { Component, Fragment } from 'react';
import { ScreenDashboardWraper, ScreenDashboardMainNumberReports, ScreenDashboardCalendarsToday } from '../../../refs';

class ScreenDashboardMain extends Component {
    render() {
        return (
            <Fragment>
                <ScreenDashboardWraper title="Thông tin chung">
                    <ScreenDashboardMainNumberReports />
                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col-sm-8">
                                <ScreenDashboardCalendarsToday />
                            </div>
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                </ScreenDashboardWraper>
            </Fragment>
        );
    }
}

export default ScreenDashboardMain;