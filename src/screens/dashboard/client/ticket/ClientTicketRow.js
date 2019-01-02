import React, { Component, Fragment } from 'react';
import { Svg } from '../../../../refs';

class ClientTicketRow extends Component {
    state = {
        onRemove: false,
        onDetail: false
    };

    render() {
        const { item } = this.props;

        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td className="link" onClick={() => this.setState({ onDetail: true })}>
                        {item.client.name}
                    </td>
                    <td>{item.dentistResponsible.name}</td>
                    <td>{item.items.map((value, key) => {
                        return <Fragment key={key}>• {value.service.name} (x{value.qty} {value.service.unit})<br /></Fragment>
                    })}</td>
                    <td>{item.status}</td>
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

export default ClientTicketRow;