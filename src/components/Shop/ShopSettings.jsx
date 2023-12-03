import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Shop info updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}${seller.avatar}`
              }
              alt="shop"
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          action=""
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Name
              </label>
            </div>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Description
              </label>
            </div>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Address
              </label>
            </div>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${seller?.address}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Phone Number
              </label>
            </div>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${seller?.phoneNumber}`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <div className="w-full pl-[3%]">
              <label htmlFor="" className="block pb-2">
                Shop Zip Code
              </label>
            </div>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${seller?.zipCode}`}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%] flex flex-col items-center mt-5">
            <input
              type="submit"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-pointer`}
              value="Update Shop"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
