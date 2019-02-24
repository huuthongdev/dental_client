import React, { Component, Fragment } from 'react';
import Pagination from "react-js-pagination";
import { ScreenClientDetailTicketRow, CpnEmptyValue, ScreenClientDetailTicketPaymentPopup, pageNavigation, ITEMS_PER_PAGE } from '../../../../refs';

class ScreenClientDetailTicket extends Component {
    state = {
        isPayment: false,
        payloadPayment: null,
        currentPage: 1
    }

    render() {
        const { isPayment } = this.state;
        const { tickets } = this.props.detail;
        if (tickets.length === 0) return <CpnEmptyValue message="Khách hàng chưa có hồ sơ điều trị" />
        const { currentPage } = this.state;
        let initData = tickets;
        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);
        return (
            <Fragment>
                {isPayment ? <ScreenClientDetailTicketPaymentPopup {...this.state.payloadPayment} goBack={() => this.setState({ isPayment: false })} /> : null}
                <table>
                    <thead>
                        <tr>
                            <th className="sid">ID</th>
                            <th className="sid">TG</th>
                            <th>Dịch vụ</th>
                            <th>Bác sĩ</th>
                            <th>Trạng thái</th>
                            <th>Phí nợ</th>
                            {/* <th>CN đăng kí</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {postsPage.map((value, key) => {
                            return <ScreenClientDetailTicketRow onPayment={(payloadPayment) => this.setState({ isPayment: true, payloadPayment })} value={value} key={key} />
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

export default ScreenClientDetailTicket;