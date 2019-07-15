import urls from '../urls'
import { message } from 'antd'

export default {
    namespace: 'article',
    state: {
        articles: []
    },
    effects: {
        *queryArticle({ payload }, { call, put }) {
            const hide = message.loading("加载数据中");
            let res = yield call(fetch, urls.articles, {
                method: 'post'
            });
            if (res.ok) {
                let rj = yield res.json();
                if (rj.code === 0) {
                    yield put({
                        type: 'setArticles',
                        payload: rj.data
                    });
                }
            }
            hide();
        }
    },
    reducers: {
        setArticles(state, { payload: articles }) {
            return {
                ...state,
                articles: articles
            }
        }
    }
}