import React, { Component, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";
import { CpnSvg } from '../../../refs';

class ScreenDashboardClientRow extends Component {
    state = {
        onRemove: false,
        onDetail: false
    };

    render() {
        const { item } = this.props;
        const { onDetail } = this.state;

        if (onDetail) return <Redirect to={`/client/${item._id}`} />;
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