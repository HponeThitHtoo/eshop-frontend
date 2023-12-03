import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      console.log("Called useEffect");
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
          console.log(res.data);
        } catch (error) {
          console.log(error.response.data.message);
          // console.log(error);
          setError(true);
        }
      };

      activationEmail();
    }
    // eslint-disable-next-line
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <>
          <p>Your shop has been created and activated successfully!</p>
        </>
      )}
    </div>
  );
};

export default SellerActivationPage;
