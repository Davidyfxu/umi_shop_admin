import ProForm, { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message, Modal, Skeleton, Cascader, Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCategory } from '@/services/category';
import type { Category, GoodsAddType } from '@/pages/types';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { UploadOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';
import { addGoods, showGoods, updateGoods } from '@/services/goods';

const CreateOrEdit: React.FC<any> = (props: any) => {
  const { isModalVisible, isShowModal, actionRef, editId } = props;
  const [initialValues, setInitialValues] = useState<GoodsAddType>();
  const [options, setOptions] = useState<Category[]>([]);
  const type = !editId ? '添加' : '编辑';
  // 定义Form实例，用来操作表单
  const [form] = ProForm.useForm();

  useEffect(() => {
    (async () => {
      const resCategory = await getCategory();
      if (!resCategory.status) {
        setOptions(resCategory);
      }
      if (editId) {
        const response = await showGoods(editId);
        console.log(response);
        const { pid = 0, id } = response.category;
        const defaultCategory = pid === 0 ? [id] : [pid, id];
        setInitialValues({
          ...response,
          category_id: defaultCategory,
        });
      }
    })();
  }, []);
  // 文件上传成功后，设置cover字段的value
  const setCoverKey = (fileKey: any) => {
    form.setFieldsValue({ cover: fileKey });
  };
  // 文件上传成功后，设置details字段的value
  const setDetails = (content: any) => {
    form.setFieldsValue({ details: content });
  };
  /* 提交表单, 执行编辑或者添加 */
  const handleSubmit = async (values: GoodsAddType) => {
    let response;
    if (!editId) {
      response = await addGoods({ ...values, category_id: values.category_id[1] });
    } else {
      response = await updateGoods(editId, { ...values, category_id: values.category_id[1] });
    }

    if (!response.status) {
      message.success(`${type}商品`);
      // 刷新表格数据
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    }
  };

  const onChange = (value: any) => {
    console.log(value);
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
            form={form}
            initialValues={initialValues}
            onFinish={(values: any) => handleSubmit(values)}
          >
            <ProForm.Item
              name="category_id"
              label="分类"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Cascader
                fieldNames={{ label: 'name', value: 'id' }}
                options={options}
                onChange={(values: any) => onChange(values)}
                placeholder="请选择分类"
              />
            </ProForm.Item>
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
            <ProFormText name="cover" hidden={true} />
            <ProForm.Item
              label="商品主图"
              name="cover"
              rules={[{ required: true, message: '请上传图片' }]}
            >
              <div>
                <AliyunOSSUpload accept={'image/*'} setCoverKey={setCoverKey}>
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </AliyunOSSUpload>
                {initialValues?.cover_url && <Image width={200} src={initialValues.cover_url} />}
              </div>
            </ProForm.Item>

            <ProForm.Item
              label="商品详情"
              name="details"
              rules={[{ required: true, message: '请输入详情' }]}
            >
              <Editor setDetails={setDetails} content={initialValues?.details} />
            </ProForm.Item>
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreateOrEdit;
