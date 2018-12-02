import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Svg, TitleApp, FetchingData, CpnWraper, ClientRow } from '../../../refs';

class Client extends Component {
    state = { create: false };

    render() {
        const { create } = this.state;
        const { fetchDataStatus, client } = this.props;

        if (create) return <Redirect to='client/create' />
        return (
            <CpnWraper>
                <TitleApp sub="Khách hàng" />

                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="CLIENT" />
                                Chăm sóc khách hàng
                                 </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.setState({ create: true })} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo khách hàng
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
                {/* START SUBMENU */}
                <ul className="cpn-sub-menu">
                    <li className="active">
                        Khách hàng ({client.length})
                    </li>
                </ul>
                {/* END SUBMENU */}

                {!fetchDataStatus.client ? <FetchingData /> : <Fragment >
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
                                            <th>Tên khách hàng</th>
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Sinh nhật</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {client.map((v, i) => (
                                            <ClientRow item={v} key={i} />)
                                        )}
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
                </Fragment>}

            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Client);