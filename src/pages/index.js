import React from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd'
import styles from './index.css';
import { connect } from 'dva'

const mapStateToProps = (state) => {
  const cardList = state['analysis'];
  return {
    cardList,
  };
};

export default function () {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日打卡"
              value={12}
              valueStyle={{ color: '#3f8600' }}
              prefix={<Icon type="arrow-up" />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本周打卡"
              value={45}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-down" />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本周打卡"
              value={45}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-down" />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本周打卡"
              value={45}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="arrow-down" />}
              suffix="人"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
