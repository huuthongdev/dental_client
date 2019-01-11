import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Svg } from '../../../refs';

class ProductRow extends Component {
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
                    <td>{item.cost.toLocaleString('en-GB')}</td>
                    <td>{item.suggestedRetailerPrice.toLocaleString('en-GB')}</td>
                    <td>100..</td>
                    <td>{item.unit}</td>
                    <td>0..</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
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