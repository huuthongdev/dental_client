import React, { Component, Fragment } from 'react';
import { FadeAnimate, Header, Sidebar, Alert, ConfirmRemove, MainService } from '../refs';
import { connect } from 'react-redux';
import { effect } from '../assets/js/effect';

class CpnWraper extends Component {
    componentDidMount() {
        effect();
        // Init data
        MainService.initData();
        // Fetch Temp Related
        this.fetchTempId = setInterval(() => {
            MainService.setTemp();
        }, 60 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTempId);
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