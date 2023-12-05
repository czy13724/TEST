
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://translator.felo.me/api/plan/current`;
const method = `GET`;
const headers = {
  'deviceId': `EBFFBD3C-125B-4CD4-99C1-C6E8255617AC`,
  'Cookie': `fid=87e254b9-d843-4378-914e-f113569c7924`,
  'Connection': `keep-alive`,
  'Content-Type': `application/json`,
  'Accept': `*/*`,
  'Host': `translator.felo.me`,
  'Accept-Encoding': `gzip, deflate, br`,
  'Authorization': `x9_f9f7b1102d5f43189cdfb3e04eee2051__`,
  'Accept-Language': `en-US,en;q=0.9`,
  'User-Agent': `FeloTranslator/55 CFNetwork/1410.0.3 Darwin/22.6.0`
};
const body = ``;

const myRequest = {
  url: url,
  method: method,
  headers: headers,
  body: body
};

$task.fetch(myRequest).then(response => {
  console.log(response.statusCode + "\n\n" + response.body);

  // Your second code snippet logic
  var Q = JSON.parse(response.body);
  Q = {
    "status": 200,
    "data": {
      "active_time": "2023-12-05T00:56:04+0000",
      "expire_time": "2099-12-06T00:56:04+0000",
      "now": "2023-12-05T01:08:33+0000",
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
      "pro": true
    },
    "code": "OK"
  };

  console.log(response.statusCode + "\n\n" + JSON.stringify(Q));
  $done();

}, reason => {
  console.log(reason.error);
  $done();
});
