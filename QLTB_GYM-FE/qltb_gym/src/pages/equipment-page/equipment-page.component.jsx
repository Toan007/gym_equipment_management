import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAllEquipment } from '../../api/EquipmentApi';
import { fetchEquips } from '../../redux/equipment/equipment.actions';
 
import EquipTable from '../../components/equip-table/equip-table.component';

import "./equipment-page.styles.scss";

const EquipmentPage = ({ equipment, fetchEquip }) => {
    const [loadData, setLoadData] = useState(1)
    useEffect(async () => {
        try {
            const equipment = await getAllEquipment()
            // console.log("equipment",equipment)
            fetchEquip(equipment)
        } catch (error) {
            alert(error);
        }
    }, [loadData])
    return (
        <div className="equipment-container page">
            <h1 className="tb" >Thiết bị</h1>
            <EquipTable equips={equipment} setLoadData={setLoadData}/>
        </div>
    )
}

const mapStateToProps = ({ equipment }) => ({
    equipment: equipment.equipList
})

const mapDispatchToProps = dispatch => ({
    fetchEquip: equipments => dispatch(fetchEquips(equipments))
})

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage);