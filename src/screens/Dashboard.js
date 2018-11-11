import React, { Component, Fragment } from 'react';
import { effect } from '../assets/js/effect';
import { Header, Sidebar, Alert, FadeAnimate, loadData, fetchTemp } from '../refs';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        temp: null
    }

    componentDidMount() {
        effect();
        this.fetchData();
        // Fetch Temp Related
        const { dispatch } = this.props;
        this.fetchTempId = setInterval(() => {
            dispatch(fetchTemp());
        }, 60*60*1000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTempId);
    }

    fetchData() {
        const { dispatch, user, fetchDataStatus } = this.props;
        if (!fetchDataStatus.branch) {
            this.setState({ fetchStatus: false });
            loadData(dispatch, user);            
        }
    }

    render() {
        return (
            <Fragment>
                <Header temp={this.state.temp} />
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