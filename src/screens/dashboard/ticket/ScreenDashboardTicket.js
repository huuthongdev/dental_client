import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {
    ScreenDashboardTicketRow, CpnFetchingData, CpnSvg, ITEMS_PER_PAGE,
    convertToSearch, pageNavigation, ScreenDashboardWraper
} from '../../../refs';

class ScreenDashboardTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchName: ''
        }
        this.searchNameInput = createRef();
    }

    render() {
        const { fetchDataStatus, ticket } = this.props;
        const { currentPage, searchName } = this.state;

        let initData = ticket;

        // Search
        if (searchName) initData = initData.filter(v => convertToSearch(v.client.name).search(convertToSearch(searchName)) !== -1);

        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

        return (
            <ScreenDashboardWraper title="Hồ sơ điều trị">
                {!fetchDataStatus.ticket ? <CpnFetchingData /> : <Fragment >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="cpn-table-tools">
                                    <div className="tool-search">
                                        <input ref={this.searchNameInput} onChange={e => this.setState({ searchName: e.target.value })} type="text" placeholder="Tìm kiếm" />
                                        <CpnSvg name="SEARCH" />
                                    </div>
                                    <div onClick={() => {
                                        this.setState({ searchName: '' });
                                        this.searchNameInput.current.value = '';
                                    }} className="tool-reset">Reset</div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="cpn-tools-list">
                                    <Link to="/ticket/new">
                                        <button className="btn blue">
                                            <CpnSvg name="CREATE" />
                                            Tạo hồ sơ điều trị
                                        </button>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="sid">ID</th>
                                            <th>Tên khách hàng</th>
                                            <th>Bác sĩ</th>
                                            <th>Dịch vụ</th>
                                            <th>Trạng thái</th>
                                            <th>Phí nợ</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => (
                                            <ScreenDashboardTicketRow item={v} key={i} />)
                                        )}
                                    </tbody>
                                </table>

                                {initData.length > ITEMS_PER_PAGE ? <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={ITEMS_PER_PAGE}
                                    totalItemsCount={initData.length}
                                    pageRangeDisplayed={5}
                                    onChange={currentPage => this.setState({ currentPage })}
                                    activeClass="active"
                                    activeLinkClass="active"
                                /> : null}

                            </div>
                        </div>
                    </div>
                </Fragment>}

            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticket: state.ticket,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardTicket);