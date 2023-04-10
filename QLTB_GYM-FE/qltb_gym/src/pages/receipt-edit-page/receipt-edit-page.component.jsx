import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { selectReceipt } from '../../redux/receipt/receipt.selectors';
import { selectSupplierList } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';
import { addEquipmentGroup, cleanEquipmentGroup, fetchEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';
import { addReceipt } from '../../redux/receipt/receipt.actions';
import { addEquip } from '../../redux/equipment/equipment.actions';
import { getAllReceiptDetail } from '../../api/ReceiptDetailApi';
import ReceiptForm from '../../components/receipt-form/receipt-form.component';
import DeviceTable from '../../components/device-table/device-table.component';
import moment from 'moment';

import './receipt-edit-page.styles.scss';
import { getInfoReceipt, updateReceipt } from '../../api/ReceiptApi';

const SupplierEdit = ({ receipt, suppliers, eGList, addEG, cleanEG, history, fetchEG }) => {
    console.log("receipt",receipt)
    console.log("suppliers",suppliers)
    const [receipts, setReceipt] = useState({
        suppName: receipt?.receipt?.name,
        receiptDate: receipt?.receipt?.receiptDate,
        supplier_id: receipt?.receipt?.id,
        receiptId: receipt?.receipt?.receiptId,
        // accountId: receipt.receipt.id
    })
    console.log("receipts",receipts)

    const path = window.location.pathname.split("/")

    // console.log()
    const receiptID = Number(path[path.length-1])

    const[receiptTemp, setReceiptTemp] = useState();
    
    const [supp, setSupp] = useState()
    const [visible, setVisible] = useState(false)

    useEffect(async () => {
        try {
            const response = await getAllReceiptDetail(receipts?.id || 0)
            fetchEG(response)

            const res = await getInfoReceipt(receiptID)

      setReceiptTemp(res)
      setSupp(res.supplierID)
      setReceipt({ ...receipts, receiptDate: res.receiptDate })

    //   console.log("resssssssssss",res)

        } catch (error) {
            alert(error);
        }
    }, [])

    console.log("receiptTemp", receiptTemp)
    const onVisible = () => {
        setVisible(!visible)
    }
    const id = receipt?.receipt?.id
    const handleChange = event => {
        const { value, name } = event.target
        setReceipt({ ...receipts, [name]: value })
    }
    useEffect(() => {
        return () => cleanEG()
    }, [])
    const handleSubmit = async () => {
        //const total = eGList.reduce((acc, currItem) => (acc + (currItem.quantity * currItem.price)), 0)
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"))
            console.log("tetetet876543", receipts.receiptDate)
            const respone = await updateReceipt(receiptID, moment(receipts.receiptDate).format("YYYY-MM-DD"), supp, currentUser.id)


            console.log("tetetetete", respone)

            history.push('/receipt')
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="container-add-page page">
            <Form>
                <div className="headerr">
                    <Form.Group controlId="name">
                        <Form.Label>Tên nhà cung cấp</Form.Label>
                        <Form.Control
                            as="select"
                            name="name"
                            value={supp}
                            onChange={event => setSupp(event.target.value)}
                        >
                            
                            {suppliers.map(supplier =>
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Ngày nhập</Form.Label>
                        <Form.Control
                            type="date"
                            name="receiptDate"
                            value={moment(receiptTemp?.receiptDate).format("YYYY-MM-DD")}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="receiptId">
                        <Form.Label>Mã phiếu</Form.Label>
                        <Form.Control
                            name="receiptId"
                            value={receiptTemp?.receiptID}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    {/* <Button id="add-btn" type="button" onClick={() => onVisible()}>Thêm từ danh mục</Button> */}
                    <Button
                        onClick={() => handleSubmit()}
                        variant="primary" type="button">Lưu</Button>
                </div>
                <DeviceTable devices={eGList} />
            </Form>
            <ReceiptForm visible={visible} onVisible={onVisible} addEG={addEG} />
        </div>
    )

   
}

const mapStateToProps = (state, ownProps,user) => ({
    receipt: selectReceipt(ownProps.match.params.rcpId)(state),
    suppliers: selectSupplierList(state),
    eGList: state.equipmentGroupList.eGList,
    
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data)),
    addEG: (eG) => dispatch(addEquipmentGroup(eG)),
    addRcp: (rcp) => dispatch(addReceipt(rcp)),
    cleanEG: () => dispatch(cleanEquipmentGroup()),
    addEquip: (equip) => dispatch(addEquip(equip)),
    fetchEG: (eG) => dispatch(fetchEquipmentGroup(eG))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SupplierEdit));