import axios from "axios";

const updateReceipt = async (receiptId, receiptDate, id, accountId) => {
  const body = {
    receiptId,
    receiptDate,
    supplier: {
      id,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/receipt/update/${receiptId}/${accountId}`,
      body
    );
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteReceipt = async (id, accountId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/receipt/delete/${id}?accountId=${accountId}`
    );

    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getAllReceipt = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/receipt/all`
    );

    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getInfoReceipt = async (receiptId) => {
  try {
    const respone = await axios.get(
      `${process.env.REACT_APP_API}/receipt/info-receipt/${receiptId}`
    );

    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export { updateReceipt, deleteReceipt, getAllReceipt,getInfoReceipt };
