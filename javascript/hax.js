/*
[rewrite_local]
https://translator.felo.me/api/plan/current url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/javascript/hax.js

[mitm]
hostname = translator.felo.me
*/

let obj = JSON.parse($response.body);
    
   
    //obj.data.username = "我是叼毛安妮";  

    obj.data.pro = true;  

    $done({
        body: JSON.stringify(obj)
    });
// Adding a dummy sgmodule commit(19)
