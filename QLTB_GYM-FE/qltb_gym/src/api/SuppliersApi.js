import axios from "axios";

const getAllSuppliers = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/suppliers/all`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const CreateSuppliers = async (name, taxId, address, accountId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/suppliers/create?accountId=${accountId}`,
      { name, taxId, address}
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const UpdateSuppliers = async (name, taxId, address, id, accountId) => {
  try {
    console.log("updateSupp");
    const response = await axios.post(
      `${process.env.REACT_APP_API}/suppliers/update/${id}/${accountId}`,
      { name, taxId, address, id, accountId }
    );
    console.log("repos", response);
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteSuppliers = async (id, accountId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/suppliers/delete/${id}/${accountId}`
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { getAllSuppliers, CreateSuppliers, UpdateSuppliers, deleteSuppliers };
