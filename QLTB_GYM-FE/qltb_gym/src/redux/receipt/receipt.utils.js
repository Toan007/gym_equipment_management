export const fetchReceipt = (receipts) => {
    return receipts.map(rcp => ({ ...rcp, date: rcp.date }))
}

export const deleteReceipt = (receipts, id) => {
    return [...receipts.filter(rcp => rcp.receiptId != id)]
}