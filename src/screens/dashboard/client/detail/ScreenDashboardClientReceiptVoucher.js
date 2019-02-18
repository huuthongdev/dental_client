import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CpnSvg, ReceiptVoucherPrint, CpnEmptyValue } from '../../../../refs';

class ScreenDashboardClientReceiptVoucher extends Component {
    render() {
        const { receiptVoucher } = this.props.detail;
        if (receiptVoucher.length === 0) return <CpnEmptyValue message="Chưa có giao dịch nào" />
        return (
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hồ sơ liên quan</th>
                            <th>Thời gian</th>
                            <th>Thu ngân</th>
                            <th>Phí thu</th>
                            <th>Ghi chú</th>
                            <th></th>
                        </tr>
                    </thead><tbody>
                        {receiptVoucher.map((value, key) => {
                            const { cashier, totalPayment, content, sid, createAt, ticket } = value;
                            return <Fragment key={key}>
                                <tr>
                                    <td>
                                        <div className="left-row-side" />
                                        {sid}
                                    </td>
                                    <td>
                                        {ticket ? <Link className="link" to={`/client/ticket/${ticket._id}`}>
                                            {ticket.sid}
                                        </Link> : null}
                                    </td>
                                    <td>
                                        {new Date(createAt).toLocaleTimeString('en-GB')} | {new Date(createAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td>{cashier.name}</td>
                                    <td className="text-success">
                                        <strong>+{totalPayment.toLocaleString()}đ</strong>
                                    </td>
                                    <td>
                                        {content}
                                    </td>
                                    <td className="list-tools">
                                        <button className="row-toggle-list-tools">
                                            <CpnSvg name="ARROW_DOWN" />
                                            <div className="row-list-tools">
                                                <ReceiptVoucherPrint detail={value}>
                                                    <div className="item">
                                                        <CpnSvg name="PRINTER" />
                                                        In hoá đơn
                                                            </div>
                                                </ReceiptVoucherPrint>
                                            </div>
                                        </button>

                                        <div className="right-row-side" />
                                    </td>
                                </tr>
                                <tr className="empty" />
                            </Fragment>
                        })}
                    </tbody>
                </table>

            </Fragment>
        );
    }
}

export default ScreenDashboardClientReceiptVoucher;