import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

import { selectSupplier } from '../../redux/supplier/supplier.selectors';
import { UpdateSuppliers } from '../../api/SuppliersApi'; 
import { updateSupplier } from '../../redux/supplier/supplier.actions';
const SupplierEdit = ({ supplier, updateSupplier, history, user }) => {
    console.log( "suppliersjj",supplier)
    const [supp, setSupplier] = useState({
        name: supplier.supplier.name,
        address: supplier.supplier.address,
        taxId: supplier.supplier.taxId,
        id: supplier.supplier.id
    })

    console.log('supp',supp)
    const id = supplier.supplier.id
    const handleChange = event => {
        const { value, name } = event.target
        setSupplier({ ...supp, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"))
            console.log(supp.name," ", supp.taxId," ", supp.address," ", id," ", currentUser.id)
            const respone = await UpdateSuppliers(supp.name, supp.taxId, supp.address, id, currentUser.id)
                updateSupplier(supplier.index, supp)
                history.push('/suppliers')
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="page">
            <Form className="input-form">
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="tax_id">
                        <Form.Label>Mã thuế</Form.Label>
                        <Form.Control
                            name="taxId"
                            value={supp.taxId}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Tên nhà cung cấp</Form.Label>
                        <Form.Control
                            name="name"
                            value={supp.name}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Địa chỉ nhà cung cấp</Form.Label>
                        <Form.Control
                            name="address"
                            value={supp.address}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Button
                        onClick={() => handleSubmit()} 
                        variant="primary" type="button">Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    supplier: selectSupplier(ownProps.match.params.suppId)(state),
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SupplierEdit));