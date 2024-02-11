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


// 定义修改后的响应体
const modifiedResponse = {
  "code": "SUCCESS",
  "success": true,
  "data": {
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
            "newToken": "{x-token-placeholder}", 
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

// 根据环境替换占位符并设置响应体
if (typeof $response !== "undefined") {

    if ($request.headers.hasOwnProperty('x-token')) {
        modifiedResponse.data.newToken = $request.headers['x-token'];
    }
    $done({ body: JSON.stringify(modifiedResponse) });
} else if (typeof $done !== "undefined") {

    $done({ body: JSON.stringify(modifiedResponse) });
} else {
    console.log("Unsupported environment");
    $done({});
}
