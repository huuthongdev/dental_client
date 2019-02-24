import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { CpnSvg, CpnEmptyValue, ReceiptVoucherPrint, CpnFetchingData, ReceiptVoucherService, ITEMS_PER_PAGE } from '../../../../refs';

class ScreenDashboardAccountantReceiptVoucher extends Component {
    state = {
        initFetching: true,
        fetching: true,
        count: null,
        currentPage: 1,
        data: [],
    }

    convertTypeReceiptVoucher = (type) => {
        if (type === 'FOR_TICKET') return 'Thu phí dịch vụ';
        if (type === 'BUY_PRODUCT') return 'Bán hàng';
        return '--';
    }

    async componentWillMount() {
        await this.fetchData();
        this.setState({ initFetching: false });
    }

    filterData = (textSearch) => {
        this.fetchData(1, textSearch, true);
    }

    fetchData = (currentPage = this.state.currentPage, textSearch = this.state.textSearch, forceUpdate = false) => {
        this.setState({ fetching: true });
        const { receiptVoucher } = this.props;
        // Check fetched
        const check = receiptVoucher.pages.find(v => v.pageNumber === currentPage);
        if (check && !forceUpdate) return this.setState({ fetching: false, data: check.data, count: receiptVoucher.count });
        return ReceiptVoucherService.set((currentPage - 1) * ITEMS_PER_PAGE, currentPage, textSearch, forceUpdate)
            .then(res => {
                if (!res) return this.setState({ fetching: false });
                return this.setState({ data: res.data, count: +res.count, fetching: false });
            });
    }

    render() {
        const { data, fetching, initFetching, currentPage, count } = this.state;

        if (initFetching) return <CpnFetchingData />

        return (
            <Fragment>
                <div className="col-sm-12">
                    {fetching ? <CpnFetchingData message="Đang nạp dữ liệu..." /> : null}
                    {!fetching && data.length === 0 ? <CpnEmptyValue message={`Chưa có giao dịch nào`} /> : null}
                    {!fetching && data.length > 0 ? <Fragment>
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
                                {data.map((value, key) => {
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

                        {count > ITEMS_PER_PAGE ? <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={ITEMS_PER_PAGE}
                            totalItemsCount={+count}
                            pageRangeDisplayed={5}
                            onChange={currentPage => {
                                this.setState({ currentPage });
                                this.fetchData(+currentPage);
                            }}
                            activeClass="active"
                            activeLinkClass="active"
                        /> : null}
                    </Fragment>
                        : null}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        receiptVoucher: state.receiptVoucher
    };
}
export default connect(mapStateToProps)(ScreenDashboardAccountantReceiptVoucher);