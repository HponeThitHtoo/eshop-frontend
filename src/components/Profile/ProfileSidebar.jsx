import React from "react";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => console.log(error.response.data.message));
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 1 ? "text-[red]" : ""
          }`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 2 ? "text-[red]" : ""
          }`}
        >
          Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 3 ? "text-[red]" : ""
          }`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 4 ? "text-[red]" : ""
          }`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 5 ? "text-[red]" : ""
          }`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 6 ? "text-[red]" : ""
          }`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 7 ? "text-[red]" : ""
          }`}
        >
          Address
        </span>
      </div>

      {user && user.role === "admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "red" : ""}
            />
            <span
              className={`hidden 800px:block pl-3 ${
                active === 8 ? "text-[red]" : ""
              }`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || handleLogout()}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 8 ? "text-[red]" : ""
          }`}
        >
          Log Out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
