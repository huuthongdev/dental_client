import React, { Component, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { convertTicketStatus, CpnSvg, TicketService, formatSID } from '../../../../refs';

class ScreenClientDetailTicketRow extends Component {
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
        let { sid, _id, createAt, dentistResponsible, items, status, receiptVoucher, totalAmount, client, discountAmount } = this.props.value;

        const { onDetail, loading } = this.state;
        const debitAmount = receiptVoucher && receiptVoucher.length !== 0
            ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
            : totalAmount;
        discountAmount = discountAmount ? +discountAmount : 0;

        if (onDetail) return <Redirect to={{ pathname: `/client/${client._id}/ticket/${_id}`, state: { from: { pathname: this.props.location.pathname } } }} />
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        <Link className="link" to={`/client/${client._id}/ticket/${_id}`}>
                            {formatSID(sid)}
                        </Link>
                    </td>
                    <td>
                        {new Date(createAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td>
                        {items.map((value, key) => {
                            return <Fragment key={key}>• <strong>{value.service.name}{value.note ? ` - ${value.note}` : null}</strong> (x{value.qty} {value.service.unit})<br /></Fragment>
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
                        {(debitAmount - discountAmount) > 0 ? <Fragment><strong className="text-warning">{(debitAmount - discountAmount).toLocaleString('vi-VN')}đ</strong> {discountAmount ? <Fragment> <br /> {`(-${(+discountAmount).toLocaleString('vi-VN')}đ)`}</Fragment> : null}</Fragment>
                            : <span className="text-success">Đã thanh toán</span>}
                    </td>
                    {/* <td>
                        {branchRegister.name}
                    </td> */}
                    <td className="list-tools">
                        {loading ? <div className="loading-icon green" /> : null}
                        {!loading ? <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <CpnSvg name="INFO" />
                                    Chi tiết
                                </div>
                                {/* <div className="item" onClick={() => this.setState({ onCreateCalendar: true })}>
                                    <CpnSvg name="DATE" />
                                    Đặt lịch hẹn
                                </div> */}
                                {debitAmount !== 0 ? <div className="item" onClick={() => this.props.onPayment({
                                    debitAmount: debitAmount - discountAmount,
                                    clientId: client._id,
                                    ticketId: _id,
                                })}>
                                    <CpnSvg name="MONEY_CHECK" />
                                    Thu phí
                                </div> : null}

                                {status !== 'WORKING' ? <div onClick={() => this.handleChangeStatus(_id, 'WORKING')} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Đang điều trị
                                            </div> : null}

                                {status !== 'PENDING' ? <div onClick={() => this.handleChangeStatus(_id, 'PENDING')} className="item">
                                    <CpnSvg name="DATE" />
                                    C: Tạm ngưng điều trị
                                            </div> : null}

                                {status !== 'DONE' ? <div onClick={() => this.handleChangeStatus(_id, 'DONE')} className="item">
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

export default withRouter(ScreenClientDetailTicketRow);