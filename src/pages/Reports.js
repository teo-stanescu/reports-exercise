import React, { useEffect, useState } from "react";
import PageTemplate from "./PageTemplate";
import ApiMock from "../api/index";

const api = new ApiMock();

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(api.get("/all"));
  }, [data]);

  return (
    <PageTemplate
      title="Report List"
      content="Information for all reports"
      data={data}
      detectHeader
    />
  );
};

export default Reports;
