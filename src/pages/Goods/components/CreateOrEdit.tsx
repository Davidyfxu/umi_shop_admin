import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { CreateUserType, UpdateUserType } from '@/pages/types';
import { message, Modal, Skeleton } from 'antd';
import { addUser, showUser, updateUser } from '@/services/user';
import React, { useEffect, useState } from 'react';

const CreateOrEdit: React.FC<any> = (props: any) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  const [initialValues, setInitialValues] = useState<UpdateUserType>();

  const type = !editId ? '添加' : '编辑';

  useEffect(() => {
    (async () => {
      if (editId) {
        const response = await showUser(editId);
        setInitialValues({
          name: response.name,
          email: response.email,
        });
      }
    })();
  }, []);

  /* 提交表单, 执行编辑或者添加 */
  const handleSubmit = async (values: CreateUserType | UpdateUserType) => {
    let response;
    if (!editId) {
      response = await addUser(values as CreateUserType);
    } else {
      response = await updateUser(editId, values as UpdateUserType);
    }

    if (!response.status) {
      message.success(`${type}商品`);
      // 刷新表格数据
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    }
  };
  return (
    <Modal
      title={`${type}商品`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      {
        // 只有是编辑的情况下, 并且要显示的数据还没有返回, 才显示骨架屏
        initialValues === undefined && editId !== undefined ? (
          <Skeleton active={true} paragraph={{ rows: 4 }} />
        ) : (
          <ProForm
            initialValues={initialValues}
            onFinish={(values: CreateUserType) => handleSubmit(values)}
          >
            <ProFormText
              name="category_id"
              label="分类"
              placeholder="请输入分类"
              rules={[{ required: true, message: '请输入昵称' }]}
            />
            <ProFormText
              name="title"
              label="商品名"
              placeholder="请输入商品名"
              rules={[{ required: true, message: '请输入商品名' }]}
            />
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入描述"
              rules={[{ required: true, message: '请输入描述' }]}
            />
            <ProFormDigit
              name="price"
              label="价格"
              placeholder="请输入价格"
              min={0}
              max={99999999}
              rules={[{ required: true, message: '请输入价格' }]}
            />
            <ProFormDigit
              name="stock"
              label="库存"
              placeholder="请输入库存"
              min={0}
              max={99999999}
              rules={[{ required: true, message: '请输入库存' }]}
            />
            <ProFormUploadButton
              label="上传"
              name="cover"
              action={'action.do'}
              rules={[{ required: true, message: '请上传图片' }]}
            />
            <ProFormTextArea
              name="details"
              label="详情"
              placeholder="请输入详情"
              rules={[{ required: true, message: '请输入详情' }]}
            />
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreateOrEdit;
