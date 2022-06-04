import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Image, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FilterUser, GoodsItem, ActionType, UserInfo } from '@/pages/types';
import CreateOrEdit from '@/pages/Goods/components/CreateOrEdit';
import { getGoods, isOn, isRecommend } from '@/services/goods';

const Goods: React.FC<any> = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>();
  // 表格的ref, 便于自定义操作表格
  const actionRef = useRef<ActionType>();

  /* 获取商品列表数据，含筛选功能 */
  const getData = async (params: FilterUser) => {
    const response = await getGoods(params);

    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total,
    };
  };
  /* 上下架或物 */
  const handleIsOn = async (goodsId: number) => {
    const response = await isOn(goodsId);
    if (!response.status) {
      message.success('操作成功');
    }
  };
  /* 上下架或物 */
  const handleIsRecommend = async (goodsId: number) => {
    const response = await isRecommend(goodsId);
    if (!response.status) {
      message.success('操作成功');
    }
  };
  /* 控制模态框的显示与隐藏 */
  const isShowModal = (show: boolean, id?: number) => {
    setIsModalVisible(show);
    setEditId(id);
  };

  const columns: ProColumns<GoodsItem>[] = [
    {
      title: '商品图',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (text: ReactNode, record: GoodsItem) => (
        <Image
          width={64}
          src={record.cover_url}
          placeholder={<Image preview={false} src={record.cover_url} width={200} />}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      render: (text, record) => (
        <Switch
          checkedChildren={'已上架'}
          unCheckedChildren={'未上架'}
          defaultChecked={record.is_on === 1}
          onClick={() => handleIsOn(record.id)}
        />
      ),
      valueType: 'radioButton',
      valueEnum: { 0: { text: '未上架' }, 1: { text: '已上架' } },
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (text, record) => (
        <Switch
          checkedChildren={'已推荐'}
          unCheckedChildren={'未推荐'}
          defaultChecked={record.is_recommend === 1}
          onClick={() => handleIsRecommend(record.id)}
        />
      ),
      valueType: 'radioButton',
      valueEnum: { 0: { text: '未推荐' }, 1: { text: '已推荐' } },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (text: ReactNode, record: UserInfo) => (
        <a onClick={() => isShowModal(true, record.id)}>编辑</a>
      ),
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
      {isModalVisible && (
        <CreateOrEdit
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          actionRef={actionRef}
          editId={editId}
        />
      )}
    </PageContainer>
  );
};

export default Goods;
