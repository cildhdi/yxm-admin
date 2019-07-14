import React from 'react';
import { Statistic, Card, Row, Col, Icon, DatePicker, Divider } from 'antd'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './index.css';
import { connect } from 'dva'
import moment from 'moment';
const oneDay = 24 * 60 * 60;
const namespace = 'analysis';

const mapStateToProps = (state) => {
  const props = state[namespace];
  let readlogs = [];
  props.readlogs.forEach((v) => {
    if (readlogs.length === 0 || !v.Time.startsWith(readlogs[readlogs.length - 1].date)) {
      readlogs.push({
        date: v.Time.substr(0, 10),
        count: 1
      });
    } else {
      readlogs[readlogs.length - 1].count++;
    }
  });
  return {
    ...props,
    chartData: readlogs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => {
      dispatch({
        type: `${namespace}/queryCounts`,
      });
    },
    dateChange: (dates) => {
      dispatch({
        type: `${namespace}/queryReadlogs`,
        payload: {
          range: dates
        }
      });
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Analysis extends React.Component {
  componentDidMount() {
    this.props.onInit();
    this.props.dateChange(['2019-06-01', (new Date()).toISOString().substr(0, 10)]);
  }

  dateChange = (dates, dateStrings) => {
    if (dateStrings[0].length === 0) {
      return;
    }
    this.props.dateChange(dateStrings.map(v => v.substr(0, 10)));
  }

  render() {
    return (<div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="一天内打卡"
              value={this.props.todayCount}
              valueStyle={this.props.todayCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="一周内打卡"
              value={this.props.weekCount}
              valueStyle={this.props.weekCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="一月内打卡"
              value={this.props.monthCount}
              valueStyle={this.props.monthCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户数量"
              value={45}
              suffix="人"
            />
          </Card>
        </Col>
      </Row>
      <Divider type='horizontal' />
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <DatePicker.RangePicker onChange={this.dateChange} value={this.props.range.map(v => {
          return moment(v, 'YYYY-MM-DD');
        })} />
        <Divider type='vertical' />
        <span>该区间记录数： {this.props.readlogs.length}</span>
      </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={this.props.chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
    </div>);
  }
}

export default Analysis;