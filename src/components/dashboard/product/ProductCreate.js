import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Svg, TitleApp, createProduct, CpnWraper } from '../../../refs';

class ProductCreate extends Component {
    state = {
        loading: false,
        goBack: false,
        redirectToDetail: null
    };

    handleSubmit(e) {
        e.preventDefault();
        let { name, origin, unit, cost, suggestedRetailerPrice } = this.refs;
        name = name.value;
        origin = origin.value;
        unit = unit.value;
        cost = cost.value;
        suggestedRetailerPrice = suggestedRetailerPrice.value;

        this.setState({ loading: true });
        const { dispatch } = this.props;
        dispatch(createProduct({ name, origin, unit, cost, suggestedRetailerPrice },
            () => this.setState({ loading: false }),
            _id => this.setState({ redirectToDetail: _id })))
    }

    render() {
        const { goBack, loading, redirectToDetail } = this.state;
        if (goBack) return <Redirect to="/product" />;
        if (redirectToDetail)
            return <Redirect to={`/product`} />;

        return (
            <CpnWraper>
                <TitleApp sub="Tạo sản phẩm" />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="PRODUCT" />
                                    Thêm mới sản phẩm
                                </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.setState({ goBack: true })} className="cpn-form-close">
                                    <Svg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Tên sản phẩm:</label>
                                        <input ref="name" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Xuất xứ:</label>
                                        <input required ref="origin" type="string" list="origin" />
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
                                        <input required ref="unit" type="text" list="unit" />
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
                                        <input required ref="cost" type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Giá đề xuất:</label>
                                        <input required ref="suggestedRetailerPrice" type="number" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    {loading ? (
                                        <button type="submit" className="btn blue">
                                            <div className="loading-icon" />
                                        </button>
                                    ) : null}

                                    {!loading ? (
                                        <Fragment>
                                            <button type="submit" className="btn blue">
                                                Xác nhận
                                            </button>
                                            <button onClick={() => this.setState({ goBack: true })} className="btn outline-grey">
                                                Huỷ
                                            </button>
                                        </Fragment>
                                    ) : null}
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
export default connect(mapStateToProps, null)(ProductCreate);