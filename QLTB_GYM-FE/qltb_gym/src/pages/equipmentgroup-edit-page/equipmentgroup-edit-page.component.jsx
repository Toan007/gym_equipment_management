import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { updateEquipGroup } from '../../api/EquipmentGroupApi';

const EquipmentGroupEdit = ({ eG, history }) => {
    const [equipGroupName, setEquipGroupName] = useState("")

    const [updateEquimentGroup, setUpdateEquimentGroup] = useState([])

    console.log("window",window.location.pathname)

    const path = window.location.pathname.split("/")

    console.log()
    const id = Number(path[path.length-1])

    console.log("equipmentGid", id)

    const handleSubmit = async () => {
        try {
            const respone = await updateEquipGroup( id,equipGroupName)
            setUpdateEquimentGroup(respone)

            history.push('/equipment_group')
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="page">
            <Form className="input-form">
                <div className="col-l-9 offset-md-1">

                    <Form.Group controlId="equipGroupName">
                        <Form.Label>Tên loại thiết bị</Form.Label>
                        <Form.Control
                            name="equipGroupName"
                            value={equipGroupName}
                            onChange={event => setEquipGroupName(event.target.value)}
                        />
                    </Form.Group>
                    <Button
                        onClick={() => handleSubmit()}
                        variant="primary" type="button">Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    // equipGroup: selectSupplier(ownProps.match.params.equipGroupId)(state),
    // user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    // updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EquipmentGroupEdit));