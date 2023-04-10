import EquipmentGroupActionTypes from './equipment-group.types';

export const addEquipmentGroup = (eG) => ({
    type: EquipmentGroupActionTypes.ADD_EQUIPMENT_GROUP,
    payload: eG
});

export const fetchEquipmentGroup = eG => ({
    type: EquipmentGroupActionTypes.FETCH_EQUIPMENT_GROUP,
    payload: eG
})

export const cleanEquipmentGroup = () => ({
    type: EquipmentGroupActionTypes.CLEAN_EQUIPMENT_GROUP
})

export const deleteEquipmentGroup = id => ({
    type: EquipmentGroupActionTypes.DELETE_EQUIPMENT_GROUP,
    payload: id
})