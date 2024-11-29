window.XchangeWebGL = {
    CopyToClipboard: function (text) {
        /*
        navigator.clipboard.writeText(text).then(function () {
            var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        }).catch(function (error) {
            console.error('Failed to copy text: ', error);
            var backData = {MethodName: "CopyToClipboard", Code: "0", Data: error};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        });
        */
        // 创建一个临时元素
        var tempElement = document.createElement('textarea');
        // 将文本值复制到临时元素
        tempElement.value = text;
        // 将临时元素添加到文档中
        document.body.appendChild(tempElement);
        // 选择临时元素中的文本
        tempElement.select();
        // 执行复制操作
        var code = "1";
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Unable to copy text to clipboard');
            code = "0";
        }
        // 移除临时元素
        document.body.removeChild(tempElement);
        
        var backData = {MethodName: "CopyToClipboard", Code: code, Data: "Seccess"};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        
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
