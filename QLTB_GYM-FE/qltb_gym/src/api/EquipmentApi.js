import axios from "axios";

const getAllEquipment = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/equipment/all`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteEquipment = async (equipmentId, accountId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/equipment/delete/${equipmentId}/${accountId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateEquipment = async (
  equipId,
  name,
  state_equipment,
  description,
  accountId
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/equipment/update/${equipId}/${accountId}`,
      {
        name,
        description,
        state_equipment,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getEquipment = async (equipId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/equipment/getequipment?equipId=${equipId}`
    );

    return res.data;

  } catch (error) {
    console.log(error);
  }
};

export { getAllEquipment, deleteEquipment, updateEquipment, getEquipment };
