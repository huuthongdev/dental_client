import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Background, Logo, UserService, ScreenWraper } from '../../refs';

class ScreenSelectBranch extends Component {
    state = {
        selected: false
    }

    handleSelectBranch(e, branchId) {
        e.preventDefault();
        UserService.setCurrentBranch(branchId);
        this.setState({ selected: true });
    }

    render() {
        const checkAuth = UserService.checkAuth();

        if (checkAuth === 1) return <Redirect to={{ pathname: '/login', state: { ...this.props.location.state } }} />
        // (2) Have token in localStorage || Not authen (Authentication -> check token)
        if (checkAuth === 2) return <Redirect to={{ pathname: '/authentication', state: { ...this.props.location.state } }} />
        // (3) Authen Success, Select place working (Select Branch)
        const { roleInBranchs } = this.props.user;
        if (checkAuth === 3) return <ScreenWraper title="Chọn nơi làm việc">
            <div id="screen-select-branch">
                <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                <div className="filter" />
                <div className="body">
                    <div className="logo">
                        <img src={Logo} alt="Dental Application" />
                    </div>
                    {roleInBranchs.map((v, i) => <button type="button" onClick={(e) => this.handleSelectBranch(e, v.branch._id)} key={i} className="btn white w-100 mb-1">
                        {v.branch.isMaster ? 'Trụ sở' : v.branch.name}
                    </button>)}
                </div>
            </div>
        </ScreenWraper>
        // (4) Authen completed (Success)
        const { state } = this.props.location;
        if (checkAuth === 4) return <Redirect to={state && state.from && state.from.pathname ? state.from.pathname : '/'} />
        return <Fragment />;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(ScreenSelectBranch);