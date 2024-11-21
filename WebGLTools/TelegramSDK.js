window.TelegramSDK = {

    Init: function () {
        window.telegramApps.sdk.init();
        window.telegramApps.sdk.on('invoice_closed',(payload)=>{
            var eventType='invoice_closed';
            eventData = { eventType, payload };
            unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
        });

        var { retrieveLaunchParams } = window.telegramApps.sdk;
        var launchParams = retrieveLaunchParams();
        var backData = {TypeName:"TelegranSDKCallback",MethodName: "Init", Code: "1", Data: JSON.stringify(launchParams)};
        unityInstanceRef.SendMessage("SDKCallbackMono", "CallbackToUnity", JSON.stringify(backData));

        // window.Telegram.WebView.onEvent('invoice_closed', (eventType, eventData) => {         
        //     eventData = { eventType, eventData };
        //     unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
        // });
        
    //         // receive event
    // window.TelegramGameProxy.receiveEvent =            (eventType, eventData) => {         
    //             eventData = { eventType, eventData };
    //             unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
    //         };
        
    // window.Telegram.WebView.receiveEvent  = (eventType, eventData) => {         
    //             eventData = { eventType, eventData };
    //             unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
    //         };

        
    //      window.TelegramGameProxy_receiveEvent = (eventType, eventData) => {         
    //             eventData = { eventType, eventData };
    //             unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
    //         };

    //         window.Telegram.WebApp.onEvent('invoice_closed', (eventType, eventData) => {         
    //     eventData = { invoice_closed, eventData };
    //     unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
    // });

    // window.Telegram.WebView.onEvent('invoice_closed', (eventType, eventData) => {         
    //     eventData = { invoice_closed, eventData };
    //     unityInstanceRef.SenMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
    // });
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
        window.Telegram.WebApp.openInvoice("https://t.me/$"+jsonData.slug)



       
        // window.Telegram.WebApp.openInvoice("https://t.me/$"+jsonData.slug,e => {
        //     console.log("payment status==>" + e),
        //     "paid" == e && t(!0)
        // });


        // return;
        // var jsonData= JSON.parse(eventData);
        // // https://t.me
        // var url="/$"+jsonData.slug;
        // window.telegramApps.sdk.postEvent('web_app_open_tg_link', { path_full: url});
        //  window.TelegramGameProxy.postEvent(eventType, JSON.stringify(jsonData));
    }
}

// (function (){

// })();
