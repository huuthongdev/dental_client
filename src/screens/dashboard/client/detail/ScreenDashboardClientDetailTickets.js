import React, { Component, Fragment } from 'react';
import { ScreenDashboardClientDetailTicketsRow, CpnEmptyValue, ScreenDashboardTicketDetailReceiptVoucherPopupAdd } from '../../../../refs';

class ScreenDashboardClientDetailTickets extends Component {
    state = {
        isPayment: false,
        payloadPayment: null
    }

    render() {
        const { isPayment } = this.state;
        const { tickets } = this.props.detail;
        if (tickets.length === 0) return <div className="col-sm-12"><CpnEmptyValue message="Khách hàng chưa có hồ sơ điều trị" /></div>
        return (
            <Fragment>
                {isPayment ? <ScreenDashboardTicketDetailReceiptVoucherPopupAdd {...this.state.payloadPayment} goBack={() => this.setState({ isPayment: false })} /> : null}

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
                        {tickets.map((value, key) => {
                            return <ScreenDashboardClientDetailTicketsRow onPayment={(payloadPayment) => this.setState({ isPayment: true, payloadPayment })} value={value} key={key} />
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ScreenDashboardClientDetailTickets;