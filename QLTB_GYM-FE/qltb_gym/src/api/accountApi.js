import axios from "axios";

const CreateAccount = async (
  username,
  roleId,
  birthDate,
  firstName,
  lastName,
  idCode
) => {
  try {
    const body = {
      account: {
        username,
        roleId,
      },
      staff: {
        birthDate,
        firstName,
        lastName,
        idCode,
      },
    };
    console.log('body',body)
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/add`,
      body
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const LoginApi = async (username, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/login`,
      {
        username,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const ChangePwd = async (accountId, oldPass, newPass) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/changePassword?accountId=${accountId}&oldPass=${oldPass}&newPass=${newPass}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const ResetPass = async (accountIdReset, accountId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/resetPass/${accountIdReset}/${accountId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setStateActive = async (isActive, accountId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/setStatus/${isActive}/${accountId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getAllAccount = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/account/all`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const changeRole = async (roleId,accountId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/account/changeRole?accountId=${accountId}&roleId=${roleId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getUser = async (username) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/account/getAccount/${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export {
  CreateAccount,
  LoginApi,
  ChangePwd,
  ResetPass,
  setStateActive,
  getAllAccount,
  changeRole,
  getUser,
};
