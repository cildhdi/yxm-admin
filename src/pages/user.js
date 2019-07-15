import React from 'react';
import { Table, Button, Modal, List } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
const namespace = 'user';

const mapStateToProps = (state) => {
  const props = state[namespace];
  return {
    ...props
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => {
      dispatch({
        type: `${namespace}/queryUsers`,
      });
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class User extends React.Component {
  componentDidMount() {
    this.props.onInit();
  }

  columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '学号',
      dataIndex: 'SchoolID',
      key: 'SchoolID',
    },
    {
      title: '注册时间',
      key: 'RegisterTime',
      render: (text, record) => {
        return <span>{moment(record.RegisterTime).toLocaleString()}</span>;
      }
    },
    {
      title: '打卡次数',
      key: 'Readlog',
      render: (text, record) => {
        return <span>{record.Readlogs.length} 次</span>;
      }
    },
    {
      title: '操作',
      key: 'Action',
      render: (text, record) => {
        return <Button
          onClick={() => {
            Modal.info({
              title: record.Name + '(' + record.SchoolID + ') 的打卡记录',
              content: (<List style={{ marginTop: 20, marginBottom: 20 }}
                bordered
                dataSource={record.Readlogs}
                renderItem={item => (
                  <List.Item>
                    {item.Time}
                  </List.Item>
                )}
              />)
            });
          }}
        >查看打卡记录</Button>;
      }
    }
  ];

  render() {
    return (<div>
      <Table dataSource={this.props.users} columns={this.columns} rowKey='ID' />
    </div>);
  }
}

export default User;