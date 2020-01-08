import axios from 'axios';




export default function ajax(url, data){
    return new Promise ((resolve, reject) => {
        axios.post(url, data).then(response => {
            const apiResult = response.data;
            // 只有为 0 时代表 API 接口正常
            if (apiResult.code == 0) {
                resolve(apiResult);
            } else {
                // 可以对 API 错误代码转换处理
                reject({
                    code: apiResult.code,
                    msg: apiResult.msg
                });
            }
        }).catch(error => {
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
            // 网络异常
            reject({
                data: data,
                code: code,
                msg: '服务异常，请稍后重试'
            });
        });
    });
}
