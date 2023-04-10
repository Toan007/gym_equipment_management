import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import DeviceTable from '../../components/device-table/device-table.component';
import ReceiptForm from '../../components/receipt-form/receipt-form.component';

import { addEquipmentGroup, cleanEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';
import { addReceipt } from '../../redux/receipt/receipt.actions';
import { addEquip } from '../../redux/equipment/equipment.actions';

import './add-device-page.styles.scss';
import { CreateReceiptDetail } from '../../api/ReceiptDetailApi';

const AddDevicePage = ({ suppliers, eGList, addEG, cleanEG, addRcp, history, staffId, addEquip }) => {
    const { register, handleSubmit, errors } = useForm();
    const [visible, setVisible] = useState(false);
    const [supp, setSupp] = useState(suppliers[0].id);
    const [dataReceipt, SetDataReceipt] = useState({});
    const[unitTemp, setUnitTemp] = useState();
    // console.log("supplierssss",suppliers)


    const onVisible = () => {
        setVisible(!visible)
    }
    const onSubmit = async (data) => {

        console.log("data1234", data)
        console.log(" addeGaaa",dataReceipt)
        console.log(" unitTemp",unitTemp)
        const total = eGList.reduce((acc, currItem) => (acc + (currItem.quantity * currItem.price)), 0)
        const supplier = suppliers.find(x => x.id == supp)
        // console.log("ssssssss",supplier)
        console.log("equipmentGroup",data.equipGroup)
        try {

            const res = await CreateReceiptDetail(dataReceipt.quantity, dataReceipt.price, dataReceipt.name, unitTemp, data.date, supplier.id,staffId, dataReceipt.equipGroup)
            history.push('/receipt')
        } catch (error) {
            alert("Thất bại,trùng mã hóa đơn!")
        }
    };
    useEffect(() => {
        return () => cleanEG()
    }, [])

    return (
        <div className="container-add-page page">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div id="headerr">
                    <div className="i-p">
                        <Form.Group controlId="supplier">
                            <Form.Label>Nhà cung cấp</Form.Label>
                            <Form.Control
                                as="select"
                                name="supplier"
                                value={supp}
                                onChange={event => setSupp(event.target.value)}
                                ref={register()}>
                                {suppliers.map(supplier =>
                                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Ngày nhập</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                autoComplete="off"
                                ref={register({
                                    required: 'Date is required.',
                                })}
                                className={`${errors.date ? 'input-error' : ''}`}
                            />
                        </Form.Group>
                        <Form.Group controlId="rcp_code">
                            <Form.Label>Mã phiếu</Form.Label>
                            <Form.Control
                                type="number"
                                name="rcp_code"
                                placeholder="Mã phiếu"
                                autoComplete="false"
                                ref={register({
                                    required: 'Không hợp lệ.',
                                    min: 0
                                })}
                                className={`${errors.rcp_code ? 'input-error' : ''}`}
                            />
                            {errors.rcp_code && (
                                <p className="errorMsg">{errors.rcp_code.message}</p>
                            )}
                        </Form.Group>
                    </div>
                    <Button id="add-btn" type="button" onClick={() => onVisible()}>Thêm từ danh mục</Button>
                </div>
                <DeviceTable devices={eGList} />
                <Button id="save-btn" type="submit">Lưu</Button>
            </Form>
            <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} SetDataReceipt={SetDataReceipt} setUnitTemp= {setUnitTemp} />
        </div>
    )
}

const mapStateToProps = ({ user, supplier, equipmentGroupList }) => ({
    suppliers: supplier.suppliers,
    eGList: equipmentGroupList.eGList,
    staffId: user.currentUser.id
});

const mapDispatchToProps = dispatch => ({
    addEG: (eG) => dispatch(addEquipmentGroup(eG)),
    addRcp: (rcp) => dispatch(addReceipt(rcp)),
    cleanEG: () => dispatch(cleanEquipmentGroup()),
    addEquip: (equip) => dispatch(addEquip(equip))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevicePage);