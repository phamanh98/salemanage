import api from "./api";

const getAllPromotion = () => api.get(api.url.promotion).then((res) => res.data);
const getIdPromotion = (id) =>
  api.get(`${api.url.product}/${id}`).then((res) => res.data);
const updatePromotion = (id, data) =>
  api.put(`${api.url.promotion}/${id}`, data).then((res) => res.data);
const createPromotion = (data) =>
  api.post(api.url.category, data).then((res) => res.data);
const deletePromotion = (id) =>
  api.delete(`${api.url.promotion}/${id}`).then((res) => res.data);
const promotionService = {
    getAllPromotion,
    getIdPromotion ,
    updatePromotion,
    createPromotion,
    deletePromotion,
};

export default promotionService;