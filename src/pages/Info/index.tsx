import {Form, Input, Button, Tabs, Radio, Avatar, message, Upload} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import './index.less'
import {UserOutlined} from "@ant-design/icons";
const { TabPane } = Tabs;
const Index: React.FC = ()=>{
  const [value, setValue] = React.useState(0);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: { target: { value: React.SetStateAction<number>; }; }) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: { file: { status: string; name: any; }; fileList: any; }) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传头像成功，记得保存哦`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 头像上传失败.`);
      }
    },
  };

  return <>
    <PageContainer>

      <div className="card-container">
      <Tabs type="card">
        <TabPane tab="基础信息" key="1" >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div style={{textAlign:'center'}}>
              <Avatar size={64} icon={<UserOutlined />} style={{margin:'0 auto'}}/>
              </div>
              <div style={{textAlign:'center',margin:'10px 0',color:'blue'}}>

                <Upload  {...props}>修改</Upload>
              </div>

              <Form.Item
                label="账号"
                name="name"
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="昵称"
                name="nickName"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="性别"
                name="sex"
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item style={{display:"none"}}
                name="head_img"
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 8 }} style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit" style={{margin:'0 10px'}}>
                  提交
                </Button>
                <Button type="primary" htmlType="submit">
                  注销
                </Button>
              </Form.Item>
            </Form>
        </TabPane>

        <TabPane tab="安全" key="2">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="name"
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="原密码"
              name="password0"
              rules={[{ required: true, message: '请输入原密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="新密码"
              name="password"
              rules={[{ required: true, message: '请输入新密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="password1"
              rules={[{ required: true, message: '请输入确认密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit">
                确定修改
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="账号" key="3">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="name"
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="手机"
              name="phone"
            >
              <Input />
            </Form.Item>

            <Form.Item
            label="QQ"
            name="qq"
          >
            <Input />
          </Form.Item>

            <Form.Item
              label="微信"
              name="wx"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
      </div>
    </PageContainer>
  </>
}

export default Index;
