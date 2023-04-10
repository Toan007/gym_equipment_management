import axios from "axios";

const getAllRecord = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/record/all`);

    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { getAllRecord };
