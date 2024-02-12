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
// 提取newToken并保存到BoxJS
function extractAndSaveToken(body) {
    if (body.data && body.data.newToken) {
        const newToken = body.data.newToken;
        
        // 这里发送一个HTTP请求到BoxJS的存储API来保存token
        const boxjsSaveApi = `http://boxjs.com/save?app.xbackvpn.token=${encodeURIComponent(newToken)}`;
        $http.get(boxjsSaveApi, function(error, response, data) {
            if (error) {
                console.error(`保存到BoxJS出错: ${error}`);
            } else {
                $notify("XbackVPN", "Token 已更新", `新的Token已保存至BoxJS: ${newToken}`);
            }
        });
    }
}

// 从BoxJS获取保存的newToken
function fetchTokenFromBoxJs(callback) {
    const boxjsQueryApi = "http://boxjs.com/query?app.xbackvpn.token";
    $http.get(boxjsQueryApi, function(error, response, data) {
        if (error) {
            console.error(`不能从BoxJS获取Token: ${error}`);
            callback(null);
        } else {
            try {
                const result = JSON.parse(data);
                const token = result['app.xbackvpn.token'];
                callback(token);
            } catch (e) {
                console.error("Error parsing BoxJS response:", e);
                callback(null);
            }
        }
    });
}

// 主函数处理响应
function handleResponse(url, body) {
    const isQueryPresent = url.includes('?');

    if (isQueryPresent) {
        // 长链接，保存newToken到BoxJS
        extractAndSaveToken(body);
    } else {
        // 短链接，尝试替换newToken
        fetchTokenFromBoxJs(function(storedToken) {
            if (storedToken) {
                body.data.newToken = storedToken;
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
        });
    }

    return JSON.stringify(body);
}

const url = $request.url;
const body = JSON.parse($response.body);

const resultBody = handleResponse(url, body);

// 结束脚本，返回修改后的响应体
$done({body: resultBody});
// Adding a dummy sgmodule commit(20)
