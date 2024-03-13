var scriptWV = {
    // 일반 String data
    sendData: function (strData) {
        try {
            AndroidVST.recvData(strData);
        } catch (err) {
            console.log(">>>>>> err");
        }
    },
    // JsonObject Data
    sendDataObj: function (data) {
        try {
            var msg = JSON.stringify(data);
            console.log('Script Message (JSON) :: ' + msg);
            AndroidVST.recvMessageObj(msg)
        } catch (err) {
            console.log(">>>>>> err" + err);
        }
    },
    // strData 일반 데이터 dataType pdf 여타 등등
    sendDataWithType: function (strData, dataType) {
        try {
            AndroidVST.recvDataWithType(strData, dataType);
        } catch (err) {
            console.log(">>>>>> err");
        }
    },
    sendGoSignal: function (type) {
        try {
            AndroidVST.recvCallGOWhere(type);
        } catch (err) {
            console.log(">>>>>> err");
        }
    }
}