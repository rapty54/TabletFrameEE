function go_URL(num, target){
		
		if(typeof target =="undefined" ) {
			target = "self";		
		} 
		
		if (num=="10"){
			location.href="/primary/index/main.jsp";// 홈
		}
		else if (num=="20"){
			alert('준비중입니다.');
			/*if (target=="blank") {
				window.open("http://www.vivasam.com/themeplace/themeMain.do", "", "");   // 오픈이벤트
			}	*/		
		}
		else if (num=="30"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/themeplace/themeMain.do", "", "");   // 테마별 미술관
			}			
		}
		else if (num=="31"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/opendata/issueKeyword.do?menuCd=MN003", "", "");   // 이슈 키워드
			}			
		}
		else if (num=="32"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/knowledge/creativeexpMain.do?subUrl=/knowledge/creativeact.do", "", "");   // 진로활동자료
			}			
		}
		else if (num=="33"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/opendata/imgChannel.do?menuCd=MN003", "", "");   // 이미지갤러리
			}			
		}
		else if (num=="34"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/opendata/movChannel.do?menuCd=MN003", "", "");   // 동영상갤러리
			}			
		}
		else if (num=="35"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/opendata/notionalDic.do?menuCd=MN003", "", "");   // 브리태니커지식사전
			}			
		}
		
		else if (num=="40"){   //  pop_선생님 전용 자료실
			$('#popupWrapper').css('visibility','visible');
			$('#pop_data_layer').fadeIn(200); 
		} 
		
		else if (num=="41"){  // pop_이벤트
			$('#popupWrapper').css('visibility','visible');
			$('#pop_event_layer').fadeIn(200);  
		} 
		
		else if (num=="42"){  // pop_교과서 견본
			$('#popupWrapper').css('visibility','visible');
			$('#pop_sample_layer').fadeIn(200);  
		} 
		
		else if (num=="50"){
			if (target=="blank") {
				window.open("http://www.vivasam.com", "", "");   // 비바샘 바로가기
			}			
		}
		
		else if (num=="51"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/member/join_start.do", "", "");   // 비바샘 회원 가입하기
			}			
		}
		
		else if (num=="52"){
			if (target=="blank") {
				window.open("http://www.vivasam.com/myinfo/myinfoModify.do", "", "");   // 개인정보 확인하기
			}			
		}
		
		
		//1.  재미있는 음악 교실 
		else if (num=="100"){
			location.href="/primary/contents/music.jsp";//   
		} 
		else if (num=="101"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_music/Elementary_Music34_student/Elementary_Music34_student.html", "", "");   // 교과서 전체보기
			}	
		} 
		else if (num=="102"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_music/Elementary_Music34_teacher/Elementary_Music34_teacher.html", "", "");   // 지도서 전체보기
			}	
		} 
		else if (num=="103"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_music/Elementary_Music34_teachertextbook/Elementary_Music34_teachertextbook.html", "", "");   // 교사용교과서 견본
			}	
		} 
		else if (num=="104"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_music/music2/index.html", "", "");   // 교사용 CD 견본
			}	
		} 
		else if (num=="105"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/13초등교과서브러셔.pdf", "", "");   // 브로슈어 전체보기
			}	
		}  
		
		
		
		//2. 창의적인 미술 교실 
		else if (num=="200"){
			location.href="/primary/contents/art.jsp";//    
		} 
		else if (num=="201"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/Elementary_Art34_Student/Elementary_Art34_Student.html", "", "");   // 교과서 전체보기
			}	
		} 
		else if (num=="202"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/Elementary_Art34_teacher/Elementary_Art34_teacher.html", "", "");   // 지도서 전체보기
			}	
		} 
		else if (num=="203"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/Elementary_Art34_teachertextbook/Elementary_Art34_teachertextbook.html", "", "");   // 교사용교과서 견본
			}	
		} 
		else if (num=="204"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/art2/index.html", "", "");   // 교사용 CD 견본
			}	
		} 
		else if (num=="205"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/13초등교과서브러셔.pdf", "", "");   // 브로슈어 전체보기
			}	
		}  
		
		
		
		//3.  신나는 체육 교실 
		else if (num=="300"){
			location.href="/primary/contents/athle.jsp";//    
		}  
		else if (num=="301"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_physical34_1/Elementary_physical34_1.html", "", "");   // 교과서 3~4  ① 
			}	
		} 
		else if (num=="302"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_physical34_2/Elementary_physical34_2.html", "", "");   // 교과서 3~4  ②
			}	
		} 
		else if (num=="303"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_physical34_1_teacher/Elementary_physical34_1_teacher.html", "", "");   // 지도서 3~4  ① 
			}	
		} 
		else if (num=="304"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_physical34_2_teacher/Elementary_physical34_2_teacher.html", "", "");   // 지도서 3~4  ②
			}	
		} 
		else if (num=="305"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_Physical34_1_teachertextbook/Elementary_Physical34_1_teachertextbook.html", "", "");   // 교사용교과서 ① 
			}	
		} 
		else if (num=="306"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/Elementary_Physical34_2_teachertextbook/Elementary_Physical34_2_teachertextbook.html", "", "");   // 교사용교과서 ②
			}	
		} 
		else if (num=="307"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/phy1-2/index.html", "", "");   // 교사용 CD  ① 
			}	
		} 
		else if (num=="308"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_phy/phy2-2/index.html", "", "");   // 교사용 CD ②
			}	
		} 
		else if (num=="309"){
			if (target=="blank") {
				window.open("http://dn.vivasam.com/brochure/10_1_Prim_art/13초등교과서브러셔.pdf", "", "");   // 브로슈어 전체보기
			}	
		}  
		
		
		//4.  교과서 이야기
		else if (num=="400"){
			location.href="/primary/contents/story.jsp";//    
		}  
		
		
}

