import React, { Component, Fragment } from 'react';
import { Svg, updateService, CpnWraper, TitleApp } from '../../../refs';
import isEqual from 'react-fast-compare';
import { connect } from 'react-redux';

class ServiceUpdate extends Component {
    state = {
        loading: false,
        same: true
    }

    shouldEnableUpdate() {
        let { name, suggestedRetailerPrice, unit } = this.refs;
        name = name.value; suggestedRetailerPrice = +suggestedRetailerPrice.value; unit = unit.value;
        const refInput = { name, suggestedRetailerPrice, unit };
        const { item } = this.props;
        const current = { name: item.name, suggestedRetailerPrice: item.suggestedRetailerPrice, unit: item.unit };
        const same = isEqual(refInput, current);
        this.setState({ same });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        let { name, suggestedRetailerPrice, unit } = this.refs;
        name = name.value; suggestedRetailerPrice = +suggestedRetailerPrice.value; unit = unit.value;
        const dataSend = { name, suggestedRetailerPrice, unit };
        const { dispatch, item, returnMain } = this.props;
        dispatch(updateService(item._id, dataSend, returnMain))
            .then(() => this.setState({ loading: false, same: true }));
    }

    render() {
        const { item } = this.props;
        return (
            <CpnWraper>

                <TitleApp sub={`Dịch vụ ${item.name}`} />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="SERVICE" />
                                    Chỉnh sửa dịch vụ
                            </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.props.returnMain()} className="cpn-form-close">
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
                                        <label>Tên dịch vụ:</label>
                                        <input defaultValue={item.name} required ref="name" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Giá đề xuất:</label>
                                        <input defaultValue={item.suggestedRetailerPrice} required ref="suggestedRetailerPrice" type="number" />
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
        service: state.service
    };
}
export default connect(mapStateToProps, null)(ServiceUpdate);