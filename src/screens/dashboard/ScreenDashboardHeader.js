import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CpnSvg, MainService, UserService } from '../../refs';

class ScreenDashboardHeader extends Component {
    handleLogout() {
        UserService.logOut();        
    }

    showListBranch() {
        const { user } = this.props;
        const currentBranch = localStorage.getItem("BRANCH");
        if (!user) return;
        if (user.roleInBranchs.length === 1) return <span>{user.roleInBranchs[0].branch.isMaster ? 'Trụ sở' : user.roleInBranchs[0].branch.name}</span>;
        return (
            <select defaultValue={currentBranch} onChange={(e) => this.changeCurrentBranch(e)}>
                {user.roleInBranchs.map((v, i) => <Fragment key={i}>
                    <option value={v.branch._id}>{v.branch.name}</option>
                </Fragment>)}
            </select>
        );
    }

    changeCurrentBranch(e) {
        e.preventDefault();
        localStorage.setItem("BRANCH", e.target.value);
        return MainService.initData();
    }

    render() {

        return (
            <Fragment>
                <header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-8">
                                <div id="toggle-extend-sidebar">
                                    <CpnSvg name="TOGGLE_SIDEBAR_SHORTENT" />
                                    <CpnSvg name="TOGGLE_SIDEBAR_FULL" />
                                </div>
                                <ul className="list-app-status">
                                    <li>
                                        <CpnSvg name="CLOUD" />
                                        {this.props.main.temp ? this.props.main.temp : '--'}°C
                                    </li>
                                    <li>
                                        <CpnSvg name="TIME" />
                                        <span id="clock-hours">--</span>:<span id="clock-minutes">--</span>
                                    </li>
                                    <li>
                                        <CpnSvg name="DATE" />
                                        <span id="clock-day" /> - <span id="clock-date">--</span>.<span id="clock-month">--</span>.<span id="clock-year">--</span>
                                    </li>
                                    <li id="button-change-current-branch">
                                        <CpnSvg name="BRANCH" />
                                        {this.showListBranch()}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-4 text-right">
                                <ul className="header-list-tools">
                                    <li id="toggle-show-notifications">
                                        <CpnSvg name="NOTIFICATION" />
                                        <span id="total-notifications">
                                            9
                                        </span>
                                    </li>
                                    <li onClick={() => this.handleLogout()}>
                                        <CpnSvg name="LOG_OUT" />
                                    </li>
                                    <li>
                                        <CpnSvg name="FULL_SCREEN" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        main: state.main
    };
}
export default connect(mapStateToProps)(ScreenDashboardHeader);