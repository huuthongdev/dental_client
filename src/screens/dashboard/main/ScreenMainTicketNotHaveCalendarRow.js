import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { CpnSvg } from '../../../refs';

class ScreenDashboardMainTicketNotHaveCalendarRow extends Component {
    state = {
        onDetail: false,
        onCreateCalendar: false
    }

    render() {
        const { sid, client, items, _id, dentistResponsible, receiptVoucher, totalAmount } = this.props.value;
        const { onDetail, onCreateCalendar } = this.state;

        const debitAmount = receiptVoucher && receiptVoucher.length !== 0
            ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
            : totalAmount;

        if (onDetail) return <Redirect to={{ pathname: `/client/ticket/${_id}` }} />
        if (onCreateCalendar) return <Redirect to={{ pathname: `/client/ticket/${_id}`, state: { ccl: true } }} />
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        <Link className="link" to={`/client/ticket/${_id}`}>
                            {sid}
                        </Link>
                    </td>
                    <td>
                        {client.name}
                    </td>
                    <td>
                        {items.map((value, key) => <Fragment key={key}>• {value.service.name} (x{value.qty})<br /></Fragment>)}
                    </td>
                    <td>
                        {dentistResponsible.name}
                    </td>
                    {debitAmount && debitAmount > 0 ? <td className="text-danger">{debitAmount.toLocaleString('vi-VN')}đ</td> : <td className="text-success">Đã thanh toán đủ</td>}
                    <td>
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <CpnSvg name="INFO" />
                                    Chi tiết
                                </div>
                                <div className="item" onClick={() => this.setState({ onCreateCalendar: true })}>
                                    <CpnSvg name="DATE" />
                                    Đặt lịch hẹn
                                </div>
                            </div>
                        </button>
                        <div className="right-row-side" />
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default ScreenDashboardMainTicketNotHaveCalendarRow;