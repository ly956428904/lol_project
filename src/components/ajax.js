import axios from 'axios';
// 参数长度头名称
const PARAM_LENGTH_HEADER_NAME = 'X-Param-Length';
const ajaxOptins = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest'
    },

    // 参数简单加密处理
    transformRequest: function (data, headers) {
        // 参数处理
        const txt = typeof data === 'string' ? data : JSON.stringify(data);
        headers[PARAM_LENGTH_HEADER_NAME] = txt.length;

        console.log('Send Ajax Data: ', txt);

        return (new Buffer(txt)).toString('base64');
    },

    // 响应成功后数据处理
    transformResponse: function (data) {

        // 转换 json 数据
        try {
            return JSON.parse(data);
        } catch (e) {
            return {
                code: 500,
                msg: data
            };
        }
    }
};


/**
 * 统一封装业务请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function ajax(url, data) {
    return new Promise((resolve, reject) => {
        let axiosOptions = ajaxOptins;
        // Ajax提交
        axios.post(url, data, axiosOptions).then(response => {
            const apiResult = response.data;
            // 只有为 0 时代表 API 接口正常
            if (apiResult.code == 0) {
                resolve(apiResult.data || apiResult.result);
            } else if (apiResult.code == 3) {
                // 用户退出
                console.log(3);
            } else if (apiResult.code == 11) {
                // 权限发生变化
                console.log(11);
            } else {
                // 可以对 API 错误代码转换处理
                reject({
                    code: apiResult.code,
                    msg: apiResult.msg
                });
            }
        }).catch(error => {
            // reject(error);
            // 网络超时
            if (error.code == 'ECONNABORTED') {
                reject({
                    data: {},
                    code: -500,
                    msg: '服务请求超时，请稍后重试'
                });
                return;
            }

            let code = error.code || -999999;
            let data = {};

            if (error.response && error.response.data) {
                data = error.response.data; // 可能返回错误信息
            }
            if (data.code) {
                // 优先使用数据中返回的code，可能与http状态码不一致
                code = data.code;
            } else if (error.response && error.response.status) {
                // 数据中没有code则使用http状态码
                code = error.response.status;
            }

            if (code == 403) {
                console.log(403);
            } else {
                // 网络异常
                reject({
                    data: data,
                    code: code,
                    msg: '服务异常，请稍后重试'
                });
            }
        });
    });
}


export default {
 /**
     * 单一业务请求
     * @param serviceName 组件名
     * @param method 方法名
     * @param data 参数
     *
     * @returns {Promise<T>}
     */
    api: (serviceName, method, data)=>{
        return ajax('/', {
            u: serviceName,
            m: method,
            p: data,
            t: Date.now() + '' + Math.random()
        }).then(function(res) {
            return {
                code: res['c'],
                data: res['d'],
                msg: res['e']
            };
        }).then(d=>{
            console.groupCollapsed(`API接口： ${serviceName} -> ${method}`);
            console.log('参数:', data);
            console.log('返回:', JSON.parse(JSON.stringify(d)));
            console.groupEnd();
            return d;
        });
    },
}
