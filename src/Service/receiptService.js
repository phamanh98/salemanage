import api from "./api";

const getAllReceipt = () => api.get(api.url.receipt).then((res) => res.data);
const getIdReceipt = (id) =>
  api.get(`${api.url.receipt}/${id}`).then((res) => res.data);
const updateReceipt = (id, data) =>
  api.put(`${api.url.receipt}/${id}`, data).then((res) => res.data);
const createReceipt = (data) =>
  api.post(api.url.receipt, data).then((res) => res.data);
const deleteReceipt = (id) =>
  api.delete(`${api.url.receipt}/${id}`).then((res) => res.data);
const receiptService = {
    getAllReceipt,
    getIdReceipt ,
    updateReceipt,
    createReceipt,
    deleteReceipt,
};

export default receiptService;
