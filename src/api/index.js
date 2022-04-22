import reports from "./data/reports.json";
// import fileExists from "file-exists";

function ApiMock() {
  this.get = (uri) => {
    const path = uri.substring(1);
    const components = path.split("/");

    switch (components[0]) {
      case "all":
        return getReportsList();
      case "data":
        const id = components[1];
        const billingPeriod = components[2];
        if (id && billingPeriod) return getReportForId(id, billingPeriod);
        return [];
      default:
        break;
    }
  };
}

const getReportsList = () => {
  return reports;
};

const getReportForId = (id, period) => {
  let data;
  try {
    data = require(`./data/${id}-${period}.json`);
    return {
      ok: true,
      message: "ok",
      data,
    };
  } catch (err) {
    return {
      ok: false,
      message: "File does not exist",
    };
  }
};

export default ApiMock;
