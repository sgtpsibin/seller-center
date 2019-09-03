import axios from "axios";

export const fetchOrderById = async (id: string) => {
  try {
    const { data } = await axios.get(
      process.env.API_ROOT_URL + `/orders/${id}.json`,
      { headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` } }
    );

    return data.order;
  } catch (e) {
    console.log(e);
  }
};

export const closeOrderById = async (id: string) => {
  try {
    await axios.post(
      process.env.API_ROOT_URL + `/orders/${id}/close.json`,
      {},
      { headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` } }
    );
  } catch (e) {
    console.log(e);
  }
};

export const openOrderById = async (id: string) => {
  try {
    await axios.post(
      process.env.API_ROOT_URL + `/orders/${id}/open.json`,
      {},
      { headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` } }
    );
  } catch (e) {
    console.log(e);
  }
};

export const cancelOrderById = async (id: string) => {
  try {
    await axios.post(
      process.env.API_ROOT_URL + `/orders/${id}/cancel.json`,
      {},
      { headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` } }
    );
  } catch (e) {
    console.log(e);
  }
};

export const updateOrderById = async (id: string, orderObject) => {
  try {
    await axios.put(
      process.env.API_ROOT_URL + `/orders/${id}.json`,
      orderObject,
      { headers: { Authorization: `Bearer ${process.env.DEV_TOKEN}` } }
    );
  } catch (e) {
    console.log(e);
  }
};
