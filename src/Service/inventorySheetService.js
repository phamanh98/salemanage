import api from "./api";

const getAllInventorySheet = () => api.get(api.url.inventorySheet).then((res) => res.data);
const getIdInventorySheet = (id) =>
  api.get(`${api.url.inventorySheet}/${id}`).then((res) => res.data);
const updateInventorySheet = (id, data) =>
  api.put(`${api.url.inventorySheet}/${id}`, data).then((res) => res.data);
const createInventorySheet = (data) =>
  api.post(api.url.inventorySheet, data).then((res) => res.data);
const deleteInventorySheet = (id) =>
  api.delete(`${api.url.inventorySheet}/${id}`).then((res) => res.data);
const inventorySheetService = {
    getAllInventorySheet,
    getIdInventorySheet  ,
    updateInventorySheet,
    createInventorySheet,
    deleteInventorySheet,
};

export default inventorySheetService;
