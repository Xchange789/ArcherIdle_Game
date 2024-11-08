window.TelegramSDK = {
    Init: function () {
        var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },

    DoShare : function (url, text)
    {
        var _url = UTF8ToString(url);
        var _text = UTF8ToString(text);

        var { shareURL } = window.telegramApps.sdk;
        shareURL(_url, _text);

        var backData = {TypeName:"TelegranSDKCallback",MethodName: "DoShareURL", Code: "0", Data: "OK"};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },
}

(function (){
    // receive event
    window.TelegramGameProxy.receiveEvent =
        window.Telegram.WebView.receiveEvent  =
            window.TelegramGameProxy_receiveEvent =
                (eventType, eventData) => {         
                    eventData = { eventType, eventData };
                    unityInstanceRef.SenMessage("TelegramSDKManger", "TelegramEvents", JSON.stringify(eventData));
                };
})();
