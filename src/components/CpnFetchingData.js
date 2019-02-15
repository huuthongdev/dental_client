import React, { Component, Fragment } from 'react';
import { TitleApp, ScreenDashboardWraper } from '../refs';

class CpnFetchingData extends Component {
    render() {
        const { message, dashboardWraper } = this.props;

        if (dashboardWraper) return (
            <ScreenDashboardWraper>
                <TitleApp sub='Đang nạp dữ liệu...' />
                <div className="loading-fetching-data">
                    <div className="loading-icon"></div>
                    {message ? message : 'Đang nạp dữ liệu...'}
                </div>
            </ScreenDashboardWraper>
        )
        
        return (
            <Fragment>
                <TitleApp sub='Đang nạp dữ liệu...' />
                <div className="loading-fetching-data">
                    <div className="loading-icon"></div>
                    {message ? message : 'Đang nạp dữ liệu...'}
                </div>
            </Fragment>
        );
    }
}

export default CpnFetchingData;