import ReceiptActionTypes from './receipt.types';

export const addReceipt = (receipt) => ({
    type: ReceiptActionTypes.ADD_RECEIPT,
    payload: receipt
})

export const fetchReceipt = receipts => ({
    type: ReceiptActionTypes.FETCH_RECEIPT,
    payload: receipts
})

export const deleteReceipt = id => ({
    type: ReceiptActionTypes.DELETE_RECEIPT,
    payload: id
})