import api from "./api";

const getAllCategories = () => api.get(api.url.category).then((res) => res.data);
const getIdCategory = (id) =>
  api.get(`${api.url.category}/${id}`).then((res) => res.data);
const updateCategory = (id, data) =>
  api.put(`${api.url.category}/${id}`, data).then((res) => res.data);
const createCategory = (data) =>
  api.post(api.url.category, data).then((res) => res.data);
const deleteCategory = (id) =>
  api.delete(`${api.url.category}/${id}`).then((res) => res.data);
const categoryService = {
    getAllCategories,
    getIdCategory ,
    updateCategory,
    createCategory,
    deleteCategory,
};

export default categoryService;
