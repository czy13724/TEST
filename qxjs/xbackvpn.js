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
let body = $response.body;
let url = $request.url;
const path = "/alphant/api/member/getInfo";

if (url.indexOf(path) != -1) {
    // 检测到获取会员信息的请求
    let obj = JSON.parse(body);
    obj.data["expireUnix"] = 4000103307;
    obj.data["appleSub"] = "apple_pay";
    obj.data["id"] = "4";
    obj.data["productNo"] = "com.xback.subscription.1year";
    obj.data["limited_offer"] = false;
    obj.data["duration"] = 366;
    obj.data["type"] = "yearly";
    // 从请求头中提取newToken，并替换响应内容的newToken值
    obj.data["newToken"] = $request.headers["x-token"];
    obj.data["isEnable"] = true;
    obj.data["desc"] = "Yearly";
    obj.data["vipNo"] = "1";
    obj.data["duration"] = 99999999; 
    obj.data["paypalSub"] = "";
    obj.data["isPaySinceRegister"] = true;
    
    // 将修改后的对象转换回JSON字符串作为响应体
    body = JSON.stringify(obj);  
}

// 用修改后的响应体完成请求
$done({body});

// Adding a dummy change to trigger git commit
