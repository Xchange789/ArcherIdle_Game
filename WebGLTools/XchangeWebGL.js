window.XchangeWebGL = {
    ShowInputField: function (x, y, width, height, data) {
        var inputField = document.getElementById('unityInputField');
        inputField.style.width = width + "px";
        inputField.style.height = height + "px";
        inputField.style.position = "absolute";
        inputField.style.left = (x - 4) + "px";
        inputField.style.top  = (y - 2) + "px";
        inputField.value = data;
        inputField.style.visibility = "visible";
        inputField.style.opacity = 0;
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

    Alert: function (msg) {
        window.alert(msg);
    },

    GetWebGLWindowsSize: function (){
        var backData = {MethodName: "GetWebGLWindowsSize", Code: "1", Data: window.innerWidth + "," + window.innerHeight};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
    },

    //创建按钮
    CreateVirtualBtn: function (data, width, height, x, y) {
        // alert("CreateVirtualBtn");
        var info = JSON.parse(data);
        var id = info["id"];
        var msg = info["msg"];
        var eventName = "";
        var button = document.createElement("button");
        button.innerHTML = "Virtual Button";
        button.id = id;
        button.style.width = width + "px";
        button.style.height = height + "px";
        button.style.position = "absolute";
        button.style.left = x + "px";
        button.style.top = y + "px";
        button.style.opacity =0;

        // alert("宽:"+button.style.width + "  高:"+button.style.height + " X:"+button.style.left + "  Y"+ button.style.top+"画布大小" + window.innerWidth  +":"+ window.innerHeight);

        if (id == 1) {
            eventName = "CopyToClipboard";
        }
        button.onclick = function () {
            // alert("Button Click!");
            if (id == 1) {
                XchangeWebGL.CopyToClipboard(msg);
            }
            // alert(id);
        };
        // 将按钮添加到页面中
        document.body.appendChild(button);

        var backData = {MethodName: "CreateVirtualBtn", Code: "1", Data: eventName};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        // alert("CreateVirtualBtn End");
    },
    //销毁按钮
    DestroyButton: function (id) {
        var button = document.getElementById(id);
        if (button) {
            document.body.removeChild(button);
        }
        var backData = {MethodName: "DestroyButton", Code: "1", Data: button == null};
        unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
    },

    CopyToClipboard: function (text) {
        navigator.clipboard.writeText(text).then(function () {
            var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        }).catch(function (error) {
            console.error('Failed to copy text: ', error);
            var backData = {MethodName: "CopyToClipboard", Code: "0", Data: error};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        });
    },
};


(function () {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "unityInputField";
    input.style = "position:absolute; top:0; left:0; visibility: hidden; z-index:1000;";
    //input.oninput  = window.XchangeWebGL.SendInputToUnity;
    input.onchange = window.XchangeWebGL.SendInputToUnity;
    document.body.appendChild(input);
})();
