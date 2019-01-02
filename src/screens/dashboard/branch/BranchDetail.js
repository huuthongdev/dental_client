import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
	Svg,
	BranchUpdate,
	FetchingData,
	TitleApp,
	CpnWraper,
	BranchDetailEmployees,
	setBranchDetail,
	BranchAddEmployee
} from "../../../refs";

class BranchDetail extends Component {
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
		// Check Fetched Detail
		const { _id } = this.props.match.params;
		const branch = this.props.branch.filter(v => v._id === _id)[0];
		if (branch && branch.detail)
			return this.setState({ fetchDataDetailStatus: true });
		const { dispatch } = this.props;
		dispatch(setBranchDetail(_id)).then(() => {
			this.setState({ fetchDataDetailStatus: true });
		});
	}

	render() {
		const { tabActive, fetchDataDetailStatus, goBack, isShowAddEmployee } = this.state;
		const { _id } = this.props.match.params;
		const { fetchDataStatus } = this.props;

		// Waiting for fetch data store
		if (!fetchDataStatus.branch) {
			return (
				<CpnWraper>
					<FetchingData />
				</CpnWraper>
			);
		}

		// Find branch in branchs store
		const branch = this.props.branch.find(v => v._id === _id);
		if (!branch) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

		// Redirect to branch table
		if (goBack) return <Redirect to="/branch" />;

		if (isShowAddEmployee) return <BranchAddEmployee branch={branch} goBack={() => this.setState({ isShowAddEmployee: false })} />

		return (
			<CpnWraper>
				<TitleApp sub={`Chi nhánh ${branch.name}`} />

				<div className="container-fluid cpn-head">
					<div className="row">
						<div className="col-sm-6">
							<div className="cpn-title">
								<Svg name="BRANCH" />
								{branch.name}
							</div>
						</div>
						<div className="col-sm-6">
							<div className="cpn-tools-list">
								<button onClick={() => this.setState({ isShowAddEmployee: true })} className="btn blue">
									<Svg name="CREATE" />
									Thêm nhân viên
               					</button>
								<button className="btn grey" onClick={() => this.setState({ goBack: true })}>
									<Svg name="BACK" />
									Trở lại
               					</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<ul className="cpn-sub-menu">
								<li onClick={() => this.changeSubMenu("INFO")} className={tabActive === "INFO" ? "active" : null} >
									<Svg name="INFO" />
									Thông tin chung
                				</li>

								<li onClick={() => this.changeSubMenu("EMPLOYEES")} className={tabActive === "EMPLOYEES" ? "active" : null} >
									<Svg name="EMPLOYEE" />
									Nhân sự {branch.detail && branch.detail.employees ? `(${branch.detail.employees.length})` : null}
								</li>

								<li onClick={() => this.changeSubMenu("CLIENT")} className={tabActive === "CLIENT" ? "active" : null} >
									<Svg name="CLIENT" />
									Khách hàng {branch.detail && branch.detail.clients ? `(${branch.detail.clients.length})` : null}
								</li>
							</ul>
						</div>

						{tabActive === "INFO" ? <BranchUpdate item={branch} /> : null}
						{tabActive === "EMPLOYEES" ? (
							<BranchDetailEmployees
								loaded={fetchDataDetailStatus}
								_id={branch._id}
							/>
						) : null}
					</div>
				</div>
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
)(BranchDetail);
