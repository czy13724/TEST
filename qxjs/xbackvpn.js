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
// 自定义响应体
const customResponseBody = {
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
        "newToken": "", 
        "isEnable": true,
        "desc": "Yearly",
        "vipNo": "1",
        "duration": 99999999,
        "paypalSub": "",
        "isPaySinceRegister": true
    },
    "msg": "success",
    "requestId": "2f2bfc10df558190db386c141b24d1a1"
};

// 检查我们是否能获取请求的headers，如果能的话，提取 'x-token'
if ($request && $request.headers && $request.headers['x-token']) {
    customResponseBody.data.newToken = $request.headers['x-token'];
}

// 根据运行环境返回修改后的响应体
let bodyString = JSON.stringify(customResponseBody);

// Quantumult X
if (typeof $done !== "undefined") {
    $done({body: bodyString});
}

// Surge & Loon
else if (typeof $httpClient !== "undefined" && typeof $response !== "undefined") {
    $done({response: {body: bodyString}});
}

// Shadowrocket
else if (typeof $rocket !== "undefined") {
    $done({body: bodyString});
}

// Stash 或其他未知的代理软件处理
else if (typeof $task !== "undefined") {
    $done({response: {body: bodyString}});
}

// 如果不在以上任何代理工具中运行，则不支持
else {
    console.log("This script does not support the current platform.");
}

// Adding a dummy change to trigger git commit
