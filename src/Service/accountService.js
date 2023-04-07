import api from "./api";

const getAllAccount = () => api.get(api.url.account).then((res) => res.data);
const getIdAccount = (id) =>
  api.get(`${api.url.account}/${id}`).then((res) => res.data);
const updateAccount = (id, data) =>
  api.put(`${api.url.account}/${id}`, data).then((res) => res.data);
const createAccount = (data) =>
  api.post(api.url.account, data).then((res) => res.data);
const deleteAccount = (id) =>
  api.delete(`${api.url.account}/${id}`).then((res) => res.data);
const accountService = {
    getAllAccount,
    getIdAccount ,
    updateAccount,
    createAccount,
    deleteAccount,
};

export default accountService;
