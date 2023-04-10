import { createSelector } from 'reselect';

const selectReceipts = state => state.receipt;

export const selectReceipt = rcpId =>
    createSelector(
        [selectReceipts],
        receipt => {
            const rcp = receipt.receipts.find(x => x.id == rcpId)
            return {
                receipt: receipt.receipts.find(rcp => rcp.id == rcpId),
                index: receipt.receipts.indexOf(rcp)
            }
        }
    )