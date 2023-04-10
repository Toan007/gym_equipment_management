import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import ReceiptTable from '../../components/receipt-table/receipt-table.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { fetchReceipt } from '../../redux/receipt/receipt.actions';

import './receipt-page.styles.scss';
import { getAllReceipt } from '../../api/ReceiptApi';

const ReceiptPage = ({ history, match, receipts, fetchReceipts }) => {

    useEffect(async () => {
        try {
            const receipt = await getAllReceipt()
            fetchReceipts(receipt)
        } catch (error) {
            alert(error);
        }
    }, [])
    return (
        <div className="device-container page">
            <h1>Hóa đơn</h1>
            <Button id="device-btn" onClick={() => history.push(`${match.url}/adddevice`)}>Thêm</Button>
            <ReceiptTable receipts={receipts}/>
        </div>
    )
}

const mapStateToProps = ({receipt}) => ({
    receipts: receipt.receipts
})

const mapDispatchToProps = dispatch => ({
    fetchReceipts: receipts => dispatch(fetchReceipt(receipts))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptPage);