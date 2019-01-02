import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Svg, onConfirmRemove } from '../../../refs';

class ProductRow extends Component {
    state = {
        onRemove: false,
        onDetail: false
    };

    formatPriceInCurrentBranch() {
        // TODO:   
        return this.props.item.suggestedRetailerPrice.toLocaleString('en-GB');
    }

    handleRemove() {

    }

    onRemove() {
        const { dispatch } = this.props;
        const { item } = this.props;
        dispatch(
            onConfirmRemove(
                item.name,
                "Xoá sản phẩm có thể ảnh hưởng đến dữ liệu của sản phẩm bao gồm: Chi nhánh, Phiếu điều trị, các sản phẩm liên quan",
                "sản phẩm",
                () => this.handleRemove()
            )
        );
    }

    render() {
        const { item } = this.props;
        const { onDetail, onRemove } = this.state;

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