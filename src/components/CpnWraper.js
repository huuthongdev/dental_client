import React, { Component, Fragment } from 'react';
import { FadeAnimate, Header, Sidebar, Alert, loadData, fetchTemp, ConfirmRemove } from '../refs';
import { connect } from 'react-redux';
import { effect } from '../assets/js/effect';

class CpnWraper extends Component {
    componentDidMount() {
        effect();
        this.fetchData();
        // Fetch Temp Related
        const { dispatch } = this.props;
        this.fetchTempId = setInterval(() => {
            dispatch(fetchTemp());
        }, 60 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTempId);
    }

    fetchData() {
        const { dispatch, user, fetchDataStatus } = this.props;
        if (!fetchDataStatus.branch) {
            loadData(dispatch, user);
        }
    }

    render() {
        const { confirmRemove } = this.props;

        return (
            <Fragment>
                <Header />
                <Sidebar />
                <Alert />

                {confirmRemove.objectType ? <ConfirmRemove
                    nameRelated={confirmRemove.nameRelated}
                    content={confirmRemove.content}
                    objectType={confirmRemove.objectType}
                    onNext={() => confirmRemove.onNext()}
                /> : null}

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
        fetchDataStatus: state.fetchDataStatus,
        user: state.user,
        confirmRemove: state.confirmRemove
    };
}
export default connect(mapStateToProps, null)(CpnWraper);