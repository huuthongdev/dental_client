import React, { Component } from 'react';
import { Svg, RequestService, BranchUpdate, BranchDetailEmployees, FetchingData, TitleApp, CpnWraper } from '../../../refs';
import { connect } from 'react-redux';

class BranchDetail extends Component {
    state = {
        enableUpdate: false,
        loading: false,
        fetchDataStatus: false,
        dataDetail: null,
        subMenuActive: 'INFO'
    }

    componentDidMount() {
        const item = this.props.branch[this.props.indexDetail];
        RequestService.get('/branch/detail/' + item._id)
            .then(result => this.setState({ dataDetail: result, fetchDataStatus: true }))
            .catch(error => console.log(error.message));
    }

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    render() {
        let { close, indexDetail } = this.props;
        const item = this.props.branch[indexDetail];
        const { subMenuActive, dataDetail, fetchDataStatus } = this.state;
        const employees = dataDetail && dataDetail.employees ? dataDetail.employees : [];
        return (
            <CpnWraper>
                <TitleApp sub={`Chi nhánh ${item.name}`} />
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row">

                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="BRANCH" />
                                Chi nhánh: {item.name}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => close()} className="btn blue">
                                    <Svg name="BACK" />
                                    Trở lại
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {/* START SUBMENU */}
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu('INFO')} className={subMenuActive === 'INFO' ? 'active' : null}>
                                    Thông tin chung
                                </li>
                                <li onClick={() => this.changeSubMenu('EMPLOYEES')} className={subMenuActive === 'EMPLOYEES' ? 'active' : null}>
                                    Nhân sự
                                </li>
                            </ul>
                            {/* END SUBMENU */}

                            {!fetchDataStatus ? <FetchingData /> : null}
                            {fetchDataStatus && subMenuActive === 'INFO' && fetchDataStatus ? <BranchUpdate item={item} /> : null}
                            {fetchDataStatus && subMenuActive === 'EMPLOYEES' && fetchDataStatus ? <BranchDetailEmployees items={employees} /> : null}
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchDetail);