import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logOut, Svg } from '../../refs';

class Header extends Component {

    handleLogout() {
        const { dispatch } = this.props;
        return dispatch(logOut());
    }

    render() {
        return (
            <Fragment>
                <header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-8">
                                <div id="toggle-extend-sidebar">
                                    <Svg name="TOGGLE_SIDEBAR_FULL" />
                                    <Svg name="TOGGLE_SIDEBAR_SHORTENT" />
                                </div>
                                <ul className="list-app-status">
                                    <li>
                                        <Svg name="CLOUD" />
                                        17°C
                                    </li>
                                    <li>
                                        <Svg name="TIME" />
                                        <span id="clock-hours">--</span>:<span id="clock-minutes">--</span>
                                    </li>
                                    <li>
                                        <Svg name="DATE" />
                                        <span id="clock-day" /> - <span id="clock-date">--</span>.<span id="clock-month">--</span>.<span id="clock-year">--</span>
                                    </li>
                                    <li id="button-change-current-branch">
                                        <Svg name="BRANCH" />
                                        <select>
                                            <option value={1}>CN Gò Vấp</option>
                                            <option value={1}>CN Tân Bình</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-4 text-right">
                                <ul className="header-list-tools">
                                    <li id="toggle-show-notifications">
                                        <Svg name="NOTIFICATION" />
                                        <span id="total-notifications">
                                            19
                                        </span>
                                    </li>
                                    <li onClick={() => this.handleLogout()}>
                                        <Svg name="LOG_OUT" />
                                    </li>
                                    <li>
                                        <Svg name="FULL_SCREEN" />
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
        main: state.main
    };
}
export default connect(mapStateToProps, null)(Header);