import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { CreateSuppliers } from '../../api/SuppliersApi';

import Rodal from 'rodal/lib/rodal';
import { addEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';


import 'rodal/lib/rodal.css';
import { CreateEquipmentGroup } from '../../api/EquipmentGroupApi';

const EquipGroupForm = ({ visible, onVisible,setLoadData, addEquipmentGroup, user }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = async (data) => {
        console.log("data" ,data)
        try {
            const response = await CreateEquipmentGroup(data.name, data.id) 
            addEquipmentGroup({
                ...response
            });
            setLoadData(value=>++value)
            onVisible();
            reset();          
        } catch (error) {
            // alert("Thất bại, trùng mã thuế!");
            alert(error)
        }
    };

    return (
        <Rodal height={500} width={500} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="name">
                        <Form.Label>Tên loại thiết bị</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên loại thiết bị"
                            autoComplete="off"
                            ref={register({
                            required: 'Name is required.',
                            pattern: {
                                value: /^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                message: 'Tên loại thiet51 bị chỉ chứa các ký tự chữ và số.'
                            }
                            })}
                            className={`${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">Thêm</Button>
                </div>
            </Form>
        </Rodal>
    )
}

const mapStateToProps =({ user }) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    addEquipmentGroup: eG => dispatch(addEquipmentGroup(eG))
})

export default connect(mapStateToProps, mapDispatchToProps)(EquipGroupForm);