import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnWraper, FetchingData, TitleApp, Svg, ClientUpdate, ClientService } from '../../../refs';

class ClientDetail extends Component {
    state = {
        fetching: true,
        subMenuActive: "INFO",
        client: null
    };

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    componentDidMount() {
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        const { clientDetail } = this.props;
        const client = clientDetail.find(v => v._id === _id);
        if (client) return this.setState({ fetching: false, client });
        ClientService.getDetail(_id)
            .then(client => this.setState({ fetching: false, client }))
    }

    render() {
        const { subMenuActive, fetching, client } = this.state;

        if (fetching) {
            return (
                <CpnWraper>
                    <FetchingData />
                </CpnWraper>
            );
        }

        if (!fetching && !client) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

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
                                <Link to={`/ticket/new/${client._id}`}>
                                    <button className="btn blue">
                                        <Svg name="CREATE" />
                                        Tạo phiếu điều trị
               					    </button>
                                </Link>
                                <button className="btn blue" onClick={() => this.props.history.goBack()}>
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

                        {subMenuActive === "INFO" ? <ClientUpdate detail={client} /> : null}
                    </div>
                </div>
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clientDetail: state.clientDetail,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(ClientDetail);