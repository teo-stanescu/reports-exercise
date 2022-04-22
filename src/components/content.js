import { Layout } from "antd";
import AppRouter from "./appRouter";
import "./nav.css";

const { Header, Content } = Layout;

const AppContent = () => (
  <Layout className="layout">
    <Header className="header">
      <div className="brand">ReportApp</div>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <AppRouter />
    </Content>
  </Layout>
);

export default AppContent;
