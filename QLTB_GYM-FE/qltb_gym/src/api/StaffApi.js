import axios from "axios";

const getAllStaff = async (accountId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/staff/profile?accountId=${accountId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateStaff = async (
  staffId,
  cmnd,
  firstName,
  lastName,
  date,
) => {
  try {
    const avatar = null;
    const response = await axios.post(
      `${process.env.REACT_APP_API}/staff/update/${staffId}`,
      { staffId, cmnd, firstName, lastName, date, avatar }
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { getAllStaff, updateStaff };
