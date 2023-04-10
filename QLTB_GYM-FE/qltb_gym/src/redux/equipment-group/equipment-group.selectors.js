// import { createSelector } from 'reselect';

// const selectEquipmentGroup = state => state.equipGroup;

// export const selectSupplierList = createSelector(
//    [selectEquipmentGroup],
//    equipGroup => equipGroup.equipGroup
// )

// export const selectSupplier = suppId =>
//    createSelector(
//       [selectEquipmentGroup],
//       equipGroup => {
//          const equipGroups = equipGroup.equipGroup.find(equipGroups => equipGroups.id == suppId)
//          return {
//             equipGroup: equipGroup.equipGroup.find(equipGroups => equipGroups.id == suppId),
//             index: equipGroup.equipGroup.indexOf(equipGroups)
//          }
//       }
//    )