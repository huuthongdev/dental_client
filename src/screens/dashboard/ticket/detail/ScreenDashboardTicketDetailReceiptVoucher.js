import React, { Component, Fragment } from 'react';
import { CpnEmptyValue, CpnSvg, ReceiptVoucherPrint } from '../../../../refs';

class ScreenDashboardTicketDetailReceiptVoucher extends Component {
    render() {
        const { receiptVoucher } = this.props.ticket;

        const isEmpty = receiptVoucher.length === 0;

        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        {isEmpty
                            ? <CpnEmptyValue />
                            : <table className="table">
                                <thead>
                                    <tr>
                                        <th>Thời gian</th>
                                        <th>Thu ngân</th>
                                        <th>Phí thu</th>
                                        <th>Ghi chú</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receiptVoucher.map((value, key) => <Fragment key={key}>
                                        <tr>
                                            <td>
                                                <div className="left-row-side" />
                                                {new Date(value.createAt).toLocaleTimeString('en-GB')} | {new Date(value.createAt).toLocaleDateString('en-GB')}
                                            </td>
                                            <td>
                                                {value.cashier.name}
                                            </td>
                                            <td className="text-success">
                                                <strong>+{value.totalPayment.toLocaleString()}đ</strong>
                                            </td>
                                            <td>
                                                {value.content}
                                            </td>
                                            <td>
                                                <div>
                                                    <ReceiptVoucherPrint detail={value}>
                                                        <div className="item" style={{ cursor: 'pointer' }}>
                                                            <CpnSvg name="PRINTER" />
                                                        </div>
                                                    </ReceiptVoucherPrint>
                                                </div>
                                                <div className="right-row-side" />
                                            </td>
                                        </tr>
                                        <tr className="empty" />
                                    </Fragment>)}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScreenDashboardTicketDetailReceiptVoucher;