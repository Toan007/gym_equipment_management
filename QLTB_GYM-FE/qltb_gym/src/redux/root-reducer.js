import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import supplierReducer from './supplier/supplier.reducer';
import userReducer from './user/user.reducer';
import equipmentGroupReducer from './equipment-group/equipment-group.reducer';
import receiptReducer from './receipt/receipt.reducer';
import equipmentReducer from './equipment/equipment.reducer';

const persistConfig = {
    key: 'root',
    storage,

};

const rootReducer = combineReducers({
    supplier: supplierReducer,
    user: userReducer,
    equipmentGroupList: equipmentGroupReducer,
    receipt: receiptReducer,
    equipment: equipmentReducer
});

export default persistReducer(persistConfig, rootReducer);