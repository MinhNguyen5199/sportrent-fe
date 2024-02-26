import React from "react";
import { Route, Routes} from "react-router-dom";
import Product from "./pages/ManageProduct";
import ProductList from "./pages/TableList/ProductList";
import CategoryList from "./pages/TableList/CategoryList";
import Category from "./pages/Category";
import Customers from "./pages/Customers";
import CustomerList from "./pages/TableList/CustomerList";
import Staffs from "./pages/Staffs";
import StaffList from "./pages/TableList/StaffList";
import Reservation from "../Reservation/pages/TableList/ReservationList";
import Dashboard from "./Dashboard/Home";
import NotFound from "./pages/PAGENOTFOUND";
import { withRouter } from "../../constants/WithRouter";

function ManagerRoutes() {
    return (
      <React.Fragment>
      <section>
            <Routes>
                <Route path="/" exact element={<Dashboard /> }/>

                <Route path="/product/:id" element={<Product /> }/>
                <Route path="/product" element={<Product /> }/>
                <Route path="/productList" element={<ProductList /> }/>

                <Route path="/category" element={<Category /> }/>
                <Route path="/category/:id" element={<Category /> }/>
                <Route path="/categoryList" element={<CategoryList /> }/>

                <Route path="/customerList" element={<CustomerList /> }/>
                <Route path="/customers/:id" element={<Customers /> }/>
                <Route path="/customers" element={<Customers /> }/>

                <Route path="/staffList" element={<StaffList /> }/>
                <Route path="/staff/:id" element={<Staffs /> }/>
                <Route path="/staff" element={<Staffs /> }/>
                <Route path="/reservation" element={<Reservation /> }/>
                <Route component={<NotFound /> }/>
            </ Routes>
      </section>
      </React.Fragment>
    )
}

export default withRouter(ManagerRoutes);