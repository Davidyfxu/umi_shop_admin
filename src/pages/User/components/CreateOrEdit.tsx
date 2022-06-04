import ProForm, { ProFormText } from '@ant-design/pro-form';
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
      message.success(`${type}用户`);
      // 刷新表格数据
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    }
  };
  return (
    <Modal
      title={`${type}用户`}
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
            {!editId ? (
              <ProFormText.Password
                name="password"
                label="密码"
                placeholder="请输入密码"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码最小6位' },
                ]}
              />
            ) : (
              ''
            )}
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreateOrEdit;
