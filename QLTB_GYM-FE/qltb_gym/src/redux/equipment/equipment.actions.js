import EquipmentActionTypes from './equipment.types';

export const fetchEquips = equips => ({
    type: EquipmentActionTypes.FETCH_EQUIPS,
    payload: equips
})

export const addEquip = equip => ({
    type: EquipmentActionTypes.ADD_EQUIP,
    payload: equip
})

export const deleteEquip = id => ({
    type: EquipmentActionTypes.DELETE_EQUIP,
    payload: id
})