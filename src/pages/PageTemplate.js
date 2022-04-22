import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ReportTable from "../components/table";

const PageTemplate = (props) => {
  const { title, textContent, closeButton, ...rest } = props;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <h2>{title}</h2>
        {closeButton && (
          <Button>
            <Link to="/">Close</Link>
          </Button>
        )}
      </div>
      <div>
        <p>{textContent}</p>
      </div>
      <ReportTable {...rest} />
    </>
  );
};

export default PageTemplate;
