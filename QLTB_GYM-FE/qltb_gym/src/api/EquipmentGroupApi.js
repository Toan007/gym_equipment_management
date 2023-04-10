import axios from "axios";

const CreateEquipmentGroup = async (equipGroupName) => {
  try {
    console.log("equipGroupName",equipGroupName)
    const response = await axios.post(
      `${process.env.REACT_APP_API}/equipmentgroup/add?equipGroupName=${equipGroupName}`,
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getAllEquipGroup = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/equipmentgroup/all`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteEquipGroup = async (equipGroupId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/equipmentgroup/delete/${equipGroupId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateEquipGroup = async (equipGroupId, equipGroupName) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/equipmentgroup/update/${equipGroupId}?equipGroupName=${equipGroupName}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { CreateEquipmentGroup, getAllEquipGroup, deleteEquipGroup, updateEquipGroup };
