import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { updateSupplier } from '../../redux/supplier/supplier.actions';
import { getEquipment, updateEquipment } from '../../api/EquipmentApi';

const EquipmentEdit = ({ user, history, match }) => {
    const [equipment, setEquipment] = useState([])

    const path = window.location.pathname.split("/")

    // console.log()
    const id = Number(path[path.length-1])

    useEffect(async () => {
        const equip = await getEquipment(id)

        setEquipment(equip)
    }, [])
  
    const options = ["Hư", "Bình thường", "Đang sữa chữa"]
    const index = options.indexOf(options.find(x => x == equipment?.stateDescription))
    const [state, setState] = useState(options[index])
    useEffect(() => {
        setState(options[index])
    }, [equipment?.stateDescription])

    const handleChange = event => {
        const { value, name } = event.target
        setEquipment({ ...equipment, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const respone = await updateEquipment(id, equipment.equipmentName, state, equipment.description, user.id)

            console.log("res",respone)
            setEquipment(respone)

            history.push('/equipment')
            alert("Sửa thiết bị thành công")

        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="page">
            <Form className="input-form">
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="equipmentName">
                        <Form.Label>Tên thiết bị</Form.Label>
                        <Form.Control
                            name="equipmentName"
                            value={equipment?.equipmentName}
                            onChange={event => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>Tình trạng<span>(*)</span></Form.Label>
                        <Form.Control as="select" name="state_des" value={state} onChange={(event) => setState(event.target.value)}>
                            {options.map(opt =>
                                <option value={opt}>{opt}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            name="description"
                            as="textarea"
                            value={equipment?.description}
                            onChange={event => handleChange(event)}
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
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EquipmentEdit));