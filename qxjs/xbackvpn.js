/*
项目名称：XbackVPN
项目作者：David&Levi
下载地址：https://apps.apple.com/app/id1659638467
使用说明：必须创建一个免费账号，不建议使用appleid注册。
使用声明：⚠️仅供参考，🈲️转载与售卖！


[rewrite_local]

^https:\/\/client-alphant\.xback\.io\/alphant\/api\/member\/getInfo\?.*$ url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/qxjs/xbackvpn.js

[mitm]
hostname = client-alphant.xback.io
*/


// 设置通用数据结构
const modifiedBody = {
    "code": "SUCCESS",
    "success": true,
    "data": {
        "expireUnix": 4000103307,
        "appleSub": "apple_pay",
        "id": "4",
        "productNo": "com.xback.subscription.1year",
        "limited_offer": false,
        "duration": 366,
        "type": "yearly",
        "isEnable": true,
        "desc": "Yearly",
        "vipNo": "1",
        "duration": 99999999,
        "paypalSub": "",
        "isPaySinceRegister": true,
        "newToken": ""  
    },
    "msg": "success",
    "requestId": "2f2bfc10df558190db386c141b24d1a1"
};

// 兼容各个平台的通用方法来处理请求和响应
function handleResponse(request, response) {
    const url = request.url;
    const baseUrl = 'https://client-alphant.xback.io/alphant/api/member/getInfo';

    if (url === baseUrl) {
        if (request.headers && request.headers["x-token"]) {
            modifiedBody.data.newToken = request.headers["x-token"];
        }
        response.body = JSON.stringify(modifiedBody);
    }
    return response;
}

// Quantumult X 兼容
if (typeof $response !== "undefined") {
    $done(handleResponse($request, $response));
}

// Surge & Loon 兼容
if (typeof $done !== "undefined") {
    $httpClient.get($request, function(error, response, data) {
        if (error) {
            console.log(error);
            $done({});
        } else {
            $done(handleResponse($request, response, data));
        }
    });
}

// Shadowrocket 兼容
if (typeof $httpClient !== "undefined" && typeof $request === "undefined") {
    $httpClient.get($request, function(error, response, data) {
        $done(handleResponse($request, {headers: response.headers, body: data}));
    });
}

// Stash 兼容性未知，可能需要其他方法

// Adding a dummy change to trigger git commit
