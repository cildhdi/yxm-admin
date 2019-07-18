import React from 'react';
import { Button, Form, DatePicker, Input, Divider } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
import Preview from '../components/preview'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const namespace = 'publish';

const mapStateToProps = (state) => {
    const props = state[namespace];
    return {
        ...props
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        publish: (article) => {
            dispatch({
                type: `${namespace}/publishArticle`,
                payload: article
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class Publish extends React.Component {
    state = {
        time: moment(),
        content: '',
        showContent: false
    }

    handlePreview = () => {
        this.setState({
            showContent: true
        });
    }

    handleCancel = () => {
        this.setState({
            showContent: false
        });
    }

    dateChange = date => {
        if (date === null) {
            return;
        }
        this.setState({
            time: date
        });
    }

    contentChange = (e) => {
        this.setState({
            content: e.target.value
        });
    }

    handlePublish = () => {
        this.props.publish(this.state);
    }

    render() {
        return (<div style={{ width: '100%' }}>
            <Form {...formItemLayout}>
                <Form.Item label="文章可见日期">
                    <DatePicker onChange={this.dateChange} value={this.state.time} />
                </Form.Item>
                <Form.Item label="文章内容">
                    <Input.TextArea onChange={this.contentChange} value={this.state.content} rows={15} />
                </Form.Item>
                <center>
                    <Button onClick={this.handlePreview} style={{ width: 100 }}>预览</Button>
                    <Divider type='vertical' />
                    <Button type='primary' style={{ width: 100 }} onClick={this.handlePublish}>发布</Button>
                </center>
            </Form>
            <Preview visible={this.state.showContent} onCancel={this.handleCancel} content={this.state.content} />
        </div>);
    }
}

export default Publish;