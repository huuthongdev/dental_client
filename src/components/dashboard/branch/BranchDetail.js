import React, { Component } from 'react';
import { FadeAnimate, Svg, RequestService, BranchUpdate, BranchDetailEmployees } from '../../../refs';
import { connect } from 'react-redux';

class BranchDetail extends Component {
    state = {
        enableUpdate: false,
        loading: false,
        fetchDataStatus: false,
        dataDetail: null,
        subMenuActive: 'EMPLOYEES'
    }

    componentDidMount() {
        const { item } = this.props;
        RequestService.get('/branch/detail/' + item._id)
            .then(result => this.setState({ dataDetail: result, fetchDataStatus: true }))
            .catch(error => console.log(error.message));
    }

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    render() {
        const { close, onCreateForm, item } = this.props;
        const { subMenuActive, dataDetail } = this.state;
        const employees = dataDetail && dataDetail.employees ? dataDetail.employees : [];
        // const clients = dataDetail && dataDetail.clients ? dataDetail.clients : [];

        return (
            <FadeAnimate>
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row">

                        <BranchUpdate item={item} />

                        <div className="col">
                            <div className="cpn-tools-list">
                                <button onClick={() => onCreateForm()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo chi nhánh
                                </button>
                                <button onClick={() => close()} className="btn blue">
                                    <Svg name="BACK" />
                                    Trở lại
                                </button>
                            </div>

                            {/* START SUBMENU */}
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu('EMPLOYEES')} className={subMenuActive === 'EMPLOYEES' ? 'active' : null}>
                                    Nhân sự
                                </li>
                                <li onClick={() => this.changeSubMenu('CLIENTS')} className={subMenuActive === 'CLIENTS' ? 'active' : null}>
                                    Khách hàng
                                </li>
                            </ul>
                            {/* END SUBMENU */}

                            {subMenuActive === 'EMPLOYEES' ? <BranchDetailEmployees items={employees} /> : null}


                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
            </FadeAnimate>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchDetail);