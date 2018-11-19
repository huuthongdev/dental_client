import React, { Component, Fragment } from 'react';
import { TitleApp } from '../refs';

class FetchingData extends Component {
    render() {
        return (
            <Fragment>
                <TitleApp sub='Đang nạp dữ liệu...' />
                <div className="loading-fetching-data">
                    <div className="loading-icon"></div>
                    Đang nạp dữ liệu...
                </div>
            </Fragment>
        );
    }
}

export default FetchingData;