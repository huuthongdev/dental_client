import React, { Component } from 'react';
import { ScreenDashboardWraper, CpnSvg, ScreenDashboardAccountantReceiptVoucher } from '../../../refs';

class ScreenDashboardAccountant extends Component {
    state = {
        tabActive: 'RECEIPT_VOUCHER'
    }

    changeSubMenu = (tabActive) => this.setState({ tabActive });

    render() {
        const { tabActive } = this.state;

        return (
            <ScreenDashboardWraper title="Kế toán">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-sm-12">
                            <div className="cpn-tools-list">
                                <button className="btn blue">
                                    <CpnSvg name="CREATE" />
                                    Tạo phiếu thu
                                </button>
                                <button className="btn blue">
                                    <CpnSvg name="CREATE" />
                                    Tạo phiếu chi
                                </button>
                            </div>
                        </div> */}

                        <div className="col-sm-12">
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu("RECEIPT_VOUCHER")} className={tabActive === "RECEIPT_VOUCHER" ? "active" : null} >
                                    <CpnSvg name="RECEIPT_VOUCHER" />
                                    Phiếu thu
                				</li>
                                {/* <li>
                                    <CpnSvg name="PAYMENT_VOUCHER" />
                                    Phiếu chi
                				</li> */}
                            </ul>
                        </div>

                        <ScreenDashboardAccountantReceiptVoucher />
                    </div>
                </div>
            </ScreenDashboardWraper>
        );
    }
}

export default ScreenDashboardAccountant;