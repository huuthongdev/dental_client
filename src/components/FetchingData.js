import React, { Component, Fragment } from 'react';

class FetchingData extends Component {
    render() {
        return (
            <Fragment>
                <div className="loading-fetching-data">
                    <div className="loading-icon"></div>
                    Đang nạp dữ liệu...
                </div>
            </Fragment>
        );
    }
}

export default FetchingData;