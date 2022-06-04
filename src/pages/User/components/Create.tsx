import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { CreateUserType } from '@/pages/types';
import { message, Modal } from 'antd';
import { addUser } from '@/services/user';
import React from 'react';

const Create: React.FC<any> = (props: any) => {
  const { isModalVisible, isShowModal, actionRef } = props;
  /* 添加用户 */
  const createUser = async (values: CreateUserType) => {
    const response = await addUser(values);
    if (!response.status) {
      message.success('添加成功');
      // 刷新表格数据
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    }
  };
  return (
    <Modal
      title="添加用户"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <ProForm onFinish={(values: CreateUserType) => createUser(values)}>
        <ProFormText
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码最小6位' },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Create;
