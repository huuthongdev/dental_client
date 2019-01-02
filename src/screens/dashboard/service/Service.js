import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { TitleApp, Svg, FetchingData, CpnWraper, ServiceRow, convertToSearch, ITEMS_PER_PAGE, pageNavigation } from '../../../refs';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchName: ''
        }
        this.searchNameInput = createRef();
    }

    render() {
        const { fetchDataStatus, service } = this.props;
        const { currentPage, searchName } = this.state;

        let initData = service;

        // Search
        if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1);

        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

        return (
            <CpnWraper>
                <TitleApp sub="Dịch vụ" />

                {!fetchDataStatus.service ? <FetchingData /> : null}
                {fetchDataStatus.service ? <Fragment >
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
                                    }} className="tool-reset">
                                        Reset
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="cpn-tools-list">
                                    <Link to='/service/new'>
                                        <button onClick={() => this.setState({ create: true })} className="btn blue">
                                            <Svg name="CREATE" />
                                            Tạo dịch vụ
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="sid">ID</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Giá bán đề xuất</th>
                                            <th>Giá chi nhánh</th>
                                            <th>Đơn vị tính</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => <ServiceRow item={v} key={i} />)}
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
            </CpnWraper >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Service);