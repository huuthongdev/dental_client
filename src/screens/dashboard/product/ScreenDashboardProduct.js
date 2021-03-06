import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { CpnSvg, CpnFetchingData, ScreenDashboardProductRow, ScreenDashboardWraper, convertToSearch, pageNavigation, ITEMS_PER_PAGE } from '../../../refs';

class ScreenDashboardProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchName: ''
        }
        this.searchNameInput = createRef();
    }

    render() {
        const { searchName, currentPage } = this.state;
        const { fetchDataStatus, product } = this.props;

        let initData = product;

        // Search
        if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1);

        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

        return (
            <ScreenDashboardWraper title="Sản phẩm">
                {!fetchDataStatus.product ? <CpnFetchingData /> : null}
                {fetchDataStatus.product ? <Fragment >

                    {/* START TABLE TOOLS */}
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
                                    <Link to="/product/new">
                                        <button className="btn blue">
                                            <CpnSvg name="CREATE" />
                                            Tạo sản phẩm
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END TABLE TOOLS */}
                    {/* START BRANCH TABLE */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="sid">ID</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá nhập</th>
                                            <th>Giá đề xuất</th>
                                            <th>Giá chi nhánh</th>
                                            <th>Đơn vị</th>
                                            <th>Kho tổng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => <ScreenDashboardProductRow onRemove={() => this.onRemove(v)} onDetail={() => this.onDetail(v)} item={v} key={i} />)}
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
                </Fragment> : null}
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardProduct);