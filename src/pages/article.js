import React from 'react';
import { Table, Button, Modal, Typography } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
import marked from 'marked'
const namespace = 'article';

let renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += 'width="100%"/>';
  return out;
}

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
        return <Button
          onClick={() => {
            this.setState({
              showContent: true,
              content: marked(record.Content, {
                renderer: renderer
              })
            });
          }}
        >预览</Button>;
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
      <Modal
        title="文章预览 (因解析库差异，不保证与微信小程序端显示一致)"
        visible={this.state.showContent}
        maskClosable={true}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div id='content' dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </Modal>
    </div>);
  }
}

export default Article;