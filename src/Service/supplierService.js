import api from "./api";

const getAllSupplier = () => api.get(api.url.supplier).then((res) => res.data);
const getIdSupplier = (id) =>
  api.get(`${api.url.supplier}/${id}`).then((res) => res.data);
const updateSupplier = (id, data) =>
  api.put(`${api.url.supplier}/${id}`, data).then((res) => res.data);
const createSupplier = (data) =>
  api.post(api.url.supplier, data).then((res) => res.data);
const deleteSupplier = (id) =>
  api.delete(`${api.url.supplier}/${id}`).then((res) => res.data);
const supplierService = {
    getAllSupplier,
    getIdSupplier,
    updateSupplier,
    createSupplier,
    deleteSupplier,
};

export default supplierService;