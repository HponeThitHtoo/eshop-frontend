import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../styles/styles";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      <br />
      <br />

      {/* order items */}
      {data &&
        data?.cart.map((item, index) => (
          <div key={item._id} className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>

      <br />
      <br />

      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            <span>{data?.shippingAddress.address1}</span>
            <br />
            <span>{data?.shippingAddress.address2}</span>
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[20px]">{data?.user.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>

      <br />
      <br />

      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing Refund" &&
        data?.status !== "Refund Success" && (
          <select
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing Refund" ||
      data?.status === "Refund Success" ? (
        <select
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["Processing Refund", "Refund Success"]
            .slice(
              ["Processing Refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      ) : null}
      <div
        className={`${styles.button} mt-5 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Processing Refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
