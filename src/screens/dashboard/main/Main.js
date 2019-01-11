import React, { Component, Fragment } from 'react';
import { TitleApp, CpnWraper } from '../../../refs';

class Main extends Component {
    render() {
        return (
            <Fragment>
                <CpnWraper>
                    <TitleApp sub="Thông tin chung" /> 
                    {/* START DIGITAL NUMBER REPORTS */}
                    <div className="container-fluid" id="digital-number-reports">
                        <div className="row">
                            {/* START ITEM */}
                            <div className="col-sm-3">
                                <div className="digital-number-item">
                                    <div className="number">1600 <small className="measurement">(Phiếu)</small></div>
                                    <p>Tổng số phiếu điều trị trong tháng</p>
                                    <div className="process-bar style-1">
                                        <div className="percent" style={{ width: '43%' }} />
                                    </div>
                                    <div className="percent-text">Đạt 51% chỉ tiêu tháng</div>
                                </div>
                            </div>
                            {/* END ITEM */}
                            {/* START ITEM */}
                            <div className="col-sm-3">
                                <div className="digital-number-item">
                                    <div className="number">1600 <small className="measurement">(Phiếu)</small></div>
                                    <p>Tổng số phiếu điều trị trong tháng</p>
                                    <div className="process-bar style-2">
                                        <div className="percent" style={{ width: '43%' }} />
                                    </div>
                                    <div className="percent-text">Đạt 51% chỉ tiêu tháng</div>
                                </div>
                            </div>
                            {/* END ITEM */}
                            {/* START ITEM */}
                            <div className="col-sm-3">
                                <div className="digital-number-item">
                                    <div className="number">1600 <small className="measurement">(Phiếu)</small></div>
                                    <p>Tổng số phiếu điều trị trong tháng</p>
                                    <div className="process-bar style-3">
                                        <div className="percent" style={{ width: '43%' }} />
                                    </div>
                                    <div className="percent-text">Đạt 51% chỉ tiêu tháng</div>
                                </div>
                            </div>
                            {/* END ITEM */}
                            {/* START ITEM */}
                            <div className="col-sm-3">
                                <div className="digital-number-item">
                                    <div className="number">1600 <small className="measurement">(Phiếu)</small></div>
                                    <p>Tổng số phiếu điều trị trong tháng</p>
                                    <div className="process-bar style-4">
                                        <div className="percent" style={{ width: '43%' }} />
                                    </div>
                                    <div className="percent-text">Đạt 51% chỉ tiêu tháng</div>
                                </div>
                            </div>
                            {/* END ITEM */}
                        </div>
                    </div>
                    {/* END DIGITAL NUMBER REPORTS */}
                </CpnWraper>
            </Fragment>
        );
    }
}

export default Main;