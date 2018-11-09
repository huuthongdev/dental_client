import React, { Component, Fragment } from 'react';
import { Svg, FadeAnimate, createService } from '../../../refs';
import { connect } from 'react-redux';

class ServiceCreate extends Component {
    state = {
        loading: false
    }

    handleSubmit(e) {
        e.preventDefault();
        let { name, suggestedRetailerPrice, unit } = this.refs;
        name = name.value; suggestedRetailerPrice = suggestedRetailerPrice.value; unit = unit.value;
        this.setState({ loading: true });
        const { dispatch } = this.props;
        const loaded = () => this.setState({ loading: false });
        dispatch(createService({ name, suggestedRetailerPrice, unit }, this.props.returnMain, loaded))
    }

    showLoadingButton() {
        const { loading } = this.state;
        if (loading) return <button type="submit" className="btn blue"> <div className="loading-icon"></div> </button>
        return <Fragment>
            <button type="submit" className="btn blue"> Xác nhận </button>
            <button onClick={() => this.props.returnMain()} className="btn outline-grey"> Huỷ </button>
        </Fragment>
    }

    render() {
        return (
            <Fragment>
                <FadeAnimate>
                    <div className="cpn-form">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-8">
                                    <div className="cpn-form-title">
                                        <Svg name="SERVICE" />
                                        Thêm mới dịch vụ
                            </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <button onClick={() => this.props.returnMain()} className="cpn-form-close">
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
                                            <label>Tên dịch vụ:</label>
                                            <input required ref="name" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Giá đề xuất:</label>
                                            <input required ref="suggestedRetailerPrice" type="number" />
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
                                        {this.showLoadingButton()}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </FadeAnimate>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service
    };
}
export default connect(mapStateToProps, null)(ServiceCreate);