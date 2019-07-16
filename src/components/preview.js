import React from 'react'
import marked from 'marked'
import { Modal } from 'antd'

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

export default class Preview extends React.Component {
    render() {
        return <Modal
            title="文章预览 (因解析库差异，不保证与微信小程序端显示一致)"
            visible={this.props.visible}
            maskClosable={true}
            onCancel={this.props.onCancel}
            footer={null}
        >
            <div id='content' dangerouslySetInnerHTML={{
                __html: marked(this.props.content, {
                    renderer: renderer
                })
            }} />
        </Modal>;
    }
}