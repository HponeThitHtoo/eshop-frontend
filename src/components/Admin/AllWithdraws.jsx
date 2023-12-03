import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AllWithdraws = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-requests`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Withdraw Id",
      minWidth: 180,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Request Given At",
      type: "text",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={`${
              params.row.status !== "Processing" ? "hidden" : ""
            } mr-5 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        { sellerId: withdrawData.shopId },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  return (
    <div className="w-full flex items-center justify-center pt-5">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="w-full flex justify-end">
              <RxCross1 size={20} onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-[25px] text-center font-Poppins">
              Update Withdraw Status
            </h1>
            <select
              name=""
              id=""
              className="w-[200px] h-[35px] border rounded"
              onChange={(e) => setWithdrawStatus(e.target.value)}
            >
              <option value={withdrawStatus}>{withdrawData.status}</option>
              <option value={withdrawStatus}>Succeed</option>
            </select>
            <button
              type="submit"
              className={`block ${styles.button} !h-[42px] mt-4 text-white text-[18px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraws;
