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
        const { dispatch, user } = this.props;
        loadData(dispatch, user);
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
        user: state.user
    };
}
export default connect(mapStateToProps, null)(Dashboard);