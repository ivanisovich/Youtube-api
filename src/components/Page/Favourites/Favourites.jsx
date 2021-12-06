import { Button, List } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ModalForm from "../ModalForm/ModalForm";
import "./Favourites.css";

const Favourites = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestValue, setRequestValue] = useState({});
  const [request, setRequest] = useState({});

  const onSubmit = (request) => {
    setRequest(request);
    console.log(request);
    props.changeRequest(requestValue.id, request);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (request.requestName) {
      props.changeRequest(requestValue.id, request);
    }
  }, [request, requestValue]);

  return (
    <div className={"favourites"}>
      <List
        bordered
        size="large"
        dataSource={props.favouritesRequest}
        renderItem={(item) => (
          <List.Item
            actions={[
              <NavLink
                onClick={() => {
                  setRequestValue(item);
                  props.getSearchVideo(
                    item.request,
                    item.max_result,
                    item.sort
                  );
                }}
                to="/page/search"
              >
                Выполнить
              </NavLink>,
              <Button
                onClick={() => {
                  setIsModalVisible(true);
                  setRequestValue(item);
                }}
              >
                Редактировать
              </Button>,
            ]}
          >
            {item.requestName}
          </List.Item>
        )}
      />
      <ModalForm
        onSubmit={onSubmit}
        title={"Изменить "}
        visibleMode={isModalVisible}
        initialValue={requestValue}
        isDisabled={false}
      />
    </div>
  );
};

export default Favourites;
