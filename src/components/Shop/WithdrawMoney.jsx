import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { loadSeller } from "../../redux/actions/user";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  /* const { orders } = useSelector((state) => state.order);
  const [deliveredOrder, setDeliveredOrder] = useState(null); */
  const initialBankInfo = {
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    accountHolderName: "",
    bankAddress: "",
  };
  const [bankInfo, setBankInfo] = useState(initialBankInfo);
  const [withdrawAmount, setWithdrawAmount] = useState(50);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  /* useEffect(() => {
    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [orders]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2); */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      accountHolderName: bankInfo.accountHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        { withdrawMethod },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo(initialBankInfo);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    setPaymentMethod(false);
  };

  const deleteHandler = async () => {
    await axios.delete(`${server}/shop/delete-withdraw-method`, {
      withCredentials: true,
    });
    toast.success("Withdraw method deleted successfully!");
    dispatch(loadSeller());
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > seller?.availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios.post(
        `${server}/withdraw/create-withdraw-request`,
        { amount },
        { withCredentials: true }
      );
      toast.success(
        "Withdraw money request is successful! Please check your email for your withdraw request!"
      );
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() =>
            availableBalance < 50 || NaN ? error() : setOpen(true)
          }
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false) || setPaymentMethod(false)}
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add New Withdraw Method:
                </h3>
                <form action="" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your bank name!"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your bank country!"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your bank swift code!"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your bank account number!"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Account Holder Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter account holder name!"
                      required
                      value={bankInfo.accountHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          accountHolderName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your bank address!"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="w-full 800px:flex justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={deleteHandler}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="w-full 800px:flex items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        className="w-full 800px:w-[100px] border 800px:mr-3 p-1 rounded"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <div
                        className={`${styles.button} !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods Available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
