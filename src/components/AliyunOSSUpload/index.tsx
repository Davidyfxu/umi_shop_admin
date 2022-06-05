import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { ossConfig } from '@/services/common';
import { FileType } from '@/pages/types';

export interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

export interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

export interface OSSTokenType {
  accessid: string;
  host: string;
  policy: string;
  signature: string;
  expire: number;
  callback: string;
  'callback-var': any[];
  dir: string;
}

const AliyunOSSUpload: React.FC<any> = (props: any) => {
  const { value, accept, setCoverKey = null, showUploadList, insertImage = null } = props;
  const [OSSData, setOSSData] = useState<OSSTokenType>();

  /* 初始化，获取OSS上传签名 */
  const init = async () => {
    try {
      const result = await ossConfig();
      setOSSData(result);
    } catch (error) {
      // @ts-ignore
      message.error(error);
    }
  };
  // 初始化，获取OSS上传签名
  useEffect(() => {
    init();
  }, []);

  /* 文件上传过程中出发的回调函数，直到上传完成 */
  const handleChange = ({ file }: { file: FileType }) => {
    if (file.status === 'done') {
      // 上传成功后, 把文件的key, 设置为表单某个字段的值
      if (setCoverKey) {
        setCoverKey(file.key);
      }
      // 上传完成后，如果需要url，那么返回url给父组件
      if (insertImage) {
        insertImage(file.url);
      }
      message.success('上传成功');
    }
  };

  /* 额外的上传参数 */
  const getExtraData = (file: any) => ({
    key: file.key,
    OSSAccessKeyId: OSSData?.accessid,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });
  /* 选择文件上传前的回调 */
  const beforeUpload = async (file: any) => {
    if (!OSSData) return false;
    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const dir = 'react/'; // 定义上传目录
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // 云存储中存储文件的key
    file.key = OSSData.dir + dir + filename;
    // 上传完成后显示内容
    file.url = OSSData.host + file.key;
    return file;
  };

  const uploadProps = {
    name: 'file',
    accept: accept || '',
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    data: getExtraData,
    beforeUpload,
    listType: 'picture',
    maxCount: 1,
    showUploadList,
  };
  return <Upload {...uploadProps}>{props.children}</Upload>;
};

export default AliyunOSSUpload;
