import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class ScreenMainNumberReports extends Component {
    render() {
        const { dashboardInfo } = this.props.main;
        return (
            <Fragment>
                <div className="container-fluid" id="digital-number-reports">
                    <div className="row">
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalRevenue.toLocaleString('vi-VN') : '--'} <small className="measurement">(đ)</small></div>
                                <p>Tổng doanh thu</p>
                                {/* <div className="process-bar style-1">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalRevenueToday.toLocaleString('vi-VN') : '--'} <small className="measurement">(đ)</small></div>
                                <p>Doanh thu hôm nay</p>
                                {/* <div className="process-bar style-1">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalNewClientToday.toLocaleString('vi-VN') : '--'} <small className="measurement">(KH)</small></div>
                                <p>Khách mới hôm nay</p>
                                {/* <div className="process-bar style-2">
                                    <div className="percent" style={{ width: '43%' }} />
                                </div> */}
                                {/* <div className="percent-text">Đang phát triển...</div> */}
                            </div>
                        </div>
                        {/* END ITEM */}
                        {/* START ITEM */}
                        <div className="col-sm-3">
                            <div className="digital-number-item">
                                <div className="number">{dashboardInfo.numberReports ? dashboardInfo.numberReports.totalTicketsToday.toLocaleString('vi-VN') : '--'} <small className="measurement">(lượt)</small></div>
                                <p>Lượt điều trị mới hôm nay</p>
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
export default connect(mapStateToProps)(ScreenMainNumberReports);