import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CpnSvg, convertTicketStatus } from '../../../refs';

class TicketRow extends Component {
    state = {
        onRemove: false,
        onDetail: false,
        onCreateCalendar: false,
        isSelectListTools: false
    };

    render() {
        const { item } = this.props;
        const { onDetail, onCreateCalendar } = this.state;

        if (onDetail) return <Redirect to={{ pathname: `/ticket/${item._id}` }} />
        if (onCreateCalendar) return <Redirect to={{ pathname: `/ticket/${item._id}`, state: { isCreateCalendar: true } }} />
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td>
                        <Link className="link" to={`/client/${item.client._id}`}>
                            {item.client.name}
                        </Link>
                    </td>
                    <td>
                        {item.dentistResponsible.name}
                    </td>
                    <td>{item.items.map((value, key) => {
                        return <Fragment key={key}>• {value.service.name} (x{value.qty} {value.service.unit})<br /></Fragment>
                    })}</td>
                    <td>
                        <div className={`box-item ${item.status === 'WORKING' ? 'orange'
                            : item.status === 'DONE' ? 'green'
                                : item.status === 'PENDING' ? 'blue'
                                    : ''}`}>
                            {convertTicketStatus(item.status)}
                        </div>
                    </td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <CpnSvg name="INFO" />
                                    Chi tiết
                                </div>
                                <div className="item" onClick={() => this.setState({ onCreateCalendar: true })}>
                                    <CpnSvg name="INFO" />
                                    Đặt lịch hẹn
                                    </div>
                                <div className="item">
                                    <CpnSvg name="MONEY_CHECK" />
                                    Thanh toán
                                </div>
                            </div>
                        </button>


                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty" />
            </Fragment>
        );
    }
}

export default TicketRow;