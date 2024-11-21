window.TelegramSDK = {

    RegisterEvent : function(eventName)
    {
        var removeListener = window.telegramApps.sdk.on(eventName,(eventData)=>{
            var eventType=eventName;
            var eventJson= JSON.stringify(eventData)
            eventData = { eventType, eventJson };
            unityInstanceRef.SendMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
            removeListener();
        });
    },


    Init: function () {
        window.telegramApps.sdk.init();
        // window.telegramApps.sdk.on('invoice_closed',(eventData)=>{
        //     var eventType='invoice_closed';
        //     var eventJson= JSON.stringify(eventData)
        //     eventData = { eventType, eventJson };
        //     unityInstanceRef.SendMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
        // });

        var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
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

    DoPostEvent: function (eventType, eventData,tgEventName)
    {
        var jsonData= JSON.parse(eventData);
        window.Telegram.WebApp.openInvoice("https://t.me/$"+jsonData.slug)
        TelegramSDK.RegisterEvent(tgEventName);

        // return;
        // var jsonData= JSON.parse(eventData);
        // // https://t.me
        // var url="/$"+jsonData.slug;
        // window.telegramApps.sdk.postEvent('web_app_open_tg_link', { path_full: url});
        //  window.TelegramGameProxy.postEvent(eventType, JSON.stringify(jsonData));
    }
}
