import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import {
    convertToSearch, ITEMS_PER_PAGE, pageNavigation,
    CpnFetchingData, CpnSvg, ScreenDashboardClientRow, ScreenDashboardWraper, CpnEmptyValue
} from '../../../refs';

class ScreenDashboardClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchName: ''
        }
        this.searchNameInput = createRef();
    }

    render() {
        const { fetchDataStatus, client } = this.props;
        const { currentPage, searchName } = this.state;

        let initData = client;

        // Search
        if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1
            || convertToSearch(v.phone).search(convertToSearch(searchName)) !== -1
        );

        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

        return (
            <ScreenDashboardWraper title="Khách hàng">
                {!fetchDataStatus.client ? <CpnFetchingData /> : <Fragment >
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
                                    <Link to="/client/new">
                                        <button className="btn blue">
                                            <CpnSvg name="CREATE" />
                                            Tạo khách hàng
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {client.length === 0 ? <div className="col-sm-12"><CpnEmptyValue message="Chưa có khách hàng nào" /></div> : <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th className="sid">ID</th> */}
                                            <th>Tên khách hàng</th>
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Sinh nhật</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => (
                                            <ScreenDashboardClientRow item={v} key={i} />)
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

                            </div>}
                        </div>
                    </div>
                </Fragment>}

            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardClient);