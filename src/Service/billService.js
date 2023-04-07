import api from "./api";

const getAllBill = () => api.get(api.url.bill).then((res) => res.data);
const getIdBill = (id) =>
  api.get(`${api.url.bill}/${id}`).then((res) => res.data);
const updateBill = (id, data) =>
  api.put(`${api.url.bill}/${id}`, data).then((res) => res.data);
const createBill = (data) =>
  api.post(api.url.bill, data).then((res) => res.data);
const deleteBill = (id) =>
  api.delete(`${api.url.bill}/${id}`).then((res) => res.data);
const billService = {
    getAllBill,
    getIdBill ,
    updateBill,
    createBill,
    deleteBill,
};

export default billService;
