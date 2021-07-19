import {Form, Input, Button, Tabs, Radio, Avatar, message, Upload} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import './index.less'

import {delUser, getUserInfo, updateAccount, updateBaseInfo, updatePassword, uploadImg} from "@/pages/Info/service";
import {getDvaApp} from "@@/plugin-dva/exports";

const {TabPane} = Tabs;
const Index: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState({
    id:'',
    name: '',
    password: '',
    headImg: '',
    nickName: '',
    qq: '',
    wx: '',
    email: '',
    phone: '',
    sex: ''
  });
  const [headImg, setHeadImg] = React.useState();
  const [value,setValue] = React.useState();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  useEffect(() => {
    info();
  }, [])

  const info = async () => {
    const info = await getUserInfo();
    form.setFieldsValue({
      id:info.data.id,
      name: info.data.name,
      nickName:info.data.nickName,
      headImg:info.data.headImg,
      sex:info.data.sex,
      qq: info.data.qq,
      wx: info.data.wx,
      email: info.data.email,
      phone: info.data.phone
    })
    form1.setFieldsValue(form);
    form2.setFieldsValue(form);
    setUserInfo(info.data);
    if (info.data.headImg) {
      setHeadImg(info.data.headImg);
    }
  }

  const onFinishInfo = async (values: any) => {
    var newVar = await updateBaseInfo(values);
    if (newVar.code === 0){
      message.success("修改成功")
    }
    info();
  };

  const onFinishCode = async (values: any) => {
    var newVar = await updateAccount(values);
    if (newVar.code === 0){
      message.success("修改成功")
    }
    info();
  };

  const onFinishPassword = async (values: any) => {
    const temp = await updatePassword(values);
    if (temp.code === 0&&temp.msg ==='SUCCESS'){
      message.success(temp.data,5);
      getDvaApp()._store.dispatch({
        type: 'login/logout',
      });
    }
  };

  // @ts-ignore
  const onDelUser = async (userId) =>{
    let msg = "您真的确定要注销吗？";
    if (confirm(msg)==true){
      const temp = await delUser(userId);
      if (temp.code === 0&&temp.msg ==='SUCCESS'){
        message.success(temp.data,5);
        getDvaApp()._store.dispatch({
          type: 'login/logout',
        });
      }
    }else{
      return false;
    }

  };

  const onChange = (e: { target: { value: React.SetStateAction<number>; }; }) => {
    setValue(e.target.value);
  }
  const props = {
    showUploadList: false,//设置只上传一张图片，根据实际情况修改
    customRequest: async (info: { file: any}) => {
      const formData = new FormData();
      formData.append('multipartFile', info.file);
      let newVar = await uploadImg(formData);
      setHeadImg(newVar.data);
      form.setFieldsValue({
        headImg:newVar.data
      })
    }
  };

  return <>
    <PageContainer>

      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="基础信息" key="0">
            <Form
              name="basic"
              form={form} //首个初始化
              labelCol={{span: 8}}
              wrapperCol={{span: 8}}
              initialValues={userInfo}
              onFinish={onFinishInfo}
            >

              <Form.Item wrapperCol={{offset: 8, span: 8}} >
                <div style={{textAlign: 'center'}}>
                  <Avatar size={64} src={headImg} style={{margin: '0 auto'}}/>
                </div>
                <div style={{textAlign: 'center', margin: '10px 0', color: 'blue'}}>
                  <Upload  {...props}>修改</Upload>
                </div>
              </Form.Item>

              <Form.Item name='id' style={{display: "none"}}>
                <Input disabled/>
              </Form.Item>
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
                <Input/>
              </Form.Item>
              <Form.Item
                label="性别"
                name="sex"
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={true}>男</Radio>
                  <Radio value={false}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item style={{display: "none"}}
                         name="headImg"
              >
                <Input/>
              </Form.Item>

              <Form.Item wrapperCol={{offset: 8, span: 8}} style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" style={{margin: '0 10px'}}>
                  提交
                </Button>
                <Button type="primary" onClick={()=>onDelUser(userInfo.id)}>
                  注销
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="安全" key="1">
            <Form
              name="password"
              labelCol={{span: 8}}
              wrapperCol={{span: 8}}
              initialValues={userInfo}
              form = {form1}
              onFinish={onFinishPassword}
            >
              <Form.Item name='id' style={{display: "none"}}>
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="账号"
                name="name"
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="原密码"
                name="oldPassword"
                rules={[{required: true, message: '请输入原密码!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[{required: true, message: '请输入新密码!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item
                label="确认密码"
                name="password1"
                rules={[{required: true, message: '请输入确认密码!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item wrapperCol={{offset: 8, span: 8}}>
                <Button type="primary" htmlType="submit">
                  确定修改
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="账号" key="2">
            <Form
              name="code"
              labelCol={{span: 8}}
              wrapperCol={{span: 8}}
              form={form2}
              initialValues={userInfo}
              onFinish={onFinishCode}
            >
              <Form.Item name='id' style={{display: "none"}}>
                <Input disabled/>
              </Form.Item>
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
                <Input/>
              </Form.Item>

              <Form.Item
                label="QQ"
                name="qq"
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="微信"
                name="wx"
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="邮箱"
                name="email"
              >
                <Input/>
              </Form.Item>

              <Form.Item wrapperCol={{offset: 8, span: 8}}>
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
