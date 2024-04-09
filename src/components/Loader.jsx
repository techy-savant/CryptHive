import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const Loader = () => {
  return (
    <div className="loader">
      <SyncOutlined spin style={{ fontSize: 50, color: "#0071bd" }} />
    </div>
  );
};

export default Loader;
