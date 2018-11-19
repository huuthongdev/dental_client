import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { TitleApp, Svg, FetchingData, CpnWraper, ServiceRow } from '../../../refs';

class Service extends Component {
    state = { create: false };

    render() {
        const { fetchDataStatus, service } = this.props;
        const { create } = this.state;

        if (create) return <Redirect to='/service/create' />
        return (
            <CpnWraper>
                <TitleApp sub="Dịch vụ" />

                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="SERVICE" />
                                Quản lí dịch vụ
                                 </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.setState({ create: true })} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo dịch vụ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="cpn-sub-menu">
                    <li className="active">
                        Dịch vụ ({this.props.service.length})
                    </li>
                </ul>

                {!fetchDataStatus.service ? <FetchingData /> : null}
                {fetchDataStatus.service ? <Fragment >
                    <div className="cpn-table-tools">
                        <div className="tool-search">
                            <input type="text" placeholder="Tìm kiếm" />
                            <Svg name="SEARCH" />
                        </div>
                        <div className="tool-select">
                            <select>
                                <option value={1}>Tất cả</option>
                                <option value={1}>A - Z</option>
                                <option value={1}>Z - A</option>
                            </select>
                        </div>
                        <div className="tool-reset">
                            Reset
                    </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="sid">ID</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Giá bán đề xuất</th>
                                            <th>Giá chi nhánh</th>
                                            <th>Đơn vị tính</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {service.map((v, i) => <ServiceRow item={v} key={i} />)}
                                    </tbody>
                                </table>

                                <div className="paging">
                                    <ul>
                                        <li className="active">1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment> : null}
            </CpnWraper >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Service);