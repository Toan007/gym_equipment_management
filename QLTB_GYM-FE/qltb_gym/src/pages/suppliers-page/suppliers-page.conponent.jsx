import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-bootstrap';

import { selectSupplierList } from '../../redux/supplier/supplier.selectors';


import SupplierForm from '../../components/supplier-form/supplier-form.componert';
import SupplierTable from '../../components/supplier-table/supplier-table.component';
import { fetchSuppliers } from '../../redux/supplier/supplier.actions';
import { getAllSuppliers } from '../../api/SuppliersApi';
import './suppliers-page.styles.scss';

const SupplierPage = ({ supplierList }) => {
    const [visible, setVisible] = useState(false);
    const [loadData, setLoadData] = useState(1);
    const [suppliers, setSuppliers] = useState([]);

    const onVisible = () => {
        setVisible(!visible)
    }
    useEffect(() => {
        const fetchData = async () => {
            const suppliers = await getAllSuppliers()
            setSuppliers(suppliers)
            console.log("fetch suppliers ",suppliers)
        }
        fetchData()
    }, [loadData])

    return (
        <div className="suppliers-container page">
            <h1>Nhà cung cấp</h1>
            <Button id="suppliers-btn" onClick={() => onVisible()}>Thêm</Button>
            <SupplierTable suppliers={suppliers} setSuppliers={setSuppliers}/>
            <SupplierForm visible={visible} onVisible={onVisible} setLoadData={setLoadData}/>
        </div>
    )
};

const mapStateToProps = ({ supplier }) => ({
    supplierList: supplier.suppliers
})



export default connect(mapStateToProps)(SupplierPage);