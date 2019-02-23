import React, { Component, Fragment } from 'react';
import { CpnSvg, ScreenDashboardClientReceiptVoucher, ScreenClientDetailUpdate, ScreenClientDetailTicket, ScreenClientDetailListPayment } from '../../../../refs';
import ScreenClientDetailWraper from './ScreenClientDetailWraper';

class ScreenClientDetail extends Component {
    state = {
        // INFO || TICKETS || RECEIPT_VOUCHER
        subMenuActive: "TICKETS"
    };

    changeSubMenu = subMenuActive => { this.setState({ subMenuActive }) };
    render() {
        const { subMenuActive } = this.state;
        return (
            <ScreenClientDetailWraper
                render={mainProps => {
                    const { client } = mainProps;
                    return <Fragment>
                        <ul className="cpn-sub-menu">
                            <li onClick={() => this.changeSubMenu("TICKETS")} className={subMenuActive === "TICKETS" ? "active" : null} >
                                <CpnSvg name="TICKET" />
                                Phiếu điều trị {client && client.tickets ? `(${client.tickets.length})` : null}
                            </li>
                            <li onClick={() => this.changeSubMenu("RECEIPT_VOUCHER")} className={subMenuActive === "RECEIPT_VOUCHER" ? "active" : null} >
                                <CpnSvg name="RECEIPT_VOUCHER" />
                                Lịch sử thanh toán {client && client.receiptVoucher ? `(${client.receiptVoucher.length})` : null}
                            </li>
                            <li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null} >
                                <CpnSvg name="INFO" />
                                Cập nhật thông tin
                            </li>
                        </ul>

                        {subMenuActive === "TICKETS" ? <ScreenClientDetailTicket detail={client} /> : null}
                        {subMenuActive === "RECEIPT_VOUCHER" ? <ScreenClientDetailListPayment detail={client} /> : null}
                        {subMenuActive === "INFO" ? <ScreenClientDetailUpdate detail={client} /> : null}
                    </Fragment>
                }}
            />
        )
    }
}

export default ScreenClientDetail;