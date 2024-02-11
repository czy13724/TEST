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
let modifiedBody = {
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
        "newToken": "your_modified_token", // 这里应用自己生成的token或逻辑
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

// 用于在不同工具下完成操作的函数
function done(responseBody) {
    if (typeof $done !== 'undefined') {
        // Quantumult X 和 Surge
        $done({ body: JSON.stringify(responseBody) });
    } else if (typeof $task !== 'undefined') {
        // Surge（带有Task API）、Loon、Shadowrocket
        $task.fetch({ body: JSON.stringify(responseBody) });
    } else if (typeof $httpClient !== 'undefined') {
        // Shadowrocket
        $httpClient.post({ body: JSON.stringify(responseBody) }, (error, response, body) => {});
    } else {
        // Stash（目前暂未支持）
        console.log("Platform not supported");
    }
}

// 针对不同平台判断和处理请求和响应
if (typeof $request !== 'undefined' && $request.url === 'https://client-alphant.xback.io/alphant/api/member/getInfo') {
    // 这里可以添加逻辑判断是否包含查询字符串
    if ($request.url.indexOf('?') === -1) {
        done(modifiedBody);
    }
    else {
        done($response.body); // 或者返回原始响应
    }
} else {
    // 如果不是需要处理的请求，返回原始响应
    done($response.body);
}
