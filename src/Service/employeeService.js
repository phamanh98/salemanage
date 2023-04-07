import api from "./api";

const getAllEmployee = () => api.get(api.url.employee).then((res) => res.data);
const getIdEmployee = (id) =>
  api.get(`${api.url.employee}/${id}`).then((res) => res.data);
const updateEmployee = (id, data) =>
  api.put(`${api.url.employee}/${id}`, data).then((res) => res.data);
const createEmployee = (data) =>
  api.post(api.url.employee, data).then((res) => res.data);
const deleteEmployee = (id) =>
  api.delete(`${api.url.employee}/${id}`).then((res) => res.data);
const employeeService = {
    getAllEmployee,
    getIdEmployee,
    updateEmployee,
    createEmployee,
    deleteEmployee,
};

export default employeeService;

