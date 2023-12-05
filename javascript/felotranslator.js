/*
[rewrite_local]
https://translator.felo.me/api/plan/current url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/javascript/felotranslator.js

[mitm]
hostname = translator.felo.me
*/

var Q = {
  "status": 200,
  "data": {
    "active_time": "2023-12-05T00:56:04+0000",
    "expire_time": "2099-12-06T00:56:04+0000",
    "now": "2023-12-05T01:08:40+0000",
    "user_product_total": [
      {
        "freeze": 0,
        "total_limit": "UNLIMITED",
        "deduction_type": "DURATIONS",
        "user_id": "1731839812985470978",
        "product_item_type": "TRANSLATOR_BENEFIT",
        "total": 0,
        "balance": 0,
        "user_product_total_id": "1731839819249618945"
      }
    ],
    "pro": true,
  },
  "code": "OK"
};
    Q.data.user.lifetime_subscription = true;
    Q.data.user.store_subscription = true;
    Q.data.user.subscription = true;

$done({ body: JSON.stringify(Q) });
