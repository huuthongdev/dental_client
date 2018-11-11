import React, { Component, Fragment } from 'react';
import { Svg } from '../refs';

class ConfirmRemove extends Component {
    state = {
        nameRelatedCheck: false,
        loading: false
    }

    shouldEnableSubmit() {
        let { nameRelated } = this.refs;
        nameRelated = nameRelated.value;
        if (nameRelated === this.props.nameRelated) return this.setState({ nameRelatedCheck: true });
        return this.setState({ nameRelatedCheck: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const { onNext } = this.props;
        const { nameRelatedCheck } = this.state;
        if (nameRelatedCheck) {
            onNext();
        };
    }

    onCancel(e) {
        e.preventDefault();
        return this.props.onCancel();
    }

    render() {
        const { objectType, content, nameRelated } = this.props;
        const { nameRelatedCheck, loading } = this.state;
        return (
            <Fragment>
                <div className="confirm-wraper">
                    <div className="filter"></div>

                        <div className="confirm-box">
                            <div className="head">
                                <div className="container-fluid">
                                    <div className="row align-items-center">
                                        <div className="col-sm-6">
                                            Xoá {objectType}
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <button onClick={(e) => this.onCancel(e)} type="" className="cpn-form-close">
                                                <Svg name="CLOSE_FORM" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={e => this.handleSubmit(e)} onChange={() => this.shouldEnableSubmit()}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p> {content} <br /> <br />
                                                Nhập tên {objectType} <span className="name-related-confirm">{nameRelated}</span> để xác nhận bạn xoá vĩnh viễn {objectType} này:
                                    </p>

                                            <div className="form-group">
                                                <input ref="nameRelated" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="confirm-submit-box">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {loading ? <button type="submit" className="btn blue"> <div className="loading-icon"></div> </button> :
                                                    <Fragment>
                                                        <button disabled={!nameRelatedCheck} type="submit" className="btn warning"> Xác nhận </button>
                                                        <button onClick={(e) => this.onCancel(e)} className="btn outline-grey"> Huỷ </button>
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

export default ConfirmRemove;