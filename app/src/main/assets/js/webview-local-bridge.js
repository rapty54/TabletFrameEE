(function () {
    var callbacks = {};

    var promiseChain = Promise.resolve();

    var init = function () {
        // call message 하나 생성할 때마다 unique id 를 생성해 줍니다.
        // 해당 ID 를 기준 으로
        const guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }

        window.webViewBridge = {
            /**
             * send message to the Local WebView onMessage handler
               data 이동 방향 => <웹뷰 => Native App => 웹뷰 success callback rebind>
               window.webViewBridge.send .... 코드
             * @param targetFunc - name of the function to invoke on the local WebView side
             * @param data - data to pass
             * @param success - success callback
             * @param error - error callback
             */
            send: function (targetFunc, data, success, error) {
                var msgObj = {
                    targetFunc: targetFunc,
                    data: data || {}
                };

                if (success || error) {
                    msgObj.msgId = guid();
                }

                var msg = JSON.stringify(msgObj);
                promiseChain = promiseChain.then(function () {
                                return new Promise(function (resolve, reject) {
                                    if (msgObj.msgId) {
                                        callbacks[msgObj.msgId] = {
                                            onsuccess: success,
                                            onerror: error
                                        };
                                    }
                                    // 호출
                                    AndroidVST.postMessage(msg);
                                    resolve();
                                })
                            }).catch(function (e) {
                                console.log(e);
                                //console.error('webview bridge send failed : ' + e.message);
                            });
                // END
            }
        };

        window.document.addEventListener('custom-vst-evl', function(e){
        // "{"isTrusted":false}" isTrusted false => 사용자 정의 / true 이면 No Custom
        //  반드시 detail 로 전달 받습 니다. (해당 사항은 Front Frame 이 무엇 이냐에 따라 달라 집니다.)
        //  이게 왜 이런지 모르겠 으면 공부
        //  console.log(JSON.stringify(e.detail));
        //  Native 으로 부터 정상 데이터 전달 받았 는지 e.detail 로 확인 한다.
        //  alert('Receive' + JSON.stringify(e.detail))

             var message;
             try{
                message = JSON.parse(e.detail);
             }catch(err){
                console.error("failed to parse message from vanila JS Based Android WebView " + err);
             }

            //console.log("success message " + message);

             if (message.args && callbacks[message.msgId]) {
                 if(message.isSuccessful){
                     // isSuccessful => true
                     // Native 에서 전달한 값을 기준 으로 웹에서 callback 으로 데이터 전달 받기 전에 받은 데이터 확인 합니다.
                     //console.log("success message isSuccessful" + JSON.stringify(message));
                     callbacks[message.msgId].onsuccess.apply(null, [message.args]);
                 }else{
                     // isSuccessful => false
                     callbacks[message.msgId].onerror.apply(null, [message.args]);
                 }
                 // 성공 실패 여부와 상관 없이 가져온 call 은 / msgId 로 바로 날린다.
                 delete callbacks[message.msgId];
             }else{
                if(message.event){
                    // message 안에 event 가 있으면 check 만
                    console.log("Message " + message.event);
                }
             }
        });
    };

    init();
}());