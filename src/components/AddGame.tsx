import { Form, Input, Button, Select } from 'antd';
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getGames } from '../store/actions/gameActions';
import { getTeams } from "../store/actions/teamActions";
import { Team } from "../types/team";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [form] = Form.useForm();

  const { data: teams } = useSelector(
    (state: AppState) => state.teams
  );

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    !teams.length && dispatch(getTeams());
  }, []);

  console.log(teams);
 

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

      <Form.Item name="week" label="Week" rules={[{ required: true }]}>
        <Select
          placeholder="Select a week"
          allowClear
        >
          <Option key='1' value="male">male</Option>
          <Option key='2' value="female">female</Option>
          <Option key='3' value="other">other</Option>

        </Select>
      </Form.Item> 

      <Form.Item name="homeTeam" label="Home" rules={[{ required: true }]}>
        <Select
          placeholder="Select home team"
          allowClear
        >
          {teams.map((team) => {
              console.log(team)
                    return (
                      <Select.Option value={team.Id} key={team.Id}>
                        {team.Name}
                      </Select.Option>
                    );
                  })}
        </Select>
      </Form.Item>

      <Form.Item name="awayTeam" label="Away" rules={[{ required: true }]}>
        <Select
          placeholder="Select away team"
          allowClear
        >
           {teams.map((team) => {
                    return (
                      <Select.Option value={team.Id} key={team.Id}>
                        {team.Name}
                      </Select.Option>
                    );
                  })}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;