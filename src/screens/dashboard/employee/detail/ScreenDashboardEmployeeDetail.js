import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
	ScreenDashboardEmployeeDetailUpdate,
	CpnSvg,
	TitleApp,
	ScreenDashboardWraper,
	CpnFetchingData,
	EmployeeService,
} from "../../../../refs";

class ScreenDashboardEmployeeDetail extends Component {
	state = {
		fetching: true, 
		employee: null,
		goBack: false,
		subMenuActive: "INFO"
	};

	changeSubMenu(menu) {
		return this.setState({ subMenuActive: menu });
	}

	componentDidMount() {
		const { _id } = this.props.match.params;
		const { employeeDetail } = this.props;
		const checkExisted = employeeDetail.find(v => v._id === _id);
		if (checkExisted) return this.setState({ fetching: false, employee: checkExisted });
		EmployeeService.setDetail(_id)
			.then(employee => this.setState({ fetching: false, employee }))
	}

	render() {
		const { subMenuActive, goBack, employee, fetching } = this.state;

		if (fetching) {
			return (
				<ScreenDashboardWraper>
					<CpnFetchingData />
				</ScreenDashboardWraper>
			);
		}

		// Find employee in branchs store
		if (!fetching && !employee) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

		// Redirect to employee table
		if (goBack) return <Redirect to="/employee" />;

		return (
			<ScreenDashboardWraper>
				<TitleApp sub={`Nhân sự ${employee.name}`} />

				<div className="container-fluid cpn-head">
					<div className="row">
						<div className="col-sm-6">
							<div className="cpn-title">
								<CpnSvg name="EMPLOYEE" />
								{employee.name}
							</div>
						</div>
						<div className="col-sm-6">
							<div className="cpn-tools-list">
								<button className="btn grey" onClick={() => this.setState({ goBack: true })} >
									<CpnSvg name="BACK" />
									Trở lại
                </button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<ul className="cpn-sub-menu">
								<li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null}>
									<CpnSvg name="INFO" /> Thông tin chung
                </li>
								<li onClick={() => this.changeSubMenu("PASSWORD")} className={subMenuActive === "PASSWORD" ? "active" : null}>
									<CpnSvg name="PASSWORD" /> Vai trò
                </li>
							</ul>
						</div>

						{subMenuActive === "INFO" ? (
							<ScreenDashboardEmployeeDetailUpdate item={employee} />
						) : null}
					</div>
				</div>
			</ScreenDashboardWraper>
		);
	}
}

const mapStateToProps = state => {
	return {
		employeeDetail: state.employeeDetail
	};
};
export default connect(mapStateToProps)(ScreenDashboardEmployeeDetail);
