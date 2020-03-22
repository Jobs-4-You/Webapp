import { Layout, Breadcrumb } from "antd";
import AppHeader from "~/components/Header";
import styled from "styled-components";
const { Header, Content, Footer } = Layout;

const MainHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

const ContentWrapper = styled(Content)`
  margin-top: 64px;
  padding: 0 50px;
`;

const NavBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
`;

const PageWrapper = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
`;

export default ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainHeader className="header" theme="light">
        <AppHeader />
      </MainHeader>
      <ContentWrapper>
        <NavBreadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </NavBreadcrumb>
        <PageWrapper>{children}</PageWrapper>
      </ContentWrapper>
      <Footer style={{ textAlign: "center" }}>
        Made with &hearts; by <a href="https://google.com">J4U</a>
      </Footer>
    </Layout>
  );
};
