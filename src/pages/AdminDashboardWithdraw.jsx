import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllWithdraws from "../components/Admin/AllWithdraws";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={7} />
          </div>
          <AllWithdraws />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
