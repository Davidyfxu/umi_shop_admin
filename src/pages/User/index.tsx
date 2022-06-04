import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, message, Switch } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { ActionType, UserInfo } from '@/pages/types';
import { getUsers, lockUser } from '@/services/user';
import type { FilterUser } from '@/pages/types';
import Create from '@/pages/User/components/Create';

const User: React.FC<any> = () => {
  // 表格的ref, 便于自定义操作表格
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  /* 控制模态框的显示与隐藏 */
  const isShowModal = (show: boolean) => {
    setIsModalVisible(show);
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
      // render: (text: ReactNode, record: UserInfo) => <a onClick={() => isShowModal(true)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef as any}
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
            onClick={() => isShowModal(true)}
          >
            新建
          </Button>,
        ]}
      />
      );
      <Create isModalVisible={isModalVisible} isShowModal={isShowModal} actionRef={actionRef} />
    </PageContainer>
  );
};

export default User;
