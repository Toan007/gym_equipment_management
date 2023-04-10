import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';


import 'rodal/lib/rodal.css';
import './receipt-form.styles.scss';
import { useEffect } from 'react';

import { getAllEquipGroup } from '../../api/EquipmentGroupApi';

const ReceiptForm = ({ visible, onVisible, addEG,SetDataReceipt,setUnitTemp }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const unitOptions = ["Cái", "Máy", "Cặp"];
    const [unit, setUnit] = useState(unitOptions[0]);
    const[equipmentGroup,setEquipmentGroup] = useState([]);
    const[valueEquipment,setValueEquipment] = useState({});
    

    useEffect( () => {
        const fectData=async()=>{
            const equipGroupp = await getAllEquipGroup()

        console.log("eG", equipGroupp)

        setEquipmentGroup(equipGroupp)
        }
        fectData();
    }, [])

    const onSubmit = async (data) => {
        SetDataReceipt(data)
        setUnitTemp(unit)

         console.log("dataaaaaa",data)

        addEG({
            name: data.name,
            unit: unit,
            quantity: data.quantity,
            price: data.price,
            equipGroup:equipmentGroup
        });
        reset();
    };

    return (
        <Rodal className="rodal" height={700} width={800} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Form.Group controlId="name">
                        <Form.Label>Thiết bị<span>(*)</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên thiết bị"
                            autoComplete="off"
                            ref={register({required: 'Name is required.'})}
                            className={`${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </Form.Group>
                   
                    <Form.Group controlId="unit">
                        <Form.Label>Đơn vị tính<span>(*)</span></Form.Label>
                        <Form.Control as="select" name="unit" value={unit} onChange={(event) => setUnit(event.target.value)}>
                            {unitOptions.map(opt => 
                                    <option value={opt}>{opt}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="equipGroup">
                        <Form.Label>Loại thiết bị<span>(*)</span></Form.Label>
                        <Form.Control as="select" name="equipGroup" value={valueEquipment.equipGroupName} onChange={(event) => setValueEquipment(event.target.value)}
                        ref={register()}>
                                {equipmentGroup?.map(equipGroup =>
                                    <option key={equipGroup.id} value={equipGroup.id}>{equipGroup.equipGroupName}</option>
                                )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label>Số lượng<span>(*)</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="Nhập số lượng"
                            autoComplete="off"
                            ref={register({required: 'Quantity is required.', min: 1})}
                            className={`${errors.quantity ? 'input-error' : ''}`}
                        />
                        {errors.quantity && (
                            <p className="errorMsg">{errors.quantity.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Đơn giá<span>(*)</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Nhập đơn giá"
                            autoComplete="off"
                            ref={register({required: 'Price is required.', min: 1})}
                            className={`${errors.price ? 'input-error' : ''}`}
                        />
                        {errors.price && (
                            <p className="errorMsg">{errors.price.message}</p>
                        )}
                    </Form.Group>
                </div>
                <div className="btn-grp">
                    <Button variant="primary" type="submit">Thêm và tiếp tục</Button>
                    {/* <Button variant="primary" type="submit">Thêm và đóng</Button> */}
                </div>
            </Form>
        </Rodal>
    )
}

export default ReceiptForm;