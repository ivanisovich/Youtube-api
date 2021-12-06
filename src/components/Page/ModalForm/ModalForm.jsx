import { Button, Input, Select, Form, Slider } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import "./ModalForm.css";

const RequestForm = (props) => {
  const [inputValue, setInputValue] = useState(12);

  const onChange = (value) => {
    setInputValue(value);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form {...layout} name="save_request" onFinish={props.onSubmit}>
      <Form.Item name="request" label="Запрос" initialValue={props.textRequest}>
        {props.isDisabled ? <Input disabled /> : <Input />}
      </Form.Item>
      <Form.Item
        name="nameRequest"
        initialValue={props.initialValue.nameRequest || ""}
        label="Название"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите название запроса!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.initialValue.sort || "date"}
        name="sort"
        label="Сортировать по"
      >
        <Select>
          <Select.Option value="date">По дате</Select.Option>
          <Select.Option value="rating">По рейтингу</Select.Option>
          <Select.Option value="relevance">По релевантности</Select.Option>
          <Select.Option value="title">По алфавиту</Select.Option>
          <Select.Option value="viewCount">
            По количеству просмотров
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="max_result"
        label="Максимум"
        initialValue={props.initialValue.max_result || "1"}
      >
        <Slider min={1} max={50} onChange={onChange} value={inputValue} />
      </Form.Item>
      <Form.Item>
        <div className={"request_buttons"}>
          <div className={"request_buttons"}>
            <Button type="primary" onClick={props.onCancel}>
              Отмена
            </Button>
          </div>
          <div className={"request_buttons"}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

const ModalForm = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(props.visibleMode);

  useEffect(() => {
    setIsModalVisible(props.visibleMode);
  }, [props.visibleMode]);

  return (
    <Modal
      title={`${props.title} запрос`}
      visible={isModalVisible}
      centered
      footer={null}
    >
      <RequestForm
        onSubmit={props.onSubmit}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        textRequest={props.textRequest || props.initialValue.request}
        isDisabled={props.isDisabled}
        initialValue={props.initialValue}
      />
    </Modal>
  );
};

export default ModalForm;
