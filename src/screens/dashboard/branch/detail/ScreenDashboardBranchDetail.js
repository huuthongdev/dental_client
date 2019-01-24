import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
	CpnSvg,
	ScreenDashboardBranchDetailUpdate,
	CpnFetchingData,
	TitleApp,
	ScreenDashboardWraper,
	ScreenDashboardBranchDetailEmployees,
	ScreenDashboardBranchDetailEmployeeAdd,
	BranchService
} from "../../../../refs";

class ScreenDashboardBranchDetail extends Component {
	state = {
		fetchDataDetailStatus: false,
		tabActive: "INFO",
		goBack: false,
		isShowAddEmployee: false
	};

	changeSubMenu(menu) {
		return this.setState({ tabActive: menu });
	}

	componentDidMount() {
		const { _id } = this.props.match.params;
		const branch = this.props.branch.find(v => v._id === _id);
		if (branch && branch.detail)
			return this.setState({ fetchDataDetailStatus: true });
		BranchService.setDetail(_id)
			.then(() => this.setState({ fetchDataDetailStatus: true }));
	}

	render() {
		const { tabActive, fetchDataDetailStatus, goBack, isShowAddEmployee } = this.state;
		const { _id } = this.props.match.params;
		const { fetchDataStatus } = this.props;

		// Waiting for fetch data store
		if (!fetchDataStatus.branch) {
			return (
				<ScreenDashboardWraper>
					<CpnFetchingData />
				</ScreenDashboardWraper>
			);
		}

		// Find branch in branchs store
		const branch = this.props.branch.find(v => v._id === _id);
		if (!branch) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

		// Redirect to branch table
		if (goBack) return <Redirect to="/branch" />;

		if (isShowAddEmployee) return <ScreenDashboardBranchDetailEmployeeAdd branch={branch} goBack={() => this.setState({ isShowAddEmployee: false })} />

		return (
			<ScreenDashboardWraper>
				<TitleApp sub={`Chi nhánh ${branch.name}`} />

				<div className="container-fluid cpn-head">
					<div className="row">
						<div className="col-sm-6">
							<div className="cpn-title">
								<CpnSvg name="BRANCH" />
								{branch.name}
							</div>
						</div>
						<div className="col-sm-6">
							<div className="cpn-tools-list">
								<button onClick={() => this.setState({ isShowAddEmployee: true })} className="btn blue">
									<CpnSvg name="CREATE" />
									Thêm nhân viên
               					</button>
								<button className="btn grey" onClick={() => this.setState({ goBack: true })}>
									<CpnSvg name="BACK" />
									Trở lại
               					</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<ul className="cpn-sub-menu">
								<li onClick={() => this.changeSubMenu("INFO")} className={tabActive === "INFO" ? "active" : null} >
									<CpnSvg name="INFO" />
									Thông tin chung
                				</li>

								<li onClick={() => this.changeSubMenu("EMPLOYEES")} className={tabActive === "EMPLOYEES" ? "active" : null} >
									<CpnSvg name="EMPLOYEE" />
									Nhân sự {branch.detail && branch.detail.employees ? `(${branch.detail.employees.length})` : null}
								</li>

								<li onClick={() => this.changeSubMenu("CLIENT")} className={tabActive === "CLIENT" ? "active" : null} >
									<CpnSvg name="CLIENT" />
									Khách hàng {branch.detail && branch.detail.clients ? `(${branch.detail.clients.length})` : null}
								</li>
							</ul>
						</div>

						{tabActive === "INFO" ? <ScreenDashboardBranchDetailUpdate item={branch} /> : null}
						{tabActive === "EMPLOYEES" ? (
							<ScreenDashboardBranchDetailEmployees
								loaded={fetchDataDetailStatus}
								_id={branch._id}
							/>
						) : null}
					</div>
				</div>
			</ScreenDashboardWraper>
		);
	}
}

const mapStateToProps = state => {
	return {
		branch: state.branch,
		fetchDataStatus: state.fetchDataStatus
	};
};
export default connect(mapStateToProps)(ScreenDashboardBranchDetail);
