import React from "react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import FavouritesContainer from "./Favourites/FavouritesContainer";
import SearchContainer from "./Search/SearchContainer";
import logo from "../../assets/img/sibdev-logo.png";
import "./Page.css";

const { Header, Content } = Layout;

const Page = (props) => {
  return (
    <Layout className={"layout"}>
      <Header>
        <Row>
          <Col span={2}>
            <div className={"logo"}>
              <img src={logo} alt="" />
            </div>
          </Col>
          <Col span={18}>
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/search">Поиск</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/page/favourites">Избранное</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col className="logout-button" span={2}>
            <Button type="secondary" onClick={props.logout}>
              Выйти
            </Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <div className={"content"}>
          <Switch>
            <Route
              exact
              path="/page"
              render={() => <Redirect to={"/page/search"} />}
            />
            <Route path="/page/search" render={() => <SearchContainer />} />
            <Route
              path="/page/favourites"
              render={() => <FavouritesContainer />}
            />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};

export default Page;
