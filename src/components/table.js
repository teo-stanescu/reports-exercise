import React, { useEffect, useState } from "react";
import { Table, Select, Space, DatePicker, Button, notification } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";

const ReportTable = (props) => {
  const { data, detectHeader } = props;
  const [header, setHeader] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  //   const [selected, setSelected] = useState({});
  let selected = {};

  const navigate = useNavigate();

  useEffect(() => {
    const extractHeader = () => {
      let content;
      if (detectHeader) content = data.content;
      else content = data.columns;

      if (!content || content.length === 0) return;

      const columnNames = detectHeader ? Object.keys(content[0]) : content;
      const newHeaders = columnNames.map((el) => {
        return {
          dataIndex: el,
          key: el,
          title: `${el.charAt(0).toUpperCase()}${el.slice(1)}`,
          sorter: (a, b, c) => {
            if (typeof a[el] === "number" || !Number.isNaN(Number(a[el])))
              return Number(a[el]) - Number(b[el]);

            if (a[el] < b[el]) return -1;
            else return 1;
          },
          render: (data) => getCellContent(data, el),
        };
      });
      if (detectHeader) {
        newHeaders.push(
          {
            dataIndex: "billingPeriod",
            key: "billingPeriod",
            title: "Billing Period",
            render: (a, b) => {
              return (
                <Space direction="vertical">
                  <DatePicker
                    onChange={(date, dateString) =>
                      onChangeDatePicker(dateString, b.id)
                    }
                    picker="month"
                  />
                </Space>
              );
            },
          },
          {
            dataIndex: "action",
            key: "action",
            title: "",
            render: (a, b) => {
              return <Button onClick={() => handleView(b.id)}>View</Button>;
            },
          }
        );
      }

      return newHeaders;
    };

    if (data) {
      const newHeaders = extractHeader();
      if (Array.isArray(newHeaders) && newHeaders.length > 0) {
        setDisplayData(
          detectHeader ? data.content : processData(data.data, newHeaders)
        );
        setHeader(newHeaders);
      }
    }
  }, [data, detectHeader]);

  const handleView = (id) => {
    console.log({ id, selected });
    if (!selected[id]) {
      notification.open({
        message: "Watch out!",
        description: "You haven't selected a billing period for this report!",
      });
      return;
    }

    navigate(`/data/${id}/${selected[id]}`);
  };

  const onChangeDatePicker = (dateString, id) => {
    selected = {
      ...selected,
      [id]: dateString.replace("-", ""),
    };
  };

  const processData = (array, headers) => {
    if (!array || array.length === 0 || !headers || headers.length === 0)
      return [];

    return (array ?? []).map((el) => {
      const row = {};
      el.forEach((cellValue, index) => {
        row[headers[index]?.dataIndex] = cellValue;
      });
      return row;
    });
  };

  const getCellContent = (rowData, column) => {
    if (column.toLowerCase().includes("date"))
      return new Date(rowData).toLocaleString();

    if (column.toLowerCase().includes("bytes"))
      return (Number(rowData) / 1024 / 1024).toFixed(2).toString() + " MB";

    return rowData;
  };

  return <Table dataSource={displayData} columns={header} />;
};

export default ReportTable;
