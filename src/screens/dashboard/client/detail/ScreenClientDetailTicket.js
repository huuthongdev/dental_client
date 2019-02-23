import React, { Component, Fragment } from 'react';
import { ScreenClientDetailTicketRow, CpnEmptyValue, ScreenClientDetailTicketPaymentPopup } from '../../../../refs';

class ScreenClientDetailTicket extends Component {
    state = {
        isPayment: false,
        payloadPayment: null
    }

    render() {
        const { isPayment } = this.state;
        const { tickets } = this.props.detail;
        if (tickets.length === 0) return <CpnEmptyValue message="Khách hàng chưa có hồ sơ điều trị" />
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
                        {tickets.map((value, key) => {
                            return <ScreenClientDetailTicketRow onPayment={(payloadPayment) => this.setState({ isPayment: true, payloadPayment })} value={value} key={key} />
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ScreenClientDetailTicket;