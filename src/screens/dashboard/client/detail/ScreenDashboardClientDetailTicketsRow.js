import React, { Component, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { convertTicketStatus, CpnSvg, TicketService } from '../../../../refs';

class ScreenDashboardClientDetailTicketsRow extends Component {
    state = {
        onRemove: false,
        onDetail: false,
        onCreateCalendar: false,
        onPayment: false,
        isSelectListTools: false,
        loading: false
    };

    handleChangeStatus = (_id, status, clientId) => {
        this.setState({ loading: true });
        TicketService.changeStatus(_id, status, clientId)
            .then(() => this.setState({ loading: false }));
    }


    render() {
        const { sid, _id, createAt, dentistResponsible, items, status, receiptVoucher, totalAmount, client, branchRegister } = this.props.value;
        const { onDetail, onCreateCalendar, onPayment, loading } = this.state;
        const debitAmount = receiptVoucher && receiptVoucher.length !== 0
            ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
            : totalAmount;

        console.log(this.props.value);

        if (onDetail) return <Redirect to={{ pathname: `/client/ticket/${_id}`, state: { from: { pathname: this.props.location.pathname } } }} />
        if (onCreateCalendar) return <Redirect to={{ pathname: `/client/ticket/${_id}`, state: { ccl: true, from: { pathname: this.props.location.pathname } } }} />
        if (onPayment) return <Redirect to={{ pathname: `/client/ticket/${_id}`, state: { payment: true, from: { pathname: this.props.location.pathname } } }} />
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        <Link className="link" to={{
                            pathname: `/client/ticket/${_id}`,
                            state: { from: { pathname: this.props.location.pathname } }
                        }}>
                            {sid}
                        </Link>
                    </td>
                    <td>
                        {new Date(createAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td>{items.map((value, key) => {
                        return <Fragment key={key}>• {value.service.name} (x{value.qty} {value.service.unit})<br /></Fragment>
                    })}
                    </td>
                    <td>
                        {dentistResponsible.name}
                    </td>
                    <td>
                        <div className={`box-item ${status === 'WORKING' ? 'orange'
                            : status === 'DONE' ? 'green'
                                : status === 'PENDING' ? 'blue'
                                    : ''}`}>
                            {convertTicketStatus(status)}
                        </div>
                    </td>
                    <td>
                        {debitAmount.toLocaleString('vi-VN')}đ
                    </td>
                    <td>
                        {branchRegister.name}
                    </td>
                    <td className="list-tools">
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
                                    Thu phí
                                </div> : null}

                                {status !== 'WORKING' ? <div onClick={() => this.handleChangeStatus(_id, 'WORKING', client._id)} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Đang điều trị
                                            </div> : null}

                                {status !== 'PENDING' ? <div onClick={() => this.handleChangeStatus(_id, 'PENDING', client._id)} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Tạm ngưng điều trị
                                            </div> : null}

                                {status !== 'DONE' ? <div onClick={() => this.handleChangeStatus(_id, 'DONE', client._id)} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Hoàn thành
                                            </div> : null}
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

export default withRouter(ScreenDashboardClientDetailTicketsRow);