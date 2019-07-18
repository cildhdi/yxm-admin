//以后可能修改请求参数

export default async function request(url, opts) {
    return await fetch(url, opts);
}