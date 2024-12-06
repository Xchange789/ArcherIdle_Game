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


    SendInputToUnity: function () {
        var inputField = document.getElementById('unityInputField');
        var inputValue = inputField.value;
        // 将输入的内容发送到Unity中
        unityInstanceRef.SendMessage('WebGLTextInput', 'OnInputChanged', inputValue);
    },

    ShowInputField: function (x, y, width, data) {
        var inputField = document.getElementById('unityInputField');
        inputField.style.left = x + '%';
        inputField.style.top = y + '%';
        inputField.style.width = width + '%';
        inputField.value = data;
        inputField.style.visibility = "visible";
        inputField.style.display = ""
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
