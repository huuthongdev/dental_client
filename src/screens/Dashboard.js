import React, { Component, Fragment } from 'react';
import { effect } from '../assets/js/effect';
import { Header, Sidebar } from '../refs';
import { connect } from 'react-redux';
import { setBranch } from '../actions/branch.actions';

class Dashboard extends Component {

    componentDidMount() {
        effect();
        this.fetchData();
    }

    fetchData() {
        const { dispatch } = this.props;
        const { user } = this.props;
        if (user._id) {
            dispatch(setBranch());
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Sidebar />
                <div className="components-wraper">
                    {this.props.children}
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
export default connect(mapStateToProps, null)(Dashboard);