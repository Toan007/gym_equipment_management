import ReceiptActionTypes from './receipt.types';
import { fetchReceipt, deleteReceipt } from './receipt.utils';

const INITIAL_STATE = {
    receipts: []
}

const receiptReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReceiptActionTypes.ADD_RECEIPT:
            return {
                ...state,
                receipts: [...state.receipts, action.payload]
            }
        case ReceiptActionTypes.FETCH_RECEIPT:
            return {
                ...state,
                receipts: fetchReceipt(action.payload)
            }
        case ReceiptActionTypes.DELETE_RECEIPT:
            return {
                ...state, 
                receipts: deleteReceipt(state.receipts, action.payload)
            }
        default:
            return state
    }
};

export default receiptReducer;