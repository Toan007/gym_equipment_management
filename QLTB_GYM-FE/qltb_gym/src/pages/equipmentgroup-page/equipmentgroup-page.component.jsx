import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import EquipGroupForm from '../../components/equipgroup-form/equipgroup-form.component';
import EquipGroupTable from '../../components/equipgroup-table/equipgroup-table.component';


import './equipgroup-page.styles.scss';
import { getAllEquipGroup } from '../../api/EquipmentGroupApi';

const EquipGroupPage = ({ eGList }) => {
    const [visible, setVisible] = useState(false);
    const [loadData, setLoadData] = useState(1);
    const [equipGroup, setEquipGroup] = useState([]);
    
    const onVisible = () => {
        setVisible(!visible)
    }
    useEffect(() => {
        const fetchData = async () => {
            const equipGroup = await getAllEquipGroup()
            console.log("fetch equipGroup ",equipGroup)
            setEquipGroup(equipGroup)
        }
        console.log("fetch equipGroup ")
        fetchData()
    }, [loadData])
    console.log("fetch equipGroup ",equipGroup)
    return (
        <div className="suppliers-container page">
            <h1>Loại thiết bị</h1>
            <Button id="suppliers-btn" onClick={() => onVisible()}>Thêm</Button>
            <EquipGroupTable equipGroup={equipGroup} setEquipGroup={setEquipGroup}/>
            <EquipGroupForm visible={visible} onVisible={onVisible} setLoadData={setLoadData}/>
        </div>
    )
};

const mapStateToProps = ({ eG }) => ({
    // eGList: eG.equipGroup
})



export default connect(mapStateToProps)(EquipGroupPage);