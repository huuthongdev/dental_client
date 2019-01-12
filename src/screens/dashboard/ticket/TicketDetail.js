import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ScreenDashboardWraper, TicketService, FetchingData, TitleApp, CpnSvg, convertGender, TicketDetailCalendar, TicketDetailCalendarPopupAdd } from '../../../refs';

class TicketDetail extends Component {
    state = {
        fetching: true,
        tabActive: "CALENDAR",
        ticket: null,
        isCreateCalendar: false
    };

    changeSubMenu(menu) {
        return this.setState({ tabActive: menu });
    }

    goBackNavigation() {
        this.setState({ navigation: 'MAIN' });
    }

    componentWillMount() {
        const { state } = this.props.location;
        if (state) this.setState({ isCreateCalendar: state.isCreateCalendar });
    }

    componentDidMount() {
        // Check Fetched Detail
        const { state } = this.props.location;
        const { _id } = this.props.match.params;
        const { ticketDetail } = this.props;
        
        const ticket = ticketDetail.find(v => v._id === _id);

        if (ticket) return this.setState({
            ticket,
            fetching: false,
            isCreateCalendar: state ? state.isCreateCalendar : false
        });

        TicketService.getDetail(_id)
            .then(ticket => this.setState({
                ticket,
                fetching: false,
                isCreateCalendar: state ? state.isCreateCalendar : false
            }));
    }

    render() {
        const { fetching, ticket, tabActive, isCreateCalendar } = this.state;

        console.log(this.props);

        if (fetching) {
            return (
                <ScreenDashboardWraper>
                    <FetchingData />
                </ScreenDashboardWraper>
            );
        }

        if (!fetching && !ticket) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

        const { gender, name, phone, city, district, address, medicalHistory } = ticket.client;
        const { totalAmount, dentistResponsible } = ticket;

        return (
            <ScreenDashboardWraper>
                <TitleApp sub={`Hồ sơ KH: ${ticket.client.name}`} />

                {isCreateCalendar ? <TicketDetailCalendarPopupAdd
                    dentistResponsible={dentistResponsible}
                    goBack={() => this.setState({ isCreateCalendar: false })}
                /> : null}

                <div className="row">
                    <div className="col-sm-3">
                        <div className="cpn-client-info">
                            <div className="title"><CpnSvg name="TICKET" /> Hồ sơ điều trị
                                <p>KH: {`${name}`}</p>
                            </div>
                            <div className="item">
                                <div className="label">• Giới tính</div>
                                <div className="content">{convertGender(gender)}</div>
                            </div>
                            <div className="item">
                                <div className="label">• Điện thoại</div>
                                <div className="content">{phone}</div>
                            </div>
                            <div className="item">
                                <div className="label">• Địa chỉ</div>
                                <div className="content">{`${address} - ${district} - ${city}`}</div>
                            </div>
                            <div className="item">
                                <div className="label">• Lịch sử bệnh lí</div>
                                <div className="content">{medicalHistory.map((value, key) => <span key={key}>- {value} <br /></span>)}</div>
                            </div>
                            <div className="item">
                                <div className="label">• Bác sĩ phụ trách</div>
                                <div className="content">{dentistResponsible.name}</div>
                            </div>
                            <div className="item">
                                <div className="label">• Tổng phí</div>
                                <div className="content">{totalAmount.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">

                        <div className="cpn-tools-list">
                            <button className="btn blue" onClick={() => this.setState({ isCreateCalendar: true })}>
                                <CpnSvg name="CREATE" />
                                Tạo lịch hẹn
                            </button>
                            <Link to="/ticket">
                                <button className="btn grey">
                                    <CpnSvg name="BACK" />
                                    Trở lại
                                </button>
                            </Link>

                        </div>


                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="cpn-sub-menu">
                                    <li onClick={() => this.changeSubMenu("CALENDAR")} className={tabActive === "CALENDAR" ? "active" : null} >
                                        <CpnSvg name="DATE" />
                                        Lịch điều trị
                                        </li>
                                </ul>
                            </div>

                            <div className="col-sm-12">
                                <TicketDetailCalendar ticket={ticket} />
                            </div>
                        </div>

                    </div>
                </div>
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticketDetail: state.ticketDetail
    };
}
export default connect(mapStateToProps)(TicketDetail);