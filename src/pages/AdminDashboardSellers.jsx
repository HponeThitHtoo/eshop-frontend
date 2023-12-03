import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={3} />
          </div>
          {/* <div className="bg-yellow-500 w-full min-h-[40vh]"></div> */}
          <AllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
