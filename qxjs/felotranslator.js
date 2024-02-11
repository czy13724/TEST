/*
[rewrite_local]
https://translator.felo.me/api/plan/current url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/javascript/felotranslator.js

[mitm]
hostname = translator.felo.me
*/

let obj = JSON.parse($response.body);
    
   
    obj.data.expire_time = "2099-12-06T00:56:04+0000";  

    obj.data.pro = true;  

    $done({
        body: JSON.stringify(obj)
    });

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit

// Adding a dummy change to trigger git commit
