import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TitleApp, Svg, FetchingData, ProductCreate, ProductRow, ProductUpdate, ConfirmRemove, removeProduct, CpnWraper } from '../../../refs';

class Product extends Component {
    state = {
        create: false,
        detail: null,
        remove: null
    }

    handleRemove() {
        const { dispatch } = this.props;
        const loaded = () => this.returnMain();
        dispatch(removeProduct(this.state.remove._id, loaded));
    }


    onRemove(data) { this.setState({ createForm: false, branchDetail: null, remove: data }); }
    onCreate() { this.setState({ create: true, detail: null, remove: null }); }
    onDetail(data) { this.setState({ create: false, detail: data, remove: null }); }
    returnMain() { this.setState({ create: false, detail: null, remove: null }) }
    showList() {
        let { product } = this.props;
        return product.map((v, i) => <ProductRow onRemove={() => this.onRemove(v)} onDetail={() => this.onDetail(v)} item={v} key={i} />)
    }

    render() {
        const { fetchDataStatus, product } = this.props;
        const { create, detail, remove } = this.state;

        if (detail) return <ProductUpdate returnMain={() => this.returnMain()} item={detail} />
        if (create) return <ProductCreate returnMain={() => this.returnMain()} />
        return (
            <CpnWraper>
                <TitleApp sub="Sản phẩm" />

                {/* Confirm Remove */}
                {remove ? <ConfirmRemove
                    nameRelated={remove.name}
                    onCancel={() => this.returnMain()}
                    content="Xoá sản phẩm có thể ảnh hưởng đến dữ liệu của chi nhánh"
                    objectType="sản phẩm"
                    onNext={() => this.handleRemove()}
                /> : null}


                {/* START COMPONENT TITLE */}
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
                                <button onClick={() => this.onCreate()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
                {/* START SUBMENU */}
                <ul className="cpn-sub-menu">
                    <li className="active">
                        Sản phẩm ({product.length})
                    </li>
                </ul>
                {/* END SUBMENU */}

                {!fetchDataStatus.product ? <FetchingData /> : <Fragment >

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
                                        {this.showList()}
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
                    {/* END BRANCH TABLE */}
                </Fragment>}
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