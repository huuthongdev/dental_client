import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Service, Employee, Branch, Product, Main, Client, Header, Sidebar, Alert } from '../refs';
import { loadData, fetchTemp } from '../actions/main.actions';
import { effect } from '../assets/js/effect';

class Dashboard extends Component {
    state = { temp: null }

    componentDidMount() {
        effect();
        this.fetchData();
        // Fetch Temp Related
        const { dispatch } = this.props;
        dispatch(fetchTemp());
        this.fetchTempId = setInterval(() => {
            dispatch(fetchTemp());
        }, 60 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTempId);
    }

    fetchData() {
        const { dispatch, user } = this.props;
        loadData(dispatch, user);
    }

    render() {
        const route = this.props.match.params.route;
        return (
            <Fragment>
                <Header />
                <Sidebar />
                <Alert />
                {route === 'main' ? <Main /> : null}
                {route === 'branch' ? <Branch /> : null}
                {route === 'employee' ? <Employee /> : null}
                {route === 'service' ? <Service /> : null}
                {route === 'product' ? <Product /> : null}
                {route === 'client' ? <Client /> : null}
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