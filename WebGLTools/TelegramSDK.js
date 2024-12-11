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
        var launchParams = platform.retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },

    DoPostEvent: function (eventType, eventData, tgEventName)
    {
        var jsonData= JSON.parse(eventData);
        TelegramSDK.RegisterEventToWebApp(tgEventName);
        platform.postEvent(tgEventName, jsonData);
        
    },

    DoOpenInvoice: function (eventData)
    {
        var jsonData= JSON.parse(eventData);
        TelegramSDK.RegisterEventToWebApp("invoice_closed");
        platform.openInvoice("https://t.me/$"+jsonData.slug);
    },

    DoShare : function (u, t)
    {
        platform.openTelegramLink("https://t.me/share?" + new URLSearchParams({
            url: u,
            text: t || ""
        }).toString().replace(/\+/g, "%20"));
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "DoShareURL", Code: "1", Data: "OK"};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));
    },

    OpenLink: function (url)
    {
        platform.openLink(url);
    },
    
    OpenTelegramLink: function (url)
    {
        platform.openTelegramLink(url);
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


