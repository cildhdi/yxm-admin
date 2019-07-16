const prefix = '/api/admin';

export default {
    count: prefix + '/readlog_count',
    readlogs: prefix + '/readlogs',
    userCount: prefix + '/user_count',
    userInfo: prefix + '/userinfo',
    users: prefix + '/users',
    articles: prefix + '/articles',
    articleCount: prefix + '/article_count',
    publish: prefix + '/publish',
    deleteArticle: prefix + '/delete_article'
}