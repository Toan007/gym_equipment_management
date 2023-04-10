export const addSupplier = (suppliers, supplierToAdd) => {
    return [...suppliers, supplierToAdd];
};

export const updateSupplier = (suppliers, index, supplierUpdate) => {
    suppliers[index] = {...supplierUpdate}
    return [...suppliers]
}

export const deleteSupplier = (suppliers, id) => {
    return [...suppliers.filter(supp => supp.id != id)]
}