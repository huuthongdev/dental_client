import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { CpnSvg } from '../../../refs';

class ScreenDashboardProductRow extends Component {
    state = {
        onDetail: false
    };

    render() {
        const { item } = this.props;
        const { onDetail } = this.state; 

        if (onDetail) return <Redirect to={`/product/${item._id}`} />;
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td className="link" onClick={() => this.setState({ onDetail: true })}>{item.name}</td>
                    <td>{item.cost.toLocaleString('en-GB')}đ</td>
                    <td>{item.suggestedRetailerPrice.toLocaleString('en-GB')}đ</td>
                    <td>--</td>
                    <td>{item.unit}</td>
                    <td>--</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                        </button>
                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty">
                </tr>
            </Fragment>
        );
    }
}

export default ScreenDashboardProductRow;