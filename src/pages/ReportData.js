import React, { useEffect, useState } from "react";
import PageTemplate from "./PageTemplate";
import ApiMock from "../api/index";
import { notification } from "antd";

const api = new ApiMock();

const ReportData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const components = window.location.pathname.split("/");
    const billingPeriod = components[components.length - 1];
    const id = components[components.length - 2];

    const response = api.get(`/data/${id}/${billingPeriod}`);

    if (response.ok) setData(response.data);
    else {
      notification.open({
        message: "Error!",
        description: response.message,
      });
    }
  }, []);

  return (
    <PageTemplate
      title="Report Data"
      content="Information for report ID ..."
      data={data}
      closeButton
    />
  );
};

export default ReportData;
