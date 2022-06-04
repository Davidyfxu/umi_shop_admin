import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fetchDashboard } from '@/services/dashboard';

interface DataBoardType {
  goods_count: number;
  order_count: number;
  users_count: number;
}

const DashBoard: React.FC<any> = () => {
  const [data, setData] = useState<DataBoardType>({} as DataBoardType);
  useEffect(() => {
    // 发送请求，获取统计数据
    fetchDashboard().then((r) => setData(r));
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={data.users_count}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={data.goods_count}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={data.order_count}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
