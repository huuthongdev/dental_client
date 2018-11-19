import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { TitleApp, Svg, FetchingData, ProductRow, CpnWraper } from '../../../refs';

class Product extends Component {
    state = { create: false };

    render() {
        const { create } = this.state;
        const { fetchDataStatus, product } = this.props;

        // Show Create Form
        if (create) return <Redirect to="/product/create" />;

        return (
            <CpnWraper>
                <TitleApp sub="Sản phẩm" />

                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="PRODUCT" />
                                Quản lí sản phẩm
                             </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.setState({ create: true })} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="cpn-sub-menu">
                    <li className="active">
                        Sản phẩm ({product.length})
                    </li>
                </ul>

                {!fetchDataStatus.product ? <FetchingData /> : null}
                {fetchDataStatus.product ? <Fragment >

                    {/* START TABLE TOOLS */}
                    <div className="cpn-table-tools">
                        <div className="tool-search">
                            <input type="text" placeholder="Tìm kiếm" />
                            <Svg name="SEARCH" />
                        </div>
                        <div className="tool-select">
                            <select>
                                <option value={1}>Tất cả</option>
                                <option value={1}>A - Z</option>
                                <option value={1}>Z - A</option>
                            </select>
                        </div>
                        <div className="tool-reset">
                            Reset
                </div>
                    </div>
                    {/* END TABLE TOOLS */}
                    {/* START BRANCH TABLE */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="sid">ID</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá nhập</th>
                                            <th>Giá đề xuất</th>
                                            <th>Giá chi nhánh</th>
                                            <th>Đơn vị</th>
                                            <th>Kho tổng</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map((v, i) => <ProductRow onRemove={() => this.onRemove(v)} onDetail={() => this.onDetail(v)} item={v} key={i} />)}
                                    </tbody>
                                </table>

                                <div className="paging">
                                    <ul>
                                        <li className="active">1</li>
                                        <li>2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment> : null}
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Product);