import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {
    TitleApp, TicketRow, FetchingData, Svg, ITEMS_PER_PAGE,
    convertToSearch, pageNavigation, CpnWraper
} from '../../../refs';

class Ticket extends Component {
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
            <CpnWraper>
                <TitleApp sub="Hồ sơ điều trị" />
                {!fetchDataStatus.ticket ? <FetchingData /> : <Fragment >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="cpn-table-tools">
                                    <div className="tool-search">
                                        <input ref={this.searchNameInput} onChange={e => this.setState({ searchName: e.target.value })} type="text" placeholder="Tìm kiếm" />
                                        <Svg name="SEARCH" />
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
                                            <Svg name="CREATE" />
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => (
                                            <TicketRow item={v} key={i} />)
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

            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticket: state.ticket,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(Ticket);