/*
项目名称：XbackVPN
项目作者：David&Levi
下载地址：https://apps.apple.com/app/id1659638467
使用说明：必须创建一个免费账号，不建议使用appleid注册。
使用声明：⚠️仅供参考，🈲️转载与售卖！


[rewrite_local]

^https:\/\/client-alphant\.xback\.io\/alphant\/api\/member\/getInfo$ url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/qxjs/xbackvpn.js

[mitm]
hostname = client-alphant.xback.io
*/

let body = JSON.parse($response.body);
let url = $request.url;
const BoxJSData = $persistentStore.read("XbackVPN_newToken");

if (url.indexOf('?') !== -1 && body.data && body.data.newToken) {
    // 长链接含有查询参数，提供新的token
    $persistentStore.write(body.data.newToken, "XbackVPN_newToken");
    console.log("New token saved: " + body.data.newToken);
} else if (url.indexOf('?') === -1 && BoxJSData) {
    // 短链接没有查询参数，使用boxjs的token
    body.data.newToken = BoxJSData;
    console.log("Token replaced: " + BoxJSData);
}

// 确保其他字段也被包含在修改的响应体中
body.data.expireUnix = 4000103307;
body.data.appleSub = "apple_pay";
body.data.id = "4";
body.data.productNo = "com.xback.subscription.1year";
body.data.limited_offer = false;
body.data.duration = 366; 
body.data.type = "yearly";
body.data.isEnable = true;
body.data.desc = "Yearly";
body.data.vipNo = "1";
body.data.duration = 99999999; 
body.data.paypalSub = "";
body.data.isPaySinceRegister = true;

$done({body: JSON.stringify(body)});
