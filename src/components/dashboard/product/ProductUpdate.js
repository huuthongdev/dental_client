import React, { Component, Fragment } from 'react';
import isEqual from 'react-fast-compare';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { updateProduct, Svg, TitleApp, CpnWraper } from '../../../refs';

class ProductUpdate extends Component {
    state = {
        loading: false,
        same: true,
        redirectToService: false
    }

    shouldEnableUpdate() {
        let { name, origin, unit, cost, suggestedRetailerPrice } = this.refs;
        name = name.value;
        origin = origin.value;
        unit = unit.value;
        cost = +cost.value;
        suggestedRetailerPrice = +suggestedRetailerPrice.value;
        const refInput = { name, origin, unit, cost, suggestedRetailerPrice };
        const { item } = this.props;
        const current = { name: item.name, origin: item.origin, unit: item.unit, cost: item.cost, suggestedRetailerPrice: item.suggestedRetailerPrice };
        const same = isEqual(refInput, current);
        this.setState({ same });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        let { name, origin, unit, cost, suggestedRetailerPrice } = this.refs;
        name = name.value;
        origin = origin.value;
        unit = unit.value;
        cost = cost.value;
        suggestedRetailerPrice = suggestedRetailerPrice.value;
        const dataSend = { name, origin, unit, cost, suggestedRetailerPrice };
        const { dispatch, item } = this.props;
        dispatch(updateProduct(
            item._id, dataSend,
            () => this.setState({ redirectToService: true }),
            () => this.setState({ loading: false })
        ))
    }

    render() {
        const item = this.props.product.filter(v => v._id === this.props.item._id)[0];

        if (this.state.redirectToService) return <Redirect to="/product" />
        return (
            <CpnWraper>
                <TitleApp sub={`Sản phẩm: ${this.props.item.name}`} />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="PRODUCT" />
                                    Chỉnh sửa sản phẩm
                            </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.setState({ redirectToService: true })} className="cpn-form-close">
                                    <Svg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)} onChange={() => this.shouldEnableUpdate()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Tên sản phẩm:</label>
                                        <input defaultValue={item.name} ref="name" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Xuất xứ:</label>
                                        <input defaultValue={item.origin} ref="origin" type="string" list="origin" />
                                        <datalist id="origin">
                                            <option value="HCM">
                                            </option><option value="Binh Thuan">
                                            </option><option value="Can Tho">
                                            </option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Đơn vị tính:</label>
                                        <input defaultValue={item.unit} required ref="unit" type="text" list="unit" />
                                        <datalist id="unit">
                                            <option value="HCM">
                                            </option><option value="Binh Thuan">
                                            </option><option value="Can Tho">
                                            </option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Giá cost:</label>
                                        <input defaultValue={item.cost} ref="cost" type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Giá đề xuất:</label>
                                        <input defaultValue={item.suggestedRetailerPrice} ref="suggestedRetailerPrice" type="number" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <button disabled={this.state.same} type="submit" className="btn blue">
                                        {this.state.loading ? <div className="loading-icon"></div> : null}
                                        {!this.state.loading ? <Fragment><Svg name="EDIT" /> Lưu thay đổi</Fragment> : null}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    };
}
export default connect(mapStateToProps, null)(ProductUpdate);