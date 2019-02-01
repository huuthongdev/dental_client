import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CpnSvg, convertTicketStatus, TicketService } from '../../../refs';

class ScreenDashboardTicketRow extends Component {
    state = {
        onRemove: false,
        onDetail: false,
        onCreateCalendar: false,
        onPayment: false,
        isSelectListTools: false,
        loading: false
    };

    handleChangeStatus = (_id, status) => {
        this.setState({ loading: true });
        TicketService.changeStatus(_id, status)
            .then(() => this.setState({ loading: false }));
    }

    render() {
        const { item } = this.props;
        const { receiptVoucher, totalAmount, sid, client, items, _id, status, dentistResponsible } = this.props.item;
        const { onDetail, onCreateCalendar, onPayment, loading } = this.state;

        const debitAmount = receiptVoucher && receiptVoucher.length !== 0
            ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
            : totalAmount;

        if (onDetail) return <Redirect to={{ pathname: `/ticket/${item._id}` }} />
        if (onCreateCalendar) return <Redirect to={{ pathname: `/ticket/${item._id}`, state: { ccl: true } }} />
        if (onPayment) return <Redirect to={{ pathname: `/ticket/${item._id}`, state: { payment: true } }} />
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        <Link className="link" to={`/ticket/${_id}`}>
                            {sid}
                        </Link>
                    </td>
                    <td>
                        <Link className="link" to={`/client/${client._id}`}>
                            {client.name}
                        </Link>
                    </td>
                    <td>
                        {dentistResponsible.name}
                    </td>
                    <td>{items.map((value, key) => {
                        return <Fragment key={key}>• {value.service.name} (x{value.qty} {value.service.unit})<br /></Fragment>
                    })}</td>
                    <td>
                        <div className={`box-item ${status === 'WORKING' ? 'orange'
                            : status === 'DONE' ? 'green'
                                : status === 'PENDING' ? 'blue'
                                    : ''}`}>
                            {convertTicketStatus(status)}
                        </div>
                    </td>
                    <td>{debitAmount.toLocaleString()}</td>

                    <td className="list-tools">
                        {/* <button className="row-toggle-list-tools">
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
                                {debitAmount !== 0 ? <div className="item" onClick={() => this.setState({ onPayment: true })}>
                                    <CpnSvg name="MONEY_CHECK" />
                                    Thanh toán
                                </div> : null}

                            </div>
                        </button> */}

                        {loading ? <div className="loading-icon green" /> : null}
                        {!loading ? <button className="row-toggle-list-tools">
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
                                {debitAmount !== 0 ? <div className="item" onClick={() => this.setState({ onPayment: true })}>
                                    <CpnSvg name="MONEY_CHECK" />
                                    Thanh toán
                                </div> : null}

                                <div onClick={() => this.handleChangeStatus(_id, 'WORKING')} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Đang điều trị
                                            </div>
                                <div onClick={() => this.handleChangeStatus(_id, 'PENDING')} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Tạm ngưng điều trị
                                            </div>
                                <div onClick={() => this.handleChangeStatus(_id, 'DONE')} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Hoàn thành
                                            </div>
                            </div>
                        </button> : null}


                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty" />
            </Fragment>
        );
    }
}

export default ScreenDashboardTicketRow;