import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";

import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const WishList = ({ setOpenWishlist }) => {
  /* const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
      description: "test",
      price: 245,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver colour",
      description: "test",
      price: 645,
    },
  ]; */

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    // console.log(data);
    const isItemExists = cart && cart.find((i) => i._id === data._id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const newData = { ...data, qty: 1 };
      dispatch(addToCart(newData));
      setOpenWishlist(false);
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] overflow-y-scroll bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            {/* Item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {/* cart single items */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle
                    key={i._id}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1
          className="cursor-pointer mb-2 ml-2 800px:mb-['unset'] 800px:ml-['unset']"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-3 800px:pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
