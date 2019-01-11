import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Svg, ConfirmService } from '../refs';

class Confirm extends Component {
    state = {
        nameRelatedConfirm: '',
        loading: false
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const { onNext } = this.props.confirm;
        await onNext();
        this.setState({ loading: false });
        ConfirmService.off();
    }

    componentDidMount() {
        document.onkeyup = (e) => {
            if (this.state.loading) return;
            if (e.which === 27) return ConfirmService.off();
        }
    }

    onCancel(e) {
        e.preventDefault();
        if (this.state.loading) return;
        ConfirmService.off();
    }

    render() {
        const { objectType, content, nameRelated, method } = this.props.confirm;
        const { nameRelatedConfirm, loading } = this.state;

        if (!objectType) return <Fragment></Fragment>;
        return (
            <Fragment>
                <div className="confirm-wraper">
                    <div className="filter" onClick={(e) => this.onCancel(e)}></div>

                    <div className="confirm-box">
                        <div className="head">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    <div className="col-sm-6">
                                        {method} {objectType}
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <button onClick={(e) => this.onCancel(e)} type="" className="cpn-form-close">
                                            <Svg name="CLOSE_FORM" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={e => this.handleSubmit(e)}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p> {content} <br /> <br />
                                            Nhập tên {objectType} <span className="name-related-confirm">{nameRelated}</span> để xác nhận bạn {method.toLowerCase()} {objectType} này:
                                        </p>

                                        <div className="form-group">
                                            <input onChange={e => this.setState({ nameRelatedConfirm: e.target.value })} type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="confirm-submit-box">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {loading ? <button type="submit" className="btn warning"> <div className="loading-icon"></div> </button> :
                                                <Fragment>
                                                    <button disabled={!nameRelatedConfirm || nameRelatedConfirm !== nameRelated} type="submit" className="btn warning"> Xác nhận </button>
                                                    <button onClick={(e) => this.onCancel(e)} type="button" className="btn outline-grey"> Huỷ </button>
                                                </Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        confirm: state.confirm
    };
}
export default connect(mapStateToProps, null)(Confirm);