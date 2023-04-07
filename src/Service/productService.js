import api from "./api";

const getAllProducts = () => api.get(api.url.product).then((res) => res.data);
const getIdProduct = (id) =>
  api.get(`${api.url.product}/${id}`).then((res) => res.data);
const updateProduct = (id, data) =>
  api.put(`${api.url.product}/${id}`, data).then((res) => res.data);
const createProduct = (data) =>
  api.post(api.url.product, data).then((res) => res.data);
const deleteProduct = (id) =>
  api.delete(`${api.url.product}/${id}`).then((res) => res.data);
const productService = {
    getAllProducts,
    getIdProduct,
    updateProduct,
    createProduct,
    deleteProduct,
};

export default productService;
