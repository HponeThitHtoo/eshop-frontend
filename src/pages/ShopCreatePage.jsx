import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ShopCreate from "../components/Shop/ShopCreate";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, [navigate, isSeller, seller]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
