/*
[rewrite_local]
https://translator.felo.me/api/plan/current url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/javascript/felotranslator.js

[mitm]
hostname = translator.felo.me
*/

/*
[rewrite_local]
^https:\/\/translator\.felo\.me\/api\/plan\/current$ url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/javascript/felotranslator.js

[mitm]
hostname = translator.felo.me
*/
var Q = JSON.parse(response.body);
    Q.data.lifetime_subscription = true;
    Q.data.store_subscription = true;
    Q.data.subscription = true;
    $done({ body: JSON.stringify(Q) });

