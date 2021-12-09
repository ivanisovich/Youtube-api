import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Redirect, Route, Switch } from "react-router-dom";
import PageConteiner from "./components/Page/PageContainer";
// !import LoginConteiner from "./components/Login/LoginContainer";

const App = () => {
  return (
    <div className={"App"}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/page"} />} />
        <Route path="/page" render={() => <PageConteiner />} />
        {/* <Route path="/login" render={() => <LoginConteiner />} /> */}
      </Switch>
    </div>
  );
};

export default App;
