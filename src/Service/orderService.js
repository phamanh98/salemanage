import api from "./api";

const getAllOrder = () => api.get(api.url.order).then((res) => res.data);
const getIdOrder = (id) =>
  api.get(`${api.url.order}/${id}`).then((res) => res.data);
const updateOrder = (id, data) =>
  api.put(`${api.url.order}/${id}`, data).then((res) => res.data);
const createOrder = (data) =>
  api.post(api.url.order, data).then((res) => res.data);
const deleteOrder = (id) =>
  api.delete(`${api.url.order}/${id}`).then((res) => res.data);
const orderService = {
    getAllOrder,
    getIdOrder ,
    updateOrder,
    createOrder,
    deleteOrder,
};

export default orderService;
