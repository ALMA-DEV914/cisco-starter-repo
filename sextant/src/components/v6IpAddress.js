import React, { useEffect, useState } from "react";
import publicIp from "./publicIp.js";

const GetUserv6Info = (props) => {
  const { waitTime } = props;
  const [userv6IpAddress, setUserv6IpAddress] = useState("");
  useEffect(() => {
    if (!userv6IpAddress) {
      setTimeout(function () {
        getIp();
      }, 1000 * waitTime);
    }
  });
  const getIp = () => {
    publicIp.v6().then(
      (result) => {
        if (result) {
          setUserv6IpAddress(result);
        }
      },
      (error) => {
        console.log(error);
        setUserv6IpAddress("0.0.0.0");
      }
    );
  };
  return (
    <div>
      Your public v6 IP address:
      {!userv6IpAddress ? " loading..." : " "}
      {userv6IpAddress}
    </div>
  );
};

export default GetUserv6Info;
