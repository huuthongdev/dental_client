import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Svg, createService, CpnWraper, TitleApp } from '../../../refs';

class ServiceCreate extends Component {
    state = {
        loading: false,
        goBack: false,
        redirectToDetail: null
    };

    handleSubmit(e) {
        e.preventDefault();
        let { name, suggestedRetailerPrice, unit } = this.refs;
        name = name.value; suggestedRetailerPrice = suggestedRetailerPrice.value; unit = unit.value;
        this.setState({ loading: true });
        const { dispatch } = this.props;
        dispatch(createService(
            { name, suggestedRetailerPrice, unit },
            () => this.setState({ loading: false }),
            _id => this.setState({ redirectToDetail: _id })
        ))
    }

    render() {
        const { goBack, loading, redirectToDetail } = this.state;
        if (goBack) return <Redirect to="/service" />;
        if (redirectToDetail)
            return <Redirect to={`/service`} />;
        return (
            <CpnWraper>
                <TitleApp sub="Tạo dịch vụ" />
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
        service: state.service
    };
}
export default connect(mapStateToProps, null)(ServiceCreate);