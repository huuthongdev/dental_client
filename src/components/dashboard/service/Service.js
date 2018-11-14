import React, { Component, Fragment } from 'react';
import { TitleApp, Svg, FetchingData, ServiceCreate, ServiceRow, ServiceUpdate, ConfirmRemove, removeService, CpnWraper } from '../../../refs';
import { connect } from 'react-redux';

class Service extends Component {
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

    onRemove(data) {
        this.setState({
            createForm: false,
            branchDetail: null,
            remove: data
        });
    }

    handleRemove() {
        const { dispatch } = this.props;
        const loaded = () => this.returnMain();
        dispatch(removeService(this.state.remove._id, loaded));
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
            detail: null,
            remove: null
        });
    }

    showList() {
        let { service } = this.props;
        return service.map((v, i) => <ServiceRow onRemove={() => this.onRemove(v)} onDetail={() => this.onDetail(v)} item={v} key={i} />)
    }

    render() {
        const { fetchDataStatus } = this.props;
        const { createForm, detail, remove } = this.state;

        if (createForm) return <ServiceCreate returnMain={() => this.returnMain()} />
        if (detail) return <ServiceUpdate item={detail} returnMain={() => this.returnMain()} />
        return (
            <CpnWraper>
                <TitleApp sub="Dịch vụ" />

                {/* START COMPONENT TITLE */}
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
                        Dịch vụ ({this.props.service.length})
                    </li>
                </ul>
                {/* END SUBMENU */}

                {!fetchDataStatus.service ? <FetchingData /> : <Fragment >
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
                                        {this.showList()}
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
                {remove ? <ConfirmRemove
                    nameRelated={remove.name}
                    onCancel={() => this.returnMain()}
                    content="Xoá dịch vụ có thể ảnh hưởng đến dữ liệu của chi nhánh"
                    objectType="dịch vụ"
                    onNext={() => this.handleRemove()}
                /> : null}
            </CpnWraper>
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