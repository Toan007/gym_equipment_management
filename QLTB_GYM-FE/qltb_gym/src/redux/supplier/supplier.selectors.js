import { createSelector } from 'reselect';

const selectSuppliers = state => state.supplier;

export const selectSupplierList = createSelector(
   [selectSuppliers],
   supplier => supplier.suppliers
)

export const selectSupplier = suppId =>
   createSelector(
      [selectSuppliers],
      suppliers => {
         const supp = suppliers.suppliers.find(supp => supp.id == suppId)
         return {
            supplier: suppliers.suppliers.find(supp => supp.id == suppId),
            index: suppliers.suppliers.indexOf(supp)
         }
      }
   )