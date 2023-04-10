import axios from "axios";

const getAllLogEquipment = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/equipmentlog/all`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getAllLogEquipment };
