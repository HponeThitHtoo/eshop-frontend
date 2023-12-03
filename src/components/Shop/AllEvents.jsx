import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    console.log("id", id);
    console.log("handleDelete called");
    dispatch(deleteEvent(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        /* const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-"); */
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 mt-10 pt-1 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
