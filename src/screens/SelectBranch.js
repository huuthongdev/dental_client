import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Background, Logo } from '../refs';

class SelectBranch extends Component {
    state = {
        done: false
    }

    handleSelectBranch(e, branchId) {
        e.preventDefault();
        localStorage.setItem("BRANCH", branchId);
        this.setState({ done: true });
    }

    showListBranch() {
        const { roleInBranchs } = this.props.user;
        return roleInBranchs.map((v, i) => <button onClick={(e) => this.handleSelectBranch(e, v.branch._id)} key={i} className="btn white w-100 mb-1">
            {v.branch.isMaster ? 'Trụ sở' : v.branch.name}
        </button>)
    }

    render() {
        const { user } = this.props;
        const token = localStorage.getItem("TOKEN");
        const currentBranch = localStorage.getItem("BRANCH");
        if (token && user._id && currentBranch) return <Redirect to="/" />
        if (!token) return <Redirect to="/login" />
        if (token && !user._id) return <Redirect to="/authentication" />

        return (
            <Fragment>
                <div id="screen-select-branch">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-sm-1 height-100vh" />
                            <div className="col-sm-3">
                                <form>
                                    <div className="logo">
                                        <img src={Logo} alt="Dental Application" />
                                    </div>
                                    {this.showListBranch()}
                                </form>
                            </div>
                            <div className="col-sm-1" />
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, null)(SelectBranch);