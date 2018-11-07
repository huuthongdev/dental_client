import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class ServiceRow extends Component {
    render() {
        const { item, onDetail } = this.props;

        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td onClick={() => onDetail()} className="link"> {item.name}</td>
                    <td>{item.suggestedRetailerPrice}</td>
                    <td>--</td>
                    <td>--</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        <button className="row-btn-remove">
                            <Svg name="REMOVE" />
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

export default ServiceRow;