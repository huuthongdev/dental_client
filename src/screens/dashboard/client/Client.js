import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Svg, TitleApp, CpnWraper, ClientInformations, ClientTicket } from '../../../refs';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: 'CLIENT_INFORMATIONS'
        }
    }

    render() {
        const { client, ticket } = this.props;
        const { tabActive } = this.state;

        return (
            <CpnWraper>

                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-12">
                            <div className="cpn-tools-list text-left">
                                <Link to="/client/new">
                                    <button className="btn blue">
                                        <Svg name="CREATE" />
                                        Tạo khách hàng
                                    </button>
                                </Link>
                                <Link to="/client/ticket/new">
                                    <button className="btn blue">
                                        <Svg name="CREATE" />
                                        Tạo phiếu điều trị
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="cpn-sub-menu">
                    <li onClick={() => this.setState({ tabActive: 'CLIENT_INFORMATIONS' })} className={tabActive === 'CLIENT_INFORMATIONS' ? 'active' : ''}>
                        Thông tin Khách hàng ({client.length})
                    </li>
                    <li onClick={() => this.setState({ tabActive: 'CLIENT_TICKETS' })} className={tabActive === 'CLIENT_TICKETS' ? 'active' : ''}>
                        Hồ sơ điều trị ({ticket.length})
                    </li>
                </ul>

                {tabActive === 'CLIENT_INFORMATIONS' ? <ClientInformations /> : null}
                {tabActive === 'CLIENT_TICKETS' ? <ClientTicket /> : null}

            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticket: state.ticket,
        client: state.client,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Client);