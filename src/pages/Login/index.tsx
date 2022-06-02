import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: any;
  submitting?: boolean;
};

const Login: React.FC<LoginProps> = (props) => {
  // useEffect(() => {
  //   // 如果已经登录，则直接去首页
  //   const userInfo = localStorage.getItem('userInfo');
  //   if (userInfo) history.replace('/');
  // }, []);

  const { submitting } = props;

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey="account">
          <Tabs.TabPane key="account" tab={'账号秘密登录'} />
        </Tabs>

        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'邮箱: xyf0602@a.com'}
          rules={[
            {
              required: true,
              message: '请输入邮箱',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'Password: 123123'}
          rules={[
            {
              required: true,
              message: 'Please enter password！',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
