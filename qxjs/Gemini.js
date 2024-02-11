/*
项目名称： Gemini
项目作者： Levi
下载地址： https://apps.apple.com/app/id1277110040
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]


^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/czy13724/TEST/main/qxjs/Gemini.js

[mitm] 

hostname = buy.itunes.apple.com
*/

var Levi = JSON.parse($response.body);
Levi= {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 1277110040,
    "receipt_creation_date": "2024-02-08 03:39:18 Etc\/GMT",
    "bundle_id": "com.macpaw.iosgemini",
    "original_purchase_date": "2024-02-08 00:29:54 Etc\/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1707363557000",
        "expires_date": "2099-03-01 08:34:11 Etc\/GMT",
        "expires_date_pst": "2099-03-01 00:34:11 America\/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "320001715396819",
        "is_trial_period": "true",
        "original_transaction_id": "320001715396819",
        "purchase_date": "2024-02-08 03:39:17 Etc\/GMT",
        "product_id": "com.macpaw.iosgemini.year.trial",
        "original_purchase_date_pst": "2024-02-07 19:39:18 America\/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1707363558000",
        "web_order_line_item_id": "320000799409037",
        "expires_date_ms": "4076008451000",
        "purchase_date_pst": "2024-02-07 19:39:17 America\/Los_Angeles",
        "original_purchase_date": "2024-02-08 03:39:18 Etc\/GMT"
      }
    ],
    "adam_id": 1277110040,
    "receipt_creation_date_pst": "2024-02-07 19:39:18 America\/Los_Angeles",
    "request_date": "2024-02-08 03:39:22 Etc\/GMT",
    "request_date_pst": "2024-02-07 19:39:22 America\/Los_Angeles",
    "version_external_identifier": 862975127,
    "request_date_ms": "1707363562423",
    "original_purchase_date_pst": "2024-02-07 16:29:54 America\/Los_Angeles",
    "application_version": "13401",
    "original_purchase_date_ms": "1707352194000",
    "receipt_creation_date_ms": "1707363558000",
    "original_application_version": "13401",
    "download_id": 503195841036619327
  },
  "pending_renewal_info": [
    {
      "product_id": "com.macpaw.iosgemini.year.trial",
      "original_transaction_id": "320001715396819",
      "auto_renew_product_id": "com.macpaw.iosgemini.year.trial",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1707363557000",
      "expires_date": "2099-03-01 08:34:11 Etc\/GMT",
      "expires_date_pst": "2099-03-01 00:34:11 America\/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "320001715396819",
      "is_trial_period": "true",
      "original_transaction_id": "320001715396819",
      "purchase_date": "2024-02-08 03:39:17 Etc\/GMT",
      "product_id": "com.macpaw.iosgemini.year.trial",
      "original_purchase_date_pst": "2024-02-07 19:39:18 America\/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20443598",
      "original_purchase_date_ms": "1707363558000",
      "web_order_line_item_id": "320000799409037",
      "expires_date_ms": "4076008451000",
      "purchase_date_pst": "2024-02-07 19:39:17 America\/Los_Angeles",
      "original_purchase_date": "2024-02-08 03:39:18 Etc\/GMT"
    }
  ],
  "latest_receipt": "MIIUrwYJKoZIhvcNAQcCoIIUoDCCFJwCAQExDzANBglghkgBZQMEAgEFADCCA+UGCSqGSIb3DQEHAaCCA9YEggPSMYIDzjAKAgEUAgEBBAIMADALAgEZAgEBBAMCAQMwDAIBCgIBAQQEFgI0KzAMAgEOAgEBBAQCAgELMA0CAQsCAQEEBQIDBOsWMA0CAQ0CAQEEBQIDAnNZMA4CAQECAQEEBgIETB8nGDAOAgEJAgEBBAYCBFAzMDIwDgIBEAIBAQQGAgQzb\/SXMA8CAQMCAQEEBwwFMTM0MDEwDwIBEwIBAQQHDAUxMzQwMTASAgEPAgEBBAoCCAb7tfONcQ4\/MBQCAQACAQEEDAwKUHJvZHVjdGlvbjAYAgEEAgECBBDQaM5\/3ZziXHgbUQ2TsjfZMBwCAQUCAQEEFItqUliHzcqQTizcW6UVJDWHrywuMB4CAQICAQEEFgwUY29tLm1hY3Bhdy5pb3NnZW1pbmkwHgIBCAIBAQQWFhQyMDI0LTAyLTA4VDAzOjM5OjE4WjAeAgEMAgEBBBYWFDIwMjQtMDItMDhUMDM6Mzk6MjJaMB4CARICAQEEFhYUMjAyNC0wMi0wOFQwMDoyOTo1NFowUQIBBwIBAQRJb6MzBbp26VC1ZFRIEVAz9PQdrWNU6QUmFzBfn7i8amVnTmK0gjCORQankS4DZhC7E+MOoAcAcZV5V04RMV8ZMyS5dwnbNQn9\/DBTAgEGAgEBBEsnBxe0a\/\/UMXx9FvGtlxzhPcfrmLlUW0ncCfTUk41IcoVdmQNjES4N9vZ3lE6QcknNhwqTAsHw3fwNsGT0Q+mA916BMzjfNRjc9YswggGbAgERAgEBBIIBkTGCAY0wCwICBq0CAQEEAgwAMAsCAgawAgEBBAIWADALAgIGsgIBAQQCDAAwCwICBrMCAQEEAgwAMAsCAga0AgEBBAIMADALAgIGtQIBAQQCDAAwCwICBrYCAQEEAgwAMAwCAgalAgEBBAMCAQEwDAICBqsCAQEEAwIBAzAMAgIGsQIBAQQDAgEBMAwCAga3AgEBBAMCAQAwDAICBroCAQEEAwIBADAPAgIGrgIBAQQGAgRRJwrzMBICAgavAgEBBAkCBwEjCf36A40wGgICBqcCAQEEEQwPMzIwMDAxNzE1Mzk2ODE5MBoCAgapAgEBBBEMDzMyMDAwMTcxNTM5NjgxOTAfAgIGqAIBAQQWFhQyMDI0LTAyLTA4VDAzOjM5OjE3WjAfAgIGqgIBAQQWFhQyMDI0LTAyLTA4VDAzOjM5OjE4WjAfAgIGrAIBAQQWFhQyMDI0LTAyLTExVDAzOjM5OjE3WjAqAgIGpgIBAQQhDB9jb20ubWFjcGF3Lmlvc2dlbWluaS55ZWFyLnRyaWFsoIIO4jCCBcYwggSuoAMCAQICEBXnn85SVQplAXyR3+Tus1kwDQYJKoZIhvcNAQELBQAwdTFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxCzAJBgNVBAsMAkc1MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yMjA5MDIxOTEzNTdaFw0yNDEwMDExOTEzNTZaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8RM4LrWowdq\/ACQw0ehlh770gDfX6Q54T9azzPJMO12WbdMJaNydU8I7NRjqCzHW\/EuALKe5Ya6DnQir3hwCfosypIuZt6A3nyw\/00GRbs7+NY83Cm2KwKdfewKONrRuk+Oto23OGLl\/MuyF9a7g4bqvvIoNIE\/ZEoqRGnOVi7HQ7fzeUonZqiCF7BHyh07Oe4jVtp46PsONl1sgzH06OigPs6b3MH7Wnho4E8JDvuiGObZJicsGJ0Jj+41XJVsY0dP70HppDcGF9fobCed1Qdd0IsOSotXo2fZf8+UkgHecSYqhl2jwWWP4mUY+Reas9W7v5LtM7UgcYMOd\/D5jvAgMBAAGjggI7MIICNzAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFBmLl41KW2F4V\/SlXDUSijkI47B1MHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzUuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNTA1MIIBHwYDVR0gBIIBFjCCARIwggEOBgoqhkiG92NkBQYBMIH\/MDcGCCsGAQUFBwIBFitodHRwczovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJnNS5jcmwwHQYDVR0OBBYEFCLJPHtjE4W+OjvFM6m0+rGwgpMXMA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAPEbuz6g8uP2eg8tR8PaoUfziBx2CJNzukoob6k2o6jtPhzKaOTnbW\/hb2k2NzfsJSguxzZoZb07H\/WhbO9z5V4+TJEqEdI2gJGd3OYI5DY8vfIGBD+3rW\/h1tPzz3pSRvUyFHH3RjmdkSIIGCrBhJMTwUCtWWq7NbsB3gGHPCPKgUeVz+QGRE2cy\/zNxMzswT0swBXwtszlr3yZdr3y5dga5rgsfZVBVAc2hs085cQQxxkh1FSY\/St8q5ILKjhhl6WCwjobi1krUc5kkrU4VTm1FSGvGA7t3NEadR9ekaPcPdEBCN3iEKL4CKwoOjN5WSZpQzQJ5O4zQOqivmRzKgTCCBFUwggM9oAMCAQICFDt+gAru0wKh5uzbl9nKrCic8WmUMA0GCSqGSIb3DQEBCwUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0yMDEyMTYxOTM4NTZaFw0zMDEyMTAwMDAwMDBaMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfXdof+\/q80EsiPMfWJvoX9\/SfHj5kEWaa716+qzS9qiwhbtYelCGFLHTBDhBhqjxjSn5K48h11s\/CnAhIe2q5KbHJZv3IihbRsgQ8grqAbOL\/CnLrrP47b0i+nosRTZV9snuQLwIcTvxJvtdvtU++eMba3rLNydlmETta6QlFc4lQ1E7iaAV+2nWcSwGu2uPPbXRN3lPQ1Ro4gjrQneNdKXuxgeopJwv7YHyGEvvwYk8G50zRH9ltnu1z2nghDZ1w2UZXkF9nhMFzdwqoYmK2rnCGu3Ujia159uak1P2DJjIKOySSWyChnNEvgBib3TwL57X97IBXDxeePyuHJ7v3AgMBAAGjge8wgewwEgYDVR0TAQH\/BAgwBgEB\/wIBADAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjBEBggrBgEFBQcBAQQ4MDYwNAYIKwYBBQUHMAGGKGh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtYXBwbGVyb290Y2EwLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwHQYDVR0OBBYEFBmLl41KW2F4V\/SlXDUSijkI47B1MA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAWsQ1otnmCp5SogCCInfNci+Q+SKvFCXMqgpCYJLCvXUd60zKFeV+a0AQXvtbRXQN8Hp9iJHO3mOLQonSGN9Bs1ieBgiHSN1AryPV7essYOXrpH8c6ZyD1pRfTGI5ik6uE419Q7jcXqy+GEDy5g8sXROT8XtlqMJoSN7\/tJabDPsyNp6eDZVfOAqLltISbLeLC47XPuxvAarOTUVg24RxZmLlGWUwzYr\/RVP7bvuId0PDSGP591Gzcl554lbPvLuEuThaeK4RSFK7DTWLlN7MdJpo9UlglKzyqLMVhpDQzDBDhtPlcAJRtIHAqJfU6uqwjAlA7ziTss0iA+tnQ2XIRTCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAbUwggGxAgEBMIGJMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMCEBXnn85SVQplAXyR3+Tus1kwDQYJYIZIAWUDBAIBBQAwDQYJKoZIhvcNAQEBBQAEggEAPgJO9mRzUrMxRRNuctGmY6PJLUrLKOXTKnZI4+k6XOoNAHCUPGCyJKfoo8xGApNP4VUrvX8umit3LjQHzWFz7YsAa0R1FRCse6\/CU7C5IZgjr9nR\/ijZ\/xVEQkoHk0D1x1\/6GU9gV\/tgLuJzx0aYKO7Qw+p6jF6zPRDOBr+hI0h2EEZWcFDH0R+ge1gr8jd7BCC6VCESDX2qIvV0L77uv6VdwfH9AtZCMrRPbhnuR023nayCjlpPaj\/kdI+mKl++sBYtPVDZTbJQkL9oDP\/TfuiEhJSL\/nTlTdJGEAoxqLjKdr4XWFSSYCuMW7V5imkYHbVxImGdtnkMUJ8xMmnAZw=="
};
     
$done({body: JSON.stringify(Levi)});
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
