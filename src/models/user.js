import urls from '../urls'
import request from '../util'
import { message } from 'antd'

export default {
    namespace: 'user',
    state: {
        users: []
    },
    effects: {
        *queryUsers({ payload }, { call, put }) {
            const hide = message.loading("加载数据中");
            let res = yield call(request, urls.users, {
                method: 'post'
            });
            if (res.ok) {
                let rj = yield res.json();
                if (rj.code === 0) {
                    yield put({
                        type: 'setUsers',
                        payload: rj.data
                    });
                }
            }
            hide();
        }
    },
    reducers: {
        setUsers(state, { payload: users }) {
            return {
                ...state,
                users: users
            }
        }
    }
}