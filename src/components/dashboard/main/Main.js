import React, { Component } from 'react';
import { Dashboard, TitleApp } from '../../../refs';

class Main extends Component {
    render() {
        return (
            <Dashboard>
                <TitleApp sub="Thông tin chung" />
                {/* COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <svg width="16px" height="13px" viewBox="0 0 16 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <polygon id="path-1" points="0 0 16 0 16 13 0 13" />
                                    </defs>
                                    <g id="Dental-Application" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="Dashboard-Core-Sidebar---Shorten" transform="translate(-90.000000, -87.000000)">
                                            <g id="Group-Copy">
                                                <g id="Title-Page-Copy" transform="translate(90.000000, 85.000000)">
                                                    <g id="Icon-Home" transform="translate(0.000000, 2.000000)">
                                                        <mask id="mask-2" fill="white">
                                                            <use xlinkHref="#path-1" />
                                                        </mask>
                                                        <g id="Clip-2" />
                                                        <path d="M15.7030007,5.35197807 L13.3220238,3.64342866 L13.3220238,0.280263743 L10.4190521,0.280263743 L10.4190521,1.55926804 L8.43907136,0.140613424 C8.30807263,0.0471921766 8.15307414,0 7.99807565,0 C7.84407715,0 7.68907866,0.0471921766 7.55707994,0.140613424 L0.297150588,5.35197807 C0.0411530795,5.53400504 -0.0628459085,5.85471922 0.0381531087,6.14557712 C0.138152136,6.43643503 0.420149391,6.63194547 0.737146307,6.63194547 L1.82013577,6.63194547 L1.82013577,13 L6.21209303,13 L6.21209303,7.79152467 L9.78705824,7.79152467 L9.78705824,13 L14.1830155,13 L14.1830155,6.63194547 L15.262005,6.63194547 C15.5800019,6.63194547 15.8619991,6.43643503 15.9629981,6.14557712 C16.0619972,5.85471922 15.9579982,5.53400504 15.7030007,5.35197807" id="Fill-1" fill="#546E7A" mask="url(#mask-2)" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Thông tin chung
                                </div>
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
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
            </Dashboard>
        );
    }
}

export default Main;