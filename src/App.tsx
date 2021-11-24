import { Route } from "react-router-dom";
import { Layout } from "antd";
import AddGame from "./components/AddGame";

const { Content, Footer } = Layout;


function App() {
  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <AddGame />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        KANKOO 2021
      </Footer>
    </Layout>
  );
}

export default App;
