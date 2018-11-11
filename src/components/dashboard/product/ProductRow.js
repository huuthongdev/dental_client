import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class ProductRow extends Component {
    render() {
        const { item, onDetail, onRemove } = this.props;
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td className="link" onClick={() => onDetail()}>{item.name}</td>
                    <td>{item.cost.toLocaleString('en-GB')}</td>
                    <td>{item.suggestedRetailerPrice.toLocaleString('en-GB')}</td>
                    <td>100..</td>
                    <td>{item.unit}</td>
                    <td>0..</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        <button onClick={() => onRemove()} className="row-btn-remove">
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

export default ProductRow;