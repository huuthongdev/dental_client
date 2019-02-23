import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { CpnEmptyValue, ReceiptVoucherPrint, CpnSvg, pageNavigation, ITEMS_PER_PAGE, formatSID } from '../../../../refs';

class ScreenClientDetailListPayment extends Component {
    state = {
        currentPage: 1
    }


    render() {
        const { receiptVoucher } = this.props.detail;
        if (receiptVoucher.length === 0) return <CpnEmptyValue message="Chưa có giao dịch nào" />
        const { currentPage } = this.state;
        let initData = receiptVoucher;
        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);
        return (
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hồ sơ</th>
                            <th>Thời gian</th>
                            <th>Thu ngân</th>
                            <th>Phí thu</th>
                            <th>Ghi chú</th>
                            <th></th>
                        </tr>
                    </thead><tbody>
                        {postsPage.map((value, key) => {
                            const { cashier, totalPayment, content, sid, createAt, ticket, client } = value;
                            return <Fragment key={key}>
                                <tr>
                                    <td style={{ width: '70px' }}>
                                        <div className="left-row-side" />
                                        {formatSID(sid)}
                                    </td>
                                    <td style={{ width: '70px' }}>
                                        {ticket ? <Link className="link" to={`/client/${client._id}/ticket/${ticket._id}`}>
                                            {formatSID(ticket.sid)}
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

                {initData.length > ITEMS_PER_PAGE ? <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={ITEMS_PER_PAGE}
                    totalItemsCount={initData.length}
                    pageRangeDisplayed={5}
                    onChange={currentPage => this.setState({ currentPage })}
                    activeClass="active"
                    activeLinkClass="active"
                /> : null}

            </Fragment>
        );
    }
}

export default ScreenClientDetailListPayment;