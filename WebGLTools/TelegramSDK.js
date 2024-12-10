window.TelegramSDK = {

    RegisterEvent : function(eventName)
    {
        /*
        var removeListener = window.telegramApps.sdk.on(eventName,(eventData)=>{
            var eventType=eventName;
            var eventJson = eventData != undefined ? JSON.stringify(eventData) : "";
            eventData = { eventType, eventJson };
            unityInstanceRef.SendMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
            removeListener();
        });        
         */
    },
    
    RegisterEventToWebApp: function (eventType)
    {
        var eventHandler = (eventObject) => {
            var eventType = eventType;
            var eventJson = eventObject != undefined ? JSON.stringify(eventObject) : "";
            eventObject = { eventType, eventJson };
            unityInstanceRef.SendMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventObject));
            window.Telegram.WebApp.offEvent(eventType, eventHandler);
        }
        window.Telegram.WebApp.onEvent(eventType, eventHandler); 
    },

    Init: function () {
        window.telegramApps.sdk.init();
        
        // var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = platform.retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },

    DoShare : function (url, text)
    {
        /*
        var { shareURL } = window.telegramApps.sdk;
        shareURL(url, text);
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "DoShareURL", Code: "1", Data: "OK"};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));        
         */
    },

    OpenLink: function (url)
    {
        /*
        var { openLink } = window.telegramApps.sdk;
        openLink(url);        
         */
        platform.openLink(url);
    },


    OpenTelegramLink: function (url)
    {
        /*
        var  { postEvent } = window.telegramApps.sdk;
        postEvent('web_app_open_tg_link', { path_full: url });        
         */
        platform.openTelegramLink(url);
    },

    DoPostEvent: function (eventType, eventData, tgEventName)
    {
        var jsonData= JSON.parse(eventData);
        platform.openInvoice("https://t.me/$"+jsonData.slug);
        //window.Telegram.WebApp.openInvoice("https://t.me/$"+jsonData.slug);
        TelegramSDK.RegisterEvent(tgEventName);
    },

    addToHomeScreen: function (tgEventName)
    {
        RegisterEventToWebApp(tgEventName)
        platform.addToHomeScreen();
    },

    checkHomeScreenStatus: function (tgEventName)
    {
        platform.checkHomeScreenStatus(tgEventName);
    }
    
    
}
