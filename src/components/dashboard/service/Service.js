import React, { Component, Fragment } from 'react';
import { Dashboard, TitleApp, Svg, FetchingData } from '../../../refs';
import { connect } from 'react-redux';

class Service extends Component {
    state = {
        createForm: false,
        detail: null
    }

    onCreateForm() {
        this.setState({
            createForm: true,
            detail: null
        });
    }

    onDetail(data) {
        this.setState({
            createForm: false,
            detail: data
        });
    }

    returnMain() {
        this.setState({
            createForm: false,
            detail: null
        });
    }

    render() {
        return (
            <Dashboard>
                <TitleApp sub="Dịch vụ" />
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="BRANCH" />
                                Quản lí dịch vụ
                                 </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.onCreateForm()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo dịch vụ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
                {/* START SUBMENU */}
                <ul className="cpn-sub-menu">
                    <li className="active">
                        Dịch vụ (18)
                    </li>
                </ul>
                {/* END SUBMENU */}

                {!fetchDataStatus.branch ? <FetchingData /> : <Fragment >
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
            </Dashboard>
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