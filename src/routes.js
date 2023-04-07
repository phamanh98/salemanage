import Product from "./Components/Pages/Product";
import Bill from "./Components/Pages/Bill";
import Category from "./Components/Pages/Category";
import Customer from "./Components/Pages/Customer";
import Employee from "./Components/Pages/Employee";
import Order from "./Components/Pages/Order";
import InventorySheet from "./Components/Pages/InventorySheet";
import Receipt from "./Components/Pages/Receipt";
import Supplier from "./Components/Pages/Supplier";
import Promotion from "./Components/Pages/Promotion";
import Account from "./Components/Pages/Account";

const routes = [
  {
    path: "/product",
    exact: true,
    component: <Product/>,
    main: () => <Product/>,
  },
  {
    path: "/bill",
    exact: true,
    component: <Bill/>,
    main: () => <Bill/>,
  },
  {
    path: "/category",
    exact: true,
    component: <Category/>,
    main: () => <Category/>,
  },
  {
    path: "/customer",
    exact: true,
    component: <Customer/>,
    main: () => <Customer/>,
  },
  {
    path: "/employee",
    exact: true,
    component: <Employee/>,
    main: () => <Employee/>,
  },
  {
    path: "/order",
    exact: true,
    component: <Order/>,
    main: () => <Order/>,
  },
  {
    path: "/inventory",
    exact: true,
    component: <InventorySheet/>,
    main: () => <InventorySheet/>,
  },
  {
    path: "/receipt",
    exact: true,
    component: <Receipt/>,
    main: () => <Receipt/>,
  },
  {
    path: "/supplier",
    exact: true,
    component: <Supplier/>,
    main: () => <Supplier/>,
  },
  {
    path: "/promotion",
    exact: true,
    component: <Promotion/>,
    main: () => <Promotion/>,
  },
  {
    path: "/account",
    exact: true,
    component: <Account/>,
    main: () => <Account/>,
  },
];

export default routes;
