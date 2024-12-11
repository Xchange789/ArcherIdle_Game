window.XchangeWebGL = {
    
    CopyToClipboard: function (text) {

        platform.clipboard(text).then(function()  {
            var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
            
        }).catch(function (){
            alert("Fail");

            var backData = {MethodName: "CopyToClipboard", Code: "0", Data: "Fail"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        });
    },

    ShowInputField: function (x, y, width, data) {
        var inputField = document.getElementById('unityInputField');
        inputField.style.left = x + '%';
        inputField.style.top = y + '%';
        inputField.style.width = width + '%';
        inputField.value = data;
        inputField.style.visibility = "visible";
        inputField.focus();
    },

    HideInputField: function () {
        var inputField = document.getElementById('unityInputField');
        unityInstanceRef.SendMessage('WebGLTextInput', 'OnInputChanged', inputField.value);
        inputField.style.visibility = "hidden";
        inputField.blur();
    },

    SyncDB: function () {
        FS.syncfs(false, function (err) {
            if (err) console.log("syncfs error: " + err);
        });
    },
}

function SendInputToUnity() {
    var inputField = document.getElementById('unityInputField');
    var inputValue = inputField.value;
    // 将输入的内容发送到Unity中
    unityInstanceRef.SendMessage('WebGLTextInput', 'OnInputChanged', inputValue);
}

(function(){
    let input       = document.getElementById("unityInputField");
    input.oninput   = SendInputToUnity;

    platform.init();
    // Some versions of Telegram don't need the classes above.
    if (['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(platform.m_telegram.WebApp.platform)) {
        return;
    }

    // Expand the application.
    //postEvent('web_app_expand');
    //platform.m_telegram.WebApp.expand();
    platform.m_telegram.WebApp.requestFullscreen();

    document.body.classList.add('mobile-body');
    document.getElementById('wrap').classList.add('mobile-wrap');
    document.getElementById('content').classList.add('mobile-content');
})();
