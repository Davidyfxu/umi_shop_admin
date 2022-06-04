import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, message, Modal, Switch } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { ActionType, UserInfo } from '@/pages/types';
import { addUser, getUsers, lockUser } from '@/services/user';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { CreateUserType, FilterUser } from '@/pages/types';

const User: React.FC<any> = () => {
  // 表格的ref, 便于自定义操作表格
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function isShowModal(show: boolean, id: number) {}

  /* 获取列表数据，含筛选功能 */
  const getData = async (params: FilterUser) => {
    const response = await getUsers(params);
    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total,
    };
  };

  /* 封禁与启用用户 */
  const handleLockUser = async (uid: number) => {
    const response = await lockUser(uid);
    if (!response.status) {
      message.success('操作成功');
    }
  };

  /* 关闭模态框 */
  const closeModal = () => {
    setIsModalVisible(false);
  };
  /* 打开添加表单 */
  const openCreateForm = () => {
    setIsModalVisible(true);
  };

  /* 添加用户 */
  const createUser = async (values: CreateUserType) => {
    const response = await addUser(values);
    if (!response.status) {
      message.success('添加成功');
      // 刷新表格数据
      actionRef.current?.reload();
      //关闭模态框
      setIsModalVisible(false);
    }
  };

  const columns: ProColumns<UserInfo>[] = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (text: ReactNode, record: UserInfo) => (
        <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (text, record) => (
        <Switch
          checkedChildren={'启用'}
          unCheckedChildren={'禁用'}
          defaultChecked={record.is_locked === 0}
          onClick={() => handleLockUser(record.id)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onClick={() => isShowModal(true, record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params: any = {}) => getData(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => openCreateForm()}
          >
            新建
          </Button>,
        ]}
      />
      );
      <Modal
        title="添加用户"
        visible={isModalVisible}
        onCancel={closeModal}
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
    </PageContainer>
  );
};

export default User;
