window.XchangeWebGL = {

    resolve: function (){
        var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
    },

    reject: function (error){
        var backData = {MethodName: "CopyToClipboard", Code: "0", Data: error};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
    },

    execCopy: function (text) {
        return new Promise((resolve, reject) => {
            let textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "absolute";
            textArea.style.opacity = "0";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            let success = document.execCommand('copy');
            textArea.remove();
            if (success) {
                alert(success);
                resolve();
            }
            else {
                alert(success);
                reject();
            }
        });
    },

    CopyToClipboard: function (text) {

        platform.clipboard(text).then(function()  {
            alert("success");

            XchangeWebGL.resolve();
        }).catch(function (){
            
            alert("fail");
            
            XchangeWebGL.reject(error);
            
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
        // inputField.style.left = x + 'px';
        // inputField.style.top = y + 'px';
        // inputField.style.width = width + 'px';
        inputField.value = data;
        inputField.style.opacity = 1;
        inputField.focus();
    },

    HideInputField: function () {
        var inputField = document.getElementById('unityInputField');
        unityInstanceRef.SendMessage('WebGLTextInput', 'OnInputChanged', inputField.value);
        inputField.style.opacity = 0;
        inputField.blur();
    },

    SyncDB: function () {
        FS.syncfs(false, function (err) {
            if (err) console.log("syncfs error: " + err);
        });
    },
}
