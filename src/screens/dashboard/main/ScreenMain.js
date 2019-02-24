import React, { Component, Fragment } from 'react';
import {
    ScreenDashboardWraper, ScreenMainNumberReports, ScreenMainPaymentToday
} from '../../../refs';

class ScreenMain extends Component {
    render() {
        return (
            <Fragment>
                <ScreenDashboardWraper title="Thông tin chung">
                    <ScreenMainNumberReports />
                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col-sm-12">
                                <ScreenMainPaymentToday />
                            </div>

                            {/* <div className="col-sm-12 mt-2">
                                <ScreenMainCalendarsToday />
                            </div> */}

                            {/* <div className="col-sm-12 mt-2">
                                <ScreenMainTicketNotHaveCalendar />
                            </div> */}
                        </div>
                    </div>
                </ScreenDashboardWraper>
            </Fragment>
        );
    }
}

export default ScreenMain;