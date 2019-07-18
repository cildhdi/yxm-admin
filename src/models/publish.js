import urls from '../urls'
import request from '../util'
import { message } from 'antd'

export default {
    namespace: 'publish',
    state: {
    },
    effects: {
        *publishArticle({ payload }, { call, put }) {
            const hide = message.loading("发布中");
            const { time, content } = payload;
            let res = yield call(request, urls.publish, {
                method: 'post',
                body: JSON.stringify({
                    time: parseInt(time.unix()),
                    content: content
                })
            });
            if (!res.ok) {
                message.error("发布失败，请重试");
            } else {
                message.success("发布成功");
            }
            hide();
        }
    },
    reducers: {

    }
}