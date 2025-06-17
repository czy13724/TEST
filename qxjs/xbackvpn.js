#!name=FoodiePro解锁
#!desc=FoodiePro解锁
[Script]
FoodiePro解锁 = type=http-response,pattern=^https:\/\/purchase-foodie-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status,requires-body=1,script-path=https://raw.githubusercontent.com/czy13724/TEST/main/qxjs/test.js,script-update-interval=0,engine=webview

[mitm]
hostname = purchase-foodie-api.snow.me