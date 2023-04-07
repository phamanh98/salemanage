import axios from "axios";

const url = {
  product: "https://6411e4fcf9fe8122ae17129c.mockapi.io/Product",
  employee: "https://6411e4fcf9fe8122ae17129c.mockapi.io/employee",
  bill: "https://641288d76e3ca31753101c89.mockapi.io/bill",
  order: "https://641288d76e3ca31753101c89.mockapi.io/Order",
  account: "https://64128e6c6e3ca3175310ab79.mockapi.io/account",
  promotion: "https://64128e6c6e3ca3175310ab79.mockapi.io/promotion",
    category: "https://641290506e3ca3175310d9a7.mockapi.io/Category",
    supplier: "https://641290506e3ca3175310d9a7.mockapi.io/supplier",
    customer: "https://641292ee6e3ca31753111348.mockapi.io/customer",
    receipt: "https://641291ab6e3ca3175310f829.mockapi.io/receipt",
    inventorySheet: "https://641291ab6e3ca3175310f829.mockapi.io/inventorySheet"
};

const instance = axios.create({
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
});

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default api;
