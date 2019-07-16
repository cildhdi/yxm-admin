import React from 'react';
import { Table, Button, Modal, Typography, Divider } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
import Preview from '../components/preview'
const namespace = 'article';

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
        type: `${namespace}/queryArticle`,
      });
    },
    deleteArticle: (id) => {
      dispatch({
        type: `${namespace}/deleteArticle`,
        payload: id
      });
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Article extends React.Component {
  componentDidMount() {
    this.props.onInit();
  }

  state = {
    showContent: false,
    content: ''
  }

  columns = [
    {
      title: '可阅读日期',
      key: 'Time',
      render: (text, record) => {
        return <span>{record.Time.substr(0, 10)}</span>;
      }
    },
    {
      title: '发布时间',
      key: 'CreatedAt',
      render: (text, record) => {
        return <span>{moment(record.CreatedAt).toLocaleString()}</span>;
      }
    },
    {
      title: '原始内容',
      key: 'Content',
      render: (text, record) => {
        return <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ width: 400 }}>
          {record.Content}
        </Typography.Paragraph>;
      }
    },
    {
      title: '操作',
      key: 'Action',
      render: (text, record) => {
        return <div>
          <Button
            onClick={() => {
              this.setState({
                showContent: true,
                content: record.Content
              });
            }}
          >预览</Button>
          <Divider type='vertical' />
          <Button type='danger' onClick={() => {
            Modal.confirm({
              title: '确定删除这篇文章吗？',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk: () => {
                this.props.deleteArticle(record.ID);
              }
            });
          }}>删除</Button>
        </div>;
      }
    }
  ];

  handleCancel = () => {
    this.setState({
      showContent: false
    });
  }

  render() {
    return (<div>
      <Table dataSource={this.props.articles} columns={this.columns} rowKey='ID' />
      <Preview visible={this.state.showContent} onCancel={this.handleCancel} content={this.state.content} />
    </div>);
  }
}

export default Article;