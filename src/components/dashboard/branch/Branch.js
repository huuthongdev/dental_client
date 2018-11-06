import React, { Component } from 'react';
import { Dashboard, TitleApp, Svg, BranchCreate, BranchRow, BranchDetail } from '../../../refs';
import { connect } from 'react-redux';

class Branch extends Component {
    state = {
        createForm: false,
        branchDetail: null
    }

    onCreateForm() { 
        this.setState({ 
            createForm: true, 
            branchDetail: null 
        }); 
    }

    onDetail(data) {
        this.setState({
            createForm: false,
            branchDetail: data
        });
    }

    returnMain() {
        this.setState({
            createForm: false,
            branchDetail: null
        });
    }
    
    showListBranch() {
        let { branch } = this.props;
        return branch.map((v, i) => <BranchRow onDetail={() => this.onDetail(v)} item={v} key={i} />)
    }

    render() {
        const { createForm, branchDetail } = this.state;

        if (branchDetail) return <Dashboard> <TitleApp sub={`Chi nhánh ${branchDetail.name}`}/> <BranchDetail onCreateForm={() => this.onCreateForm()}  close={() => this.returnMain()} item={branchDetail} /> </Dashboard>
        if (createForm) return <Dashboard> <TitleApp sub="Create Branch" /> <BranchCreate closeForm={() => this.returnMain()} /> </Dashboard>
        return (
            <Dashboard>
                <TitleApp sub="Branch" />
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
                                <button onClick={() => this.onCreateForm()} className="btn blue">
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
                        Chi nhánh (18)
                    </li>
                </ul>
                {/* END SUBMENU */}
                {/* START TABLE TOOLS */}
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
                {/* END TABLE TOOLS */}
                {/* START BRANCH TABLE */}
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
                {/* END BRANCH TABLE */}
            </Dashboard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(Branch);