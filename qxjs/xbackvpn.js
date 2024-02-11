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
// 定义一个获取 newToken 的通用函数
function getNewToken() {
  // 尝试通过 BoxJS 获取 xbackvpn_newtoken
  let newToken = null;
  
  // BoxJS 的持久化存储
  if ($persistentStore) {
    newToken = $persistentStore.read("xbackvpn_newtoken");
  }
  
  // 如果在 Quantumult X 环境中,使用其特定的API
  if (!newToken && $prefs) {
    newToken = $prefs.valueForKey("xbackvpn_newtoken");
  }
  
  // 如果请求头里面有 x-token
  if (!newToken && $request && $request.headers["x-token"]) {
    newToken = $request.headers["x-token"];
  }

  return newToken || "default_token"; // 如果 newToken 不存在，可以返回一个默认值
}

// 定义修改响应体的函数
function modifyResponse(body) {
  let obj = JSON.parse(body);
  
  // 获取 dynamic newToken
  obj.data.newToken = getNewToken();
  
  // 下面是响应体结构
  obj.code = "SUCCESS";
  obj.success = true;
  obj.data.expireUnix = 4000103307;
  obj.data.appleSub = "apple_pay";
  obj.data.id = "4";
  obj.data.productNo = "com.xback.subscription.1year";
  obj.data.limited_offer = false;
  obj.data.duration = 366;
  obj.data.type = "yearly";
  obj.data.isEnable = true;
  obj.data.desc = "Yearly";
  obj.data.vipNo = "1";
  obj.data.duration = 99999999;
  obj.data.paypalSub = "";
  obj.data.isPaySinceRegister = true;
  obj.msg = "success";
  obj.requestId = "2f2bfc10df558190db386c141b24d1a1";
  
  return JSON.stringify(obj);
}

// 各软件的通用结束处理函数
function complete(body) {
  if ($done) {
    $done({ body });
  } else {
    // Shadowrocket / 其他环境中
    // 需要将此脚本的执行结果返回给请求响应处理的地方
    return { response: { body } };
  }
}

// 主逻辑入口，判断 URL 是否要修改响应体
if ($request && $request.url.indexOf('https://client-alphant.xback.io/alphant/api/member/getInfo') !== -1) {
  let modifiedBody = modifyResponse($response.body);
  complete(modifiedBody);
} else {
  // 不是目标 URL 或没有请求信息，则直接返回原始响应数据
  complete($response.body);
}

// Adding a dummy change to trigger git commit
