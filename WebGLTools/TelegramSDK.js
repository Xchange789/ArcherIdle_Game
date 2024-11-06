window.TelegramSDK = {
    Init: function () {
        var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = retrieveLaunchParams();
        var backData = {MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("TelegramSDKManger", "TelegramCallBack", JSON.stringify(backData));
    },
}
