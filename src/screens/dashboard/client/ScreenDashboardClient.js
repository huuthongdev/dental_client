import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import {
    ITEMS_PER_PAGE, CpnFetchingData, CpnSvg, ScreenDashboardClientRow,
    ScreenDashboardWraper, CpnEmptyValue, ClientService
} from '../../../refs';

class ScreenDashboardClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initFetching: true,
            fetching: true,
            count: null,
            currentPage: 1,
            data: [],
            textSearch: ''
        }
        this.textSearchInput = createRef();
    }

    async componentWillMount() {
        await this.fetchData();
        this.setState({ initFetching: false });
    }

    filterData = (textSearch) => {
        this.fetchData(1, textSearch, true);
    }

    fetchData = (currentPage = this.state.currentPage, textSearch = this.state.textSearch, forceUpdate = false) => {
        this.setState({ fetching: true });
        const { client } = this.props;
        // Check fetched
        const check = client.pages.find(v => v.pageNumber === currentPage);
        if (check && !forceUpdate) return this.setState({ fetching: false, data: check.data, count: client.count });
        return ClientService.set((currentPage - 1) * ITEMS_PER_PAGE, currentPage, textSearch, forceUpdate)
            .then(res => {
                if (!res) return this.setState({ fetching: false });
                return this.setState({ data: res.data, count: +res.count, fetching: false });
            });
    }

    render() {
        const { currentPage, data, count, fetching, initFetching, textSearch } = this.state;

        if (initFetching) return <CpnFetchingData dashboardWraper />
        return (
            <ScreenDashboardWraper title="Khách hàng">
                <Fragment>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="cpn-table-tools">
                                    <div className="tool-search">
                                        <input
                                            ref={this.textSearchInput}
                                            value={this.state.textSearch}
                                            onChange={e => {
                                                const value = e.target.value;
                                                this.setState({ textSearch: e.target.value });
                                                setTimeout(() => {
                                                    if (value !== this.state.textSearch) return;
                                                    this.filterData(value);
                                                }, 500);
                                            }}
                                            type="text"
                                            placeholder="Tìm kiếm"
                                        />
                                        <CpnSvg name="SEARCH" />
                                    </div>
                                    <div onClick={() => {
                                        if (!textSearch) return;
                                        this.setState({ textSearch: '' });
                                        this.textSearchInput.current.value = '';
                                        this.fetchData(1, '', true);
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

                            <div className="col-sm-12">
                                {fetching ? <CpnFetchingData message="Đang tìm kiếm..." /> : null}
                                {!fetching && data.length === 0 ? <CpnEmptyValue message={`${textSearch ? `Không tìm thấy khách hàng với từ khoá "${textSearch}"` : 'Chưa có khách hàng nào'}`} /> : null}
                                {!fetching && data.length > 0 ? <Fragment>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="sid">ID</th>
                                                <th>Tên khách hàng</th>
                                                <th>Điện thoại</th>
                                                <th>Email</th>
                                                <th>Địa chỉ</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((v, i) => (
                                                <ScreenDashboardClientRow item={v} key={i} />)
                                            )}
                                        </tbody>
                                    </table>

                                    {count > ITEMS_PER_PAGE ? <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={ITEMS_PER_PAGE}
                                        totalItemsCount={+count}
                                        pageRangeDisplayed={5}
                                        onChange={currentPage => {
                                            this.setState({ currentPage });
                                            this.fetchData(+currentPage);
                                        }}
                                        activeClass="active"
                                        activeLinkClass="active"
                                    /> : null}
                                </Fragment> : null}
                            </div>
                        </div>
                    </div>
                </Fragment>
            </ScreenDashboardWraper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client
    };
}
export default connect(mapStateToProps)(ScreenDashboardClient);