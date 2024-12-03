        platform.clipboard(text).then(function()  {
            alert("success");

            var backData = {MethodName: "CopyToClipboard", Code: "1", Data: "Seccess"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
            
        }).catch(function (){
            alert("fail");

            var backData = {MethodName: "CopyToClipboard", Code: "0", Data: "Fail"};
            unityInstanceRef.SendMessage('XchangeWebGL', 'XchangeWebGLCallBack', JSON.stringify(backData));
        });