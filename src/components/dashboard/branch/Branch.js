import React, { Component, Fragment } from 'react';
import { TitleApp, Svg,BranchRow, FetchingData, ConfirmRemove, removeBranch, CpnWraper } from '../../../refs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Branch extends Component {
    state = {
        createForm: false,
        remove: null
    }

    onRemove(data) {
        this.setState({
            createForm: false,
            indexDetail: null,
            remove: data
        });
    }

    handleRemove() {
        const { dispatch } = this.props;
        const { remove } = this.state;
        const loaded = () => this.returnMain();
        return dispatch(removeBranch(remove._id, loaded));
    }

    showListBranch() {
        let { branch } = this.props;
        return branch.map((v, i) => <BranchRow onRemove={() => this.onRemove(v)} item={v} key={i} />)
    }

    render() {
        const { createForm, remove } = this.state;
        const { fetchDataStatus } = this.props;

        // Show Create Form
        if (createForm) return <Redirect to={{ pathname: '/branch/create', state: { from: this.props.location } }} />
        // Show Branch Cpn
        return <CpnWraper>
            <TitleApp sub="Chi nhánh" />
            {/* START COMPONENT TITLE */}
            <div className="container-fluid cpn-head">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="cpn-title">
                            <Svg name="BRANCH" />
                            Quản lí chi nhánh
                                 </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="cpn-tools-list">
                            <button onClick={() => this.setState({ createForm: true })} className="btn blue">
                                <Svg name="CREATE" />
                                Tạo chi nhánh
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* END COMPONENT TITLE */}

            {/* START SUBMENU */}
            <ul className="cpn-sub-menu">
                <li className="active">
                    Chi nhánh ({this.props.branch.length})
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
                                        <th>Tên chi nhánh</th>
                                        <th>Số - Tên đường</th>
                                        <th>Quận/Xã</th>
                                        <th>Thành phố</th>
                                        <th>Điện thoại</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showListBranch()}
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

            {/* Confirm Remove */}
            {this.state.remove ? <ConfirmRemove
                nameRelated={remove.name}
                onCancel={() => this.returnMain()}
                content="Xoá chi nhánh có thể ảnh hưởng đến dữ liệu của chi nhánh bao gồm: Nhân sự, Khách hàng, Phiếu điều trị, KPI"
                objectType="chi nhánh"
                onNext={() => this.handleRemove()}
            /> : null}
        </CpnWraper>
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Branch);