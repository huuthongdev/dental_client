import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnFetchingData, formatSID, ReceiptVoucherPrint, CpnSvg, CpnEmptyValue } from '../../../refs';

class ScreenMainPaymentToday extends Component {
    render() {
        const { fetchDataStatus, main } = this.props;
        const { dashboardInfo } = main;
        return (
            <Fragment>
                <div className="box-title">
                    Danh sách phiếu thu trong ngày
                </div>

                {!fetchDataStatus.dashboardInfo ? <CpnFetchingData /> : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.receiptVoucherToday.length === 0 ?
                    <CpnEmptyValue message="Chưa có phiếu thu nào hôm nay"/>
                    : null}
                {fetchDataStatus.dashboardInfo && dashboardInfo.receiptVoucherToday.length !== 0 ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thời gian</th>
                            <th>Hồ sơ</th>
                            <th>Phí thu</th>
                            <th>Ghi chú</th>
                            <th>Thu ngân</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardInfo.receiptVoucherToday
                            ? dashboardInfo.receiptVoucherToday.map((value, key) => {
                                const { cashier, totalPayment, content, sid, createAt, ticket, client } = value;
                                return <Fragment key={key}>
                                    <tr>
                                        <td style={{ width: '70px' }}>
                                            <div className="left-row-side" />
                                            {formatSID(sid)}
                                        </td>
                                        <td>
                                            {new Date(createAt).toLocaleTimeString('en-GB')} | {new Date(createAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td style={{ width: '70px' }}>
                                            {ticket ? <Link className="link" to={`/client/${client._id}/ticket/${ticket._id}`}>
                                                {formatSID(ticket.sid)}
                                            </Link> : null}
                                        </td>
                                        <td className="text-success">
                                            <strong>+{totalPayment.toLocaleString()}đ</strong>
                                        </td>
                                        <td>
                                            {content}
                                        </td>
                                        <td>
                                            {cashier.name}
                                        </td>
                                        <td style={{ width: '60px' }}>
                                            <ReceiptVoucherPrint detail={value}>
                                                <button type="button" className="table-button-tool">
                                                    <CpnSvg name="PRINTER" />
                                                </button>
                                            </ReceiptVoucherPrint>

                                            <div className="right-row-side" />
                                        </td>
                                    </tr>
                                    <tr className="empty" />
                                </Fragment>
                            }) : null}
                    </tbody>
                </table> : null}

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        main: state.main,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenMainPaymentToday);