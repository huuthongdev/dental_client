import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnWraper, FetchingData, TitleApp, Svg, ClientUpdate, ClientService } from '../../../refs';

class ClientDetail extends Component {
    state = {
        fetchDataDetailStatus: false,
        subMenuActive: "INFO",
        goBack: false
    };

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    componentDidMount() {
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        const client = this.props.client.filter(v => v._id === _id)[0];
        if (client && client.detail)
            return this.setState({ fetchDataDetailStatus: true });
        ClientService.getDetail(_id)
            .then(() => this.setState({ fetchDataDetailStatus: true }))
    }

    render() {
        const { subMenuActive, goBack } = this.state;
        const { _id } = this.props.match.params;
        const { fetchDataStatus } = this.props;

        // Waiting for fetch data store
        if (!fetchDataStatus.client) {
            return (
                <CpnWraper>
                    <FetchingData />
                </CpnWraper>
            );
        }

        // Find client in clients store
        const client = this.props.client.filter(v => v._id === _id)[0];
        if (!client) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

        // Redirect to client table
        if (goBack) return <Redirect to="/client" />;

        return (
            <CpnWraper>
                <TitleApp sub={`Khách hàng ${client.name}`} />
                <div className="container-fluid cpn-head">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="CLIENT" />
                                Khách hàng: {client.name}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <Link to={`/client/ticket/new/${client._id}`}>
                                    <button className="btn blue" onClick={() => this.setState({ goBack: true })}>
                                        <Svg name="CREATE" />
                                        Tạo phiếu điều trị
               					    </button>
                                </Link>
                                <button className="btn blue" onClick={() => this.setState({ goBack: true })}>
                                    <Svg name="BACK" />
                                    Trở lại
               					</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null} >
                                    <Svg name="INFO" />
                                    Thông tin chung
                				</li>
                            </ul>
                        </div>

                        {subMenuActive === "INFO" ? <ClientUpdate item={client} /> : null}
                    </div>
                </div>
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
export default connect(mapStateToProps, null)(ClientDetail);