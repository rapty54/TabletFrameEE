function go_URL(num, target){
		
		if(typeof target =="undefined" ) {
			target = "self";		
		} 
		
		if (num=="10"){
			location.href="/dokdo/index/index.jsp";// 홈
		}
		else if (num=="20"){
			if (target=="blank") {
				window.open("http://www.vivasam.com", "", "");   // 비바샘 바로가기
			}			
		}
		
		
		//1.  수업준비
		else if (num=="100"){
			location.href="/dokdo/contents/study.jsp";//   
		}		
		
		
		//2.  독도를 만나다
		else if (num=="200"){
			location.href="/dokdo/contents/about.jsp";//    
		}  		
		
		
		//3.   독도의 자연환경
		else if (num=="300"){
			location.href="/dokdo/contents/nature.jsp";//    
		}  
		
		
		//4.  독도의 생태계와 자원
		else if (num=="400"){
			location.href="/dokdo/contents/ecology.jsp";//    
		}  
		
		
		//5.  독도의 역사
		else if (num=="500"){
			location.href="/dokdo/contents/history.jsp";//    
		}  		
		
		
		//6.  독도의 현재와 미래
		else if (num=="600"){
			location.href="/dokdo/contents/vision.jsp";//    
		}  
		
		
		//7.  전체 자료실
		else if (num=="700"){
			location.href="/dokdo/contents/data.jsp";//    
		}  
		
		
}

