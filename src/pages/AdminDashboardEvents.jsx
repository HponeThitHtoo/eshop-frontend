import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllEvents from "../components/Admin/AllEvents";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={6} />
          </div>
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
