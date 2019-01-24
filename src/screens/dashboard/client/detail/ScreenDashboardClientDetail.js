import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ScreenDashboardWraper, CpnFetchingData, TitleApp, CpnSvg, ScreenDashboardClientDetailUpdate, ClientService, ShortKeyService } from '../../../../refs';

class ScreenDashboardClientDetail extends Component {
    state = {
        fetching: true,
        subMenuActive: "INFO",
        client: null,
        goBack: false
    };

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    componentDidMount() {
        this.setDetail();
        ShortKeyService.esc(() => this.setState({ goBack: true }));
    }

    setDetail() {
        this.setState({ fetching: true });
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        const { clientDetail } = this.props;
        const client = clientDetail.find(v => v._id === _id);
        if (client) return this.setState({ fetching: false, client });
        ClientService.getDetail(_id)
            .then(client => this.setState({ fetching: false, client }));
    }

    render() {
        const { subMenuActive, fetching, client, goBack } = this.state;

        if (goBack) return <Redirect to="/client" />

        if (fetching) {
            return (
                <ScreenDashboardWraper>
                    <CpnFetchingData />
                </ScreenDashboardWraper>
            );
        }

        if (!fetching && !client) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

        return (
            <ScreenDashboardWraper>
                <TitleApp sub={`Khách hàng ${client.name}`} />
                <div className="container-fluid cpn-head">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <CpnSvg name="CLIENT" />
                                Khách hàng: {client.name}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <Link to={`/ticket/new/${client._id}`}>
                                    <button className="btn blue">
                                        <CpnSvg name="CREATE" />
                                        Tạo phiếu điều trị
               					    </button>
                                </Link>
                                <Link to="/client">
                                    <button className="btn grey">
                                        <CpnSvg name="BACK" />
                                        Trở lại
               					    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null} >
                                    <CpnSvg name="INFO" />
                                    Thông tin chung
                				</li>
                            </ul>
                        </div>

                        {subMenuActive === "INFO" ? <ScreenDashboardClientDetailUpdate detail={client} /> : null}
                    </div>
                </div>
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clientDetail: state.clientDetail,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardClientDetail);