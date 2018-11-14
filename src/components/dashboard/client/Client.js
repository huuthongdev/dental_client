import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Svg, TitleApp, FetchingData, CpnWraper } from '../../../refs';

class Client extends Component {
    state = {
        createForm: false,
        detail: null,
        remove: null
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

    onRemove(data) {
        this.setState({
            createForm: false,
            detail: null,
            remove: data
        });
    }

    handleRemove() {
        // const { dispatch } = this.props;
        // const { remove } = this.state;
        // const loaded = () => this.returnMain();
    }

    returnMain() {
        this.setState({
            createForm: false,
            detail: null,
            remove: null
        });
    }

    render() {
        const { fetchDataStatus } = this.props;

        return (
            <CpnWraper>
                <TitleApp sub="Khách hàng" />

                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="BRANCH" />
                                Quản lí khách hàng
                                 </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.onCreateForm()} className="btn blue">
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
                        Khách hàng (0)
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
                                            <th>Tên khách hàng</th>
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Sinh nhật</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {this.showListBranch()} */}
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
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Client);