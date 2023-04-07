import api from "./api";

const getAllCustomer = () => api.get(api.url.customer).then((res) => res.data);
const getIdCustomer = (id) =>
  api.get(`${api.url.customer}/${id}`).then((res) => res.data);
const updateCustomer = (id, data) =>
  api.put(`${api.url.customer}/${id}`, data).then((res) => res.data);
const createCustomer = (data) =>
  api.post(api.url.customer, data).then((res) => res.data);
const deleteCustomer = (id) =>
  api.delete(`${api.url.customer}/${id}`).then((res) => res.data);
const customerService = {
    getAllCustomer,
    getIdCustomer ,
    updateCustomer,
    createCustomer,
    deleteCustomer,
};

export default customerService;
