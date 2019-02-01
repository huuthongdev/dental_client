import React, { Component, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";
import { CpnSvg } from '../../../refs';

class ScreenDashboardClientRow extends Component {
    state = {
        onRemove: false,
        onDetail: false,
        onCreateTicket: false
    };

    render() {
        const { item } = this.props;
        const { onDetail, onCreateTicket } = this.state;

        if (onDetail) return <Redirect to={`/client/${item._id}`} />;
        if (onCreateTicket) return <Redirect to={`/ticket/new/${item._id}`} />;
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        <Link className="link" to={`/client/${item._id}`}>
                            {item.sid}
                        </Link>
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.birthday).toLocaleDateString('en-GB')}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <CpnSvg name="INFO" />
                                    Chi tiết
                                </div>
                                <div onClick={() => this.setState({ onCreateTicket: true })} className="item">
                                    <CpnSvg name="TICKET" />
                                    Tạo HS điều trị
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

export default ScreenDashboardClientRow;