import React, { Component, Fragment } from 'react';

class ScreenDashboardMainNumberReports extends Component {
    render() {
        return (
            <Fragment>
                <div className="container-fluid" id="digital-number-reports">
                    <div className="row">
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">-- <small className="measurement">(Phiếu)</small></div>
                                <p>Tổng số phiếu điều trị trong tháng</p>
                                <div className="process-bar style-1">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div>
                                <div className="percent-text">Đang phát triển...</div>
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">-- <small className="measurement">(Phiếu)</small></div>
                                <p>Tổng số phiếu điều trị trong tháng</p>
                                <div className="process-bar style-2">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div>
                                <div className="percent-text">Đang phát triển...</div>
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">-- <small className="measurement">(Phiếu)</small></div>
                                <p>Tổng số phiếu điều trị trong tháng</p>
                                <div className="process-bar style-3">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div>
                                <div className="percent-text">Đang phát triển...</div>
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">-- <small className="measurement">(Phiếu)</small></div>
                                <p>Tổng số phiếu điều trị trong tháng</p>
                                <div className="process-bar style-4">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div>
                                <div className="percent-text">Đang phát triển...</div>
                            </div>
                        </div>
                        {/* END ITEM */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScreenDashboardMainNumberReports;