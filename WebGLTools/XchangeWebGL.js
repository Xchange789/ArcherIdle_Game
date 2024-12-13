window.XchangeWebGL = {
    
    CopyToClipboard: function (text) {


        XchangeWebGL.copyTextToClipboard(text);


        platform.clipboard(text).then(function()  {
            var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
            
        }).catch(function (){
            alert("Fail");

            var backData = {MethodName: "CopyToClipboard", Code: "0", Data: "Fail"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        });
    },

    function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log("Copied successfully!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        console.warn("Clipboard API not supported, using fallback.");
        fallbackCopyTextToClipboard(text);
    }
},

function fallbackCopyTextToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        console.log("Fallback: Copied successfully");
    } catch (err) {
        console.error("Fallback: Failed to copy", err);
    }
    document.body.removeChild(textarea);
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

    SendInputToUnity: function () {
        var inputField = document.getElementById('unityInputField');
        var inputValue = inputField.value;
        // 将输入的内容发送到Unity中
        unityInstanceRef.SendMessage('WebGLTextInput', 'OnInputChanged', inputValue);
    },

    SyncDB: function () {
        FS.syncfs(false, function (err) {
            if (err) console.log("syncfs error: " + err);
        });
    },
};



(function (){
    let input       = document.createElement("input");
    input.type      = "text";
    input.id        = "unityInputField";
    input.style     = "position:absolute; top:0; left:0; visibility: hidden; z-index:1000;";
    input.oninput   = window.XchangeWebGL.SendInputToUnity;
    document.body.appendChild(input);
})();
