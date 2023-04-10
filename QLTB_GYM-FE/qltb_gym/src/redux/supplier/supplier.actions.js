import SupplierActionTypes from './supplier.types';

export const addSupplier = (supplier) => ({
    type: SupplierActionTypes.ADD_SUPPLIER,
    payload: supplier
});

export const fetchSuppliers = (suppliers) => ({
    type: SupplierActionTypes.FETCH_SUPPLIERS,
    payload: suppliers
})

export const updateSupplier = (index, supp) => ({
    type: SupplierActionTypes.UPDATE_SUPPLIER, 
    payload: {
        index, supp
    }
})

export const deleteSupplier = (id) => ({
    type: SupplierActionTypes.DELETE_SUPPLIER,
    payload: id
})