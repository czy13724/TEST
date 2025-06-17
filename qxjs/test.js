const targetPath = "/v1/purchase/subscription/subscriber/status";

if ($request.url.includes(targetPath)) {
    try {
        JSON.parse($response.body);

        const now = Date.now();
        const sevenDaysFromNow = now + 604800000;

        const newBody = {
            "result": {
                "products": [{
                    "managed": false,
                    "status": "ACTIVE",
                    "startDate": now,
                    "productId": "com.linecorp.Foodie.subscribe.oneyear",
                    "isTrialPeriod": true,
                    "expireDate": sevenDaysFromNow
                }],
                "vipSegments": [
                    "SUBSCRIPTION_FREE_ACTIVE"
                ],
                "activated": true
            }
        };

        $done({ body: JSON.stringify(newBody) });

    } catch (e) {
        $done({});
    }
} else {
    $done({});
}