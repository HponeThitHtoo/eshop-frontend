import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllProducts from "../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={5} />
          </div>
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
