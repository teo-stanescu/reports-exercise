import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "../pages/Reports";
import ReportData from "../pages/ReportData";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Reports />} />
        <Route path="/data/:id/:billingperiod" element={<ReportData />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
