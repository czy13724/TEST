/*
translator
功能未测试 无效果 弃用
2024.01.08

[rewrite_local]
http://www\.xslm333\.xyz/index\.php\?s=/api/xuser/getUserInfo url script-response-body translator.js

[Mitm]
hostname = www.xslm333.xyz
*/

let Levi = JSON.parse($response.body);
Levi.data.status = 1;
Levi.data.is_long = 1;
Levi.data.filings_nums = 1;
$done({body: JSON.stringify(Levi)});
// Adding a dummy sgmodule commit(15)
