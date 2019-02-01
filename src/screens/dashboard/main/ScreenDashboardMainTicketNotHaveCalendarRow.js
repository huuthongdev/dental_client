import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { CpnSvg } from '../../../refs';

class ScreenDashboardMainTicketNotHaveCalendarRow extends Component {
    state = {
        onDetail: false,
        onCreateCalendar: false
    }

    render() {
        const { sid, client, items, _id } = this.props.value;
        const { onDetail, onCreateCalendar } = this.state;

        if (onDetail) return <Redirect to={{ pathname: `/ticket/${_id}` }} />
        if (onCreateCalendar) return <Redirect to={{ pathname: `/ticket/${_id}`, state: { ccl: true } }} />
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
                        {client.name}
                    </td>
                    <td>
                        {items.map((value, key) => <Fragment key={key}>• {value.service.name} (x{value.qty})<br /></Fragment>)}
                    </td>
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