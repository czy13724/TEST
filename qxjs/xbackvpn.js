#!name=FoodiePro解锁
#!desc=FoodiePro解锁
[Script]
FoodiePro解锁 = type=http-response, pattern=^https:\/\/purchase-foodie-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status, requires-body=true, script-path=https://raw.githubusercontent.com/czy13724/TEST/main/qxjs/test.js

[mitm]
hostname = purchase-foodie-api.snow.me