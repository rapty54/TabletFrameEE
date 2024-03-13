// ans, select 만들기 및 처리
//                          개수, clickPage, 정답배열, 괄호여부
var selectContents = function(num, wrap, trueIdxArray, bracket){
    var ansTime;
    var self = this;
    this.wrap = wrap;
    this.ItemNum = num;
    this.trueIdxArray = trueIdxArray;
    
    this.answrap = '';
    this.selectwrap = '';
    
    this.ans = '';
    this.select = '';
    this.ansbtn = this.wrap.find('.ansbtn');
    var setContent = self.wrap.parent().find('.setContent li').length;
    
    var count = 0;
    
    this.init = function(){
        
        if(this.wrap.find('.select').length > 0 || this.wrap.find('.ans').length> 0){
            this.wrap.find('.selectWrap').remove();
            this.wrap.find('.ansWrap').remove();
        }

        
        if(this.ItemNum > 0){
            
            
            this.makeAnswrap();
            this.makeAnsItem();
            
            this.makeSelectwrap();
            this.makeSelectItem();
            
            this.setData();
            
            this.ans.css('opacity','0');
            this.select.css('opacity','0');
            
            
            if(bracket){
                this.select.on('click',function(){
                    effectAdo('click');
                    
                    var idx = $(this).index();
                    self.ans.css('opacity','0');
                    self.ans.eq(idx).css('opacity','1');
                    
                    // 해당 페이지가 마지막 문제일 때 finish_btn 애니메이션 적용 처리
                    var condition_1 = self.wrap.parent().find('.setContent li').eq(setContent-1).hasClass('on');
                    var condition_2 = self.ansbtn.hasClass('re');
                    if(condition_1 && condition_2){
                        $('.finish_btn').addClass('on');
                    }else{
                        $('.finish_btn').removeClass('on');
                    }

                });
                
            }else{
                
                var trueCount = trueIdxArray.length;
                
                this.select.on('click',function(){
                    effectAdo('click');
                    var idx = $(this).index();

                    if($(this).data('data-item') == 'true'){
                        effectAdo('anschk_o');
                        self.ans.eq(idx).css('opacity','1');
                        
                        count +=1;
                        if(count >= trueCount){
                            self.select.addClass('dis');
                            self.ansbtn.addClass('re');
                        }
                        
                        

                    }else{
                        effectAdo('anschk_x');
                        self.ansbtn.removeClass('re');
                        self.ans.eq(idx).addClass('ani');
                        ansTime = setTimeout(function(){
                            self.ans.eq(idx).removeClass('ani');
                        },500);
                    }

                    // 해당 페이지가 마지막 문제일 때 finish_btn 애니메이션 적용 처리
                    var condition_1 = self.wrap.parent().find('.setContent li').eq(setContent-1).hasClass('on');
                    var condition_2 = self.ansbtn.hasClass('re');
                    if(condition_1 && condition_2){
                        $('.finish_btn').addClass('on');
                    }else{
                        $('.finish_btn').removeClass('on');
                    }

                });	
            }
            
            this.ansbtn.on('click',function(){
                count = 0;
                if($(this).hasClass('re')){ // 정답보기
                    self.ans.css('opacity','0');
                    for(i=0;i<self.trueIdxArray.length;i++){
                        self.ans.eq(self.trueIdxArray[i]).css('opacity','1');
                    }
                    self.select.addClass('dis');
                    
				}else{  // 다시하기
					self.ans.css('opacity','0');
                    self.select.removeClass('dis');

				}
            })
        }
    }
    
    this.makeAnswrap = function(){
        var ansWrap = '<div class="ansWrap"></div>';
        wrap.append(ansWrap);
        this.answrap = this.wrap.find('.ansWrap');
    };
    
    this.makeSelectwrap = function(){
        var selectwrap = '<div class="selectWrap"></div>';
        wrap.append(selectwrap);
        this.selectwrap = this.wrap.find('.selectWrap');
    };
    
    this.makeAnsItem = function(){
        var html = ''
        for(i=0; i<this.ItemNum; i++){
            html += '<div class="ans ans'+(i+1)+'"></div>'
        }
        
        this.answrap.append(html);
        this.ans = this.answrap.find('.ans');
    };
    
    this.makeSelectItem = function(){
        var html = ''
        for(i=0; i<this.ItemNum; i++){
            html += '<div class="select select'+(i+1)+'"></div>'
        }
        
        this.selectwrap.append(html);
        this.select = this.selectwrap.find('.select');
    };
    
    this.setData = function(){
      for(i = 0; i<self.trueIdxArray.length; i++){
            self.select.eq(self.trueIdxArray[i]).data('data-item','true');
        }  
    };
}




