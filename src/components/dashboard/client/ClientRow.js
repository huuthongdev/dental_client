import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class ClientRow extends Component {
    render() {
        const { item } = this.props;

        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td className="link">{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.birthday).toLocaleDateString('en-GB')}</td>
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
                <tr className="empty" />
            </Fragment>
        );
    }
}

export default ClientRow;