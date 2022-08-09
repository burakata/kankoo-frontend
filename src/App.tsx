import { Route } from "react-router-dom";
import { Layout } from "antd";
import AddGame from "./components/AddGame";
import BasicGrid from "./components/Bet";
import Login from "./components/Login";
import { useState } from "react";
import { User } from "./types/user";

const { Content, Footer } = Layout;


function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [user, setUser] = useState<User>({
    Id: -1,
    Name: '',
    Password: '',
    UserName: '',
    IsAdmin:false
}
);

  if(!isSubmitted && (!user || user.Id < 1) ) {
    return <Login isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} user={user} setUser={setUser} />
  }

  else {
  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "10px", marginTop: 8 }}
      >
        <BasicGrid user={user} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <h3>KANKOO 2022</h3>
      </Footer>
    </Layout>
  );
  }
}

export default App;
