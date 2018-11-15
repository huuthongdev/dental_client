import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Svg, BranchUpdate, FetchingData, TitleApp, CpnWraper, RequestService, BranchDetailEmployees } from '../../../refs';

class BranchDetail extends Component {
    state = {
        fetchDataDetailStatus: false,
        dataDetail: null,
        subMenuActive: 'INFO',
        onBack: false
    }

    componentDidMount() {
        const { _id } = this.props.match.params;
        RequestService.get('/branch/detail/' + _id)
            .then(result => this.setState({ dataDetail: result, fetchDataDetailStatus: true }))
            .catch(error => console.log(error.message));
    }

    onBack() {
        if (!this.state.onBack) return;
        return <Redirect to='/branch' />
    }

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    render() {
        const { subMenuActive, dataDetail, fetchDataDetailStatus } = this.state;
        const { _id } = this.props.match.params;
        const { fetchDataStatus } = this.props;

        if (!fetchDataStatus.branch) return <CpnWraper><FetchingData /></CpnWraper>
        const branch = this.props.branch.filter(v => v._id === _id)[0];
        if (!branch) return <CpnWraper>Không tìm thấy dữ liệu</CpnWraper>
        return (
            <CpnWraper>
                <TitleApp sub={`Chi nhánh ${branch ? branch.name : null}`} />
                {this.onBack()}

                <div className="container-fluid cpn-head">
                    <div className="row">

                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="BRANCH" />
                                Chi nhánh: {branch ? branch.name : null}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button className="btn blue" onClick={() => this.setState({ onBack: true })}>
                                    <Svg name="BACK" />
                                    Trở lại
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu('INFO')} className={subMenuActive === 'INFO' ? 'active' : null}>
                                    Thông tin chung
                                </li>
                                <li onClick={() => this.changeSubMenu('EMPLOYEES')} className={subMenuActive === 'EMPLOYEES' ? 'active' : null}>
                                    Nhân sự
                                </li>
                            </ul>

                            {!fetchDataDetailStatus ? <FetchingData /> : null}
                            {fetchDataDetailStatus && subMenuActive === 'INFO' ? <BranchUpdate item={branch} /> : null}
                            {fetchDataDetailStatus && subMenuActive === 'EMPLOYEES' ? <BranchDetailEmployees items={dataDetail.employees} /> : null}
                        </div>
                    </div>
                </div>
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(BranchDetail);