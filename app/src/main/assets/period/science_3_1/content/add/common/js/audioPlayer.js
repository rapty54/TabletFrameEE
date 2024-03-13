
var AudioPlayer = {
    audioObj : null,

    bgmObj : null,

    play : function(_src, _callback){
        audioObj = new Audio(_src);
        audioObj.play();
        audioObj.addEventListener("ended", function(){
            if(_callback != null){
                _callback();
            }
        });
    },

    stop : function(){
        try{
            audioObj.pause();
        }catch (error){

        }
    },

    playGroup : function(_arrSound, _callback, _betweenGap){
        var numSound = _arrSound.length;
        var currentTurn = 1;
        var betweenGap = (_betweenGap == undefined) ? 1000 : _betweenGap;

        playSound();

        function playSound(){
            audioObj = new Audio(_arrSound[currentTurn-1]);
            audioObj.play();
            audioObj.addEventListener("ended", function(){
                if(currentTurn == numSound){
                    if(_callback != null){
                        _callback();
                    }
                }else{
                    currentTurn++;
                    setTimeout(function(){
                        playSound();
                    }, betweenGap);
                }
            });
        }
    },//playGroup

    playBgm : function(_bgmPath){
        bgmObj = new Audio(_bgmPath);
        bgmObj.play();
        bgmObj.addEventListener("ended", function(){
            bgmObj.pause();
            bgmObj.currentTime = 0;
            bgmObj.play();
        });
    },

    pauseBgm : function(){
        if(bgmObj != null){
            bgmObj.pause();
        }
    },

    resumeBgm : function(){
        if(bgmObj != null){
            bgmObj.play();
        }
    },

    stopBgm : function(){
        if(bgmObj != null){
            bgmObj.pause();
            bgmObj.currentTime = 0;
        }
    }


}//AudioPlayer