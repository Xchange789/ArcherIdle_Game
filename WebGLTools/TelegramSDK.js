window.TelegramSDK = {
    Init: function () {
        var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
        
            // receive event
    window.TelegramGameProxy.receiveEvent =            (eventType, eventData) => {         
                eventData = { eventType, eventData };
                unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
            };
        
    window.Telegram.WebView.receiveEvent  = (eventType, eventData) => {         
                eventData = { eventType, eventData };
                unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
            };

        
         window.TelegramGameProxy_receiveEvent = (eventType, eventData) => {         
                eventData = { eventType, eventData };
                unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
            };

    },

    DoShare : function (url, text)
    {
        var { shareURL } = window.telegramApps.sdk;
        shareURL(url, text);

        var backData = {TypeName:"TelegranSDKCallback",MethodName: "DoShareURL", Code: "1", Data: "OK"};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },

    OpenLink: function (url)
    {
        var { openLink } = window.telegramApps.sdk;
        openLink(url);
    },


    OpenTelegramLink: function (url)
    {
        var  { postEvent } = window.telegramApps.sdk;
        postEvent('web_app_open_tg_link', { path_full: url });


        // var { openTelegramLink } = window.telegramApps.sdk;
        // openTelegramLink(url);
    },

    DoPostEvent: function (eventType, eventData)
    {
        var jsonData= JSON.parse(eventData);
        var url="/$"+jsonData.slug;
                var  { postEvent } = window.telegramApps.sdk;
        postEvent('web_app_open_tg_link', { path_full: "/$TdNUaxom2EkCAAAAoFuhdj_X4DA"});

        // var jsonData= JSON.parse(eventData);
        // jsonData.slug="/$dU2TSv4maFEGQwAAX1B_zBRzDJA";
        // OpenTelegramLink(jsonData.slug);
        // window.TelegramWebviewProxy.postEvent(eventType, JSON.stringify(jsonData));
    }
}

// (function (){

// })();
