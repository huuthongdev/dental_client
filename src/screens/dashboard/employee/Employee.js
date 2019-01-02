import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import {
	Svg,
	TitleApp,
	EmployeeRow,
	CpnWraper,
	FetchingData,
	pageNavigation,
	ITEMS_PER_PAGE,
	convertToSearch
} from "../../../refs";

class Employee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			searchName: ''
		}
		this.searchNameInput = createRef();
	}

	render() {
		const { currentPage, searchName } = this.state;
		const { fetchDataStatus, employee } = this.props;

		let initData = employee;
		// Search
		if (searchName) initData = initData.filter(v => convertToSearch(v.name).search(convertToSearch(searchName)) !== -1);

		const postsPage = pageNavigation(currentPage, ITEMS_PER_PAGE, initData);

		return (
			<CpnWraper>
				<TitleApp sub="Nhân sự" />

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
										<Link to="/employee/new">
											<button className="btn blue">
												<Svg name="CREATE" />
												Tạo nhân sự
                							</button>
										</Link>
									</div>
								</div>

								<div className="col-sm-12">
									<table>
										<thead>
											<tr>
												<th className="sid">ID</th>
												<th>Họ & Tên</th>
												<th>Số điện thoại</th>
												<th>Email</th>
												<th>Địa chỉ</th>
												<th>Chi nhánh - Chức vụ</th>
												<th>Thao tác</th>
											</tr>
										</thead>
										<tbody>
											{postsPage.map((v, i) => (
												<EmployeeRow item={v} key={i} />
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
		employee: state.employee,
		fetchDataStatus: state.fetchDataStatus
	};
};
export default connect(
	mapStateToProps
)(Employee);
