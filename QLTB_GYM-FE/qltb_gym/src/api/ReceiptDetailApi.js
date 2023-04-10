import axios from "axios";

const CreateReceiptDetail = async (
  quantity,
  itemPrice,
  name,
  unit,
  receiptDate,
  id,
  accountId,
  equipGroup
) => {
  const body = {
    quantity,
    itemPrice,
    equipment: {
      name,
      unit,
    },
    receipt: {
      receiptDate,
      supplier: {
        id,
      },
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/receiptdetail/create?accountId=${accountId}&equipGroup=${equipGroup}`,
      body
    );

    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getAllReceiptDetail = async (receiptId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/receiptdetail/all/${receiptId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { CreateReceiptDetail, getAllReceiptDetail };
