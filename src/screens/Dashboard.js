import React, { Component, Fragment } from 'react';
import { effect } from '../assets/js/effect';
import { Header, Sidebar, Alert, FadeAnimate, loadData } from '../refs';
import { connect } from 'react-redux';

class Dashboard extends Component {

    componentDidMount() {
        effect();
        this.fetchData();
    }

    fetchData() {
        const { dispatch, user, fetchDataStatus } = this.props;
        if (!fetchDataStatus.branch) {
            this.setState({ fetchStatus: false });
            return loadData(dispatch, user);
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Sidebar />
                <Alert />
                <FadeAnimate>
                    <div className="components-wraper">
                        {this.props.children}
                    </div>
                </FadeAnimate>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Dashboard);