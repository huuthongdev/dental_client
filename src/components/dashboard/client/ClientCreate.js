import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnWraper, TitleApp } from '../../../refs';
import Svg from '../../Svg';

class ClientCreate extends Component {
    state = {
        loading: false,
        goBack: false,
        redirectToDetail: null
    };

    componentDidMount() {
        document.onkeyup = (e) => {
            if (e.which === 27) return this.setState({ goBack: true });
        }
    }

    render() {
        const { goBack, loading, redirectToDetail } = this.state;
        if (goBack) return <Redirect to="/client" />;
        if (redirectToDetail)
            return <Redirect to={`/client`} />;
        return (
            <CpnWraper>
                <TitleApp sub="Tạo khách hàng" />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="CLIENT" />
                                    Thêm mới khách hàng
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
        client: state.client
    };
}
export default connect(mapStateToProps, null)(ClientCreate);