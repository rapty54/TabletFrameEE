var clickAdoContents = function(items,wrap){
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
	this.openItemNum = 0;
	this.items = '';
	this.ansbtn = '';
	this.init = function(){
		this.openItemNum = 0;
		
		if(this.wrap.find('.clickItem').length > 0){
			this.wrap.find('.clickContent').remove();
		}

		if(self.clickItems > 0){
			this.makeWrap();
			this.makeItem();		
			this.makeBtn();

			this.items.on('click',function(){
				if($(this).css('opacity') == '0'){
					$(this).css('opacity','1');
					self.openItemNum --;
				}else{
					$(this).css('opacity','0');
					self.openItemNum ++;
				}

                if(currentPage+1 == totalNum){
                    
                    console.log('currentPage totalNum are same');
                    
                    if(self.openItemNum == self.clickItems){
                        $('.finish_btn').addClass('on');
                    }else{
                        $('.finish_btn').removeClass('on');
                    }

                }
                
				// effectAdo('click');
				if(self.openItemNum == self.clickItems){
					self.ansbtn.addClass('re');
					effectAdo('anschk_o');
				}else{
					effectAdo('click');
					self.ansbtn.removeClass('re');
				}
			});		

			this.ansbtn.on('click',function(){
				// effectAdo('click');
				if($(this).hasClass('re')){
					effectAdo('click');
					self.items.css('opacity','1');
					self.openItemNum = 0;
					self.ansbtn.removeClass('re');
				}else{
					effectAdo('anschk_o');
					self.items.css('opacity','0');
					self.ansbtn.addClass('re');
					self.openItemNum = self.clickItems;

				}
			});
		}else{
			this.makeWrap();
			this.makeItem();		

			this.items.on('click',function(){
				effectAdo('click');
				if($(this).css('opacity') == '0'){
					$(this).css('opacity','1');
				}else{
					$(this).css('opacity','0');
				}
			});		
		}
		
	}

	this.makeWrap = function(){
		var html = '<div class="clickContent"></div>';
		this.wrap.append(html);
		this.itemwrap = this.wrap.find('.clickContent');
	};

	this.makeItem = function(){
		var html = '';
		for(var i = 0;i< this.clickItems;i++){
			html += '<div class="clickItem clickItem'+(i+1)+'"></div>'
		}
		this.itemwrap.append(html);

		this.items = this.itemwrap.find('.clickItem');

		if(this.items.length == 1) this.items.addClass('ex');
	};

	this.makeBtn = function(){
		var html = '<div class="ansbtn"></div>'
		this.itemwrap.append(html);

		this.ansbtn = this.itemwrap.find('.ansbtn');
	};
}
