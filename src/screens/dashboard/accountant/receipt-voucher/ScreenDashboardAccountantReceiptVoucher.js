import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CpnSvg, CpnEmptyValue, ReceiptVoucherPrint, CpnFetchingData } from '../../../../refs';

class ScreenDashboardAccountantReceiptVoucher extends Component {

    convertTypeReceiptVoucher = (type) => {
        if (type === 'FOR_TICKET') return 'Thu phí dịch vụ';
        if (type === 'BUY_PRODUCT') return 'Bán hàng';
        return '--';
    }

    render() {
        const { receiptVoucher, fetchDataStatus } = this.props;
        const isEmpty = receiptVoucher.length === 0;

        if (!fetchDataStatus.receiptVoucher) return <Fragment>
            <div className="col-sm-12">
                <CpnFetchingData />
            </div>
        </Fragment>

        return (
            <Fragment>
                <div className="col-sm-12">
                    {isEmpty ? <CpnEmptyValue /> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Loại phí</th>
                                    <th>Hồ sơ liên quan</th>
                                    <th>Thời gian</th>
                                    <th>Thu ngân</th>
                                    <th>Phí thu</th>
                                    <th>Ghi chú</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptVoucher.map((value, key) => {
                                    const { cashier, totalPayment, content, type, sid, createAt, ticket } = value;
                                    return <Fragment key={key}>
                                        <tr>
                                            <td>
                                                <div className="left-row-side" />
                                                {sid}
                                            </td>
                                            <td>{this.convertTypeReceiptVoucher(type)}</td>
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
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        receiptVoucher: state.receiptVoucher,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardAccountantReceiptVoucher);