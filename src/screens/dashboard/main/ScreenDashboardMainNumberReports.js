import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class ScreenDashboardMainNumberReports extends Component {
    render() {
        const { dashboardInfo } = this.props.main;
        return (
            <Fragment>
                <div className="container-fluid" id="digital-number-reports">
                    <div className="row">
                        {/* START ITEM */}
                        <div className="col-sm-4">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalRevenue.toLocaleString('vi-VN') : '--'} <small className="measurement">(đ)</small></div>
                                <p>Tổng doanh thu chi nhánh</p>
                                {/* <div className="process-bar style-1">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-4">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalClients.toLocaleString('vi-VN') : '--'} <small className="measurement">(KH)</small></div>
                                <p>Tổng khách hàng</p>
                                {/* <div className="process-bar style-2">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-4">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalTickets.toLocaleString('vi-VN') : '--'} <small className="measurement">(HS)</small></div>
                                <p>Tổng hồ sơ điều trị</p>
                                {/* <div className="process-bar style-3">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        {/* <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">-- <small className="measurement">(Phiếu)</small></div>
                                <p>Khách hàng đang điều trị</p>
                                <div className="process-bar style-4">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div>
                                <div className="percent-text">Đang phát triển...</div>
                            </div>
                        </div> */}
                        {/* END ITEM */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        main: state.main
    };
}
export default connect(mapStateToProps)(ScreenDashboardMainNumberReports);