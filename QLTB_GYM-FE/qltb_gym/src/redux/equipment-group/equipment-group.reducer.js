import EquipmentGroupActionTypes from './equipment-group.types';
import { deleteEG } from './equipment-group.utils';
const INTIAL_STATE = {
    eGList: []
}

const equipmentGroupReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EquipmentGroupActionTypes.ADD_EQUIPMENT_GROUP:
            return {
                ...state,
                eGList: [...state.eGList, action.payload]
            }
        case EquipmentGroupActionTypes.CLEAN_EQUIPMENT_GROUP:
            return {
                ...state,
                eGList: []
            }
        case EquipmentGroupActionTypes.DELETE_EQUIPMENT_GROUP:
            return {
                ...state,
                eGList: deleteEG(state.eGList ,action.payload)
            }
        case EquipmentGroupActionTypes.FETCH_EQUIPMENT_GROUP:
            console.log("acction pay",action.payload)
            return {
                ...state,
                eGList: [...action.payload]
            }
        default:
            return state;
    }
}

export default equipmentGroupReducer;