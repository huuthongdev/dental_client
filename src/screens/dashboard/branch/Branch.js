import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { TitleApp, Svg, BranchRow, FetchingData, CpnWraper, ITEMS_PER_PAGE, pageNavigation, convertToSearch } from "../../../refs";

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchName: ''
    }
    this.searchNameInput = createRef();
  }

  render() {
    const { fetchDataStatus, branch } = this.props;
    const { currentPage, searchName } = this.state;

    let initData = branch;

    // Search
    if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1);

    const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

    return (
      <CpnWraper>
        <TitleApp sub="Chi nhánh" />

        {!fetchDataStatus.branch ? <FetchingData /> : null}
        {fetchDataStatus.branch ? (
          <Fragment>
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
                    <Link to="/branch/new">
                      <button onClick={() => this.setState({ create: true })} className="btn blue">
                        <Svg name="CREATE" />
                        Tạo chi nhánh
                    </button>
                    </Link>
                  </div>
                </div>

                <div className="col-sm-12">
                  <table>
                    <thead>
                      <tr>
                        <th className="sid">ID</th>
                        <th>Tên chi nhánh</th>
                        <th>Số - Tên đường</th>
                        <th>Quận/Xã</th>
                        <th>Thành phố</th>
                        <th>Điện thoại</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postsPage.map((v, i) => (
                        <BranchRow item={v} key={i} />
                      ))}
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
          </Fragment>
        ) : null}
      </CpnWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    branch: state.branch,
    fetchDataStatus: state.fetchDataStatus
  };
};
export default connect(
  mapStateToProps,
  null
)(Branch);
