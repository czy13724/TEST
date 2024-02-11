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

// 提取 URL 中的查询参数
const url = $request.url;
const reqUrl = new URL(url);
const deviceCode = reqUrl.searchParams.get("deviceCode");

// BoxJS 配置的 key 名称
const BOXJS_KEY = "xbackvpn_newToken";

if (deviceCode) {
    // 长链接，提取 token 并保存到 BoxJS
    const response = JSON.parse($response.body);

    if (response.data && response.data.newToken) {
        // 使用 BoxJS 或者相关持久化存储 API 保存 newToken
        $persistentStore.write(response.data.newToken, BOXJS_KEY);
        console.log("New token saved: " + response.data.newToken);
    }

    $done({ body: JSON.stringify(response) });
} else {
    // 当 URL 不包含 `deviceCode`，从 BoxJS 获取之前保存的token
    let storedToken = $persistentStore.read(BOXJS_KEY);

    if (storedToken) {
        // 替换 newToken
        response.data.newToken = storedToken;

        // 确保响应体中的其他属性也被正确设置
        response.data.expireUnix = 4000103307;
        response.data.appleSub = "apple_pay";
        response.data.id = "4";
        response.data.productNo = "com.xback.subscription.1year";
        response.data.limited_offer = false;
        response.data.duration = 99999999; 
        response.data.type = "yearly";
        response.data.isEnable = true;
        response.data.desc = "Yearly";
        response.data.vipNo = "1";
        response.data.paypalSub = "";
        response.data.isPaySinceRegister = true;
    }
}

$done({ body: JSON.stringify(response) });
