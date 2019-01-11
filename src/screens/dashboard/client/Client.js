import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import {
    convertToSearch, ITEMS_PER_PAGE, pageNavigation,
    FetchingData, Svg, TitleApp, ClientRow
} from '../../../refs';
import { CpnWraper } from '../../../refs';

class Client extends Component {
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
        if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1);

        const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

        return (
            <CpnWraper>
                <TitleApp sub="Khách hàng" />

                {!fetchDataStatus.client ? <FetchingData /> : <Fragment >
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
                                    <Link to="/client/new">
                                        <button className="btn blue">
                                            <Svg name="CREATE" />
                                            Tạo khách hàng
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
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Sinh nhật</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postsPage.map((v, i) => (
                                            <ClientRow item={v} key={i} />)
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
        client: state.client,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Client);