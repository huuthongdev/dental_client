import React, { Component, Fragment } from 'react';
import { ScreenDashboardWraper } from '../refs';

class CpnEmptyValue extends Component {
    render() {
        const { message, dashboardWraper } = this.props;

        if (dashboardWraper) return (
            <ScreenDashboardWraper>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="cpn-empty-value">
                                {message ? message : 'Không có kết quả nào'}
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenDashboardWraper>
        );

        return (
            <Fragment>
                <div className="cpn-empty-value">
                    {message ? message : 'Không có kết quả nào'}
                </div>
            </Fragment>
        );
    }
}

export default CpnEmptyValue;