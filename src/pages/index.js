import React from 'react';
import { Statistic, Card, Row, Col, DatePicker, Divider } from 'antd'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import { connect } from 'dva'
import moment from 'moment';
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

  scale = {
    count: {
      type: 'linear',
      alias: '打卡数',
      min: 0,
    },
    date: {
      type: 'timeCat',
      alias: '日期'
    }
  }

  render() {
    return (<div>
      <Row gutter={16}>
        <Col span={4}>
          <Card>
            <Statistic
              title="一天内打卡"
              value={this.props.todayCount}
              valueStyle={this.props.todayCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="一周内打卡"
              value={this.props.weekCount}
              valueStyle={this.props.weekCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="一月内打卡"
              value={this.props.monthCount}
              valueStyle={this.props.monthCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总打卡"
              value={this.props.allCount}
              valueStyle={this.props.allCount === 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="文章数量"
              value={this.props.articleCount}
              suffix="篇"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="用户数量"
              value={this.props.userCount}
              suffix="人"
            />
          </Card>
        </Col>
      </Row>
      <Divider type='horizontal' />
      <div style={{ marginTop: 20, marginBottom: 50, backgroundColor: '#fff', padding: 20 }}>
        <DatePicker.RangePicker onChange={this.dateChange} value={this.props.range.map(v => {
          return moment(v, 'YYYY-MM-DD');
        })} />
        <Divider type='vertical' />
        <span>该区间记录数： {this.props.readlogs.length}</span>
        <div style={{ height: 20 }} />
        <Chart
          data={this.props.chartData}
          padding={"auto"}
          forceFit
          scale={this.scale}
          height={400}
        >
          <Tooltip crosshairs />
          <Axis name="date" title />
          <Axis name="count" title />
          <Legend />
          <Geom type="area" position="date*count" color="type" shape="smooth" />
        </Chart>
      </div>
    </div>);
  }
}

export default Analysis;