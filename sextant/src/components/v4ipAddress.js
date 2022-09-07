import React, { useEffect, useState } from "react";
import publicIp from "./publicIp.js";

const GetUserv4Info = (props) => {
  const { waitTime } = props;
  const [userv4IpAddress, setUserv4IpAddress] = useState("");
  useEffect(() => {
    if (!userv4IpAddress) {
      setTimeout(function () {
        getIp();
      }, 1000 * waitTime);
    }
  });
  const getIp = () => {
    publicIp.v4().then(
      (result) => {
        if (result) {
          setUserv4IpAddress(result);
        }
      },
      (error) => {
        console.log(error);
        setUserv4IpAddress("0.0.0.0");
      }
    );
  };
  return (
    <div>
      Your public v4 IP address:
      {!userv4IpAddress ? " loading..." : " "}
      {userv4IpAddress}
    </div>
  );
};

export default GetUserv4Info;
