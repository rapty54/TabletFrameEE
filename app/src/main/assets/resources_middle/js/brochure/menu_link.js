function go_URL(num, target){
		
		if(typeof target =="undefined" ) {
			target = "self";		
		} 
		
		if (num=="10"){
			location.href="/brochure/index/index.jsp";// 홈
		}
		else if (num=="20"){
			location.href="/brochure/index/info.jsp" //   비상교육 알림 
		}
		else if (num=="30"){
			location.href="/brochure/index/install.jsp" //  필수 앱 설치 
		}
		
		
		//1.  고등_국어교과
		else if (num=="100"){
			location.href="";//   
		}		
		else if (num=="110"){
			location.href="/brochure/high/lang_Han.jsp";//  국어I/국어II(한철우)
		}
		else if (num=="120"){
			location.href="/brochure/high/lang_culture_Han.jsp";//  문학(한철우)
		}
		else if (num=="130"){
			location.href="/brochure/high/lang_Woo.jsp";//  국어I/국어II(우한용)
		}
		else if (num=="140"){
			location.href="/brochure/high/lang_culture_Woo.jsp";//  문학(우한용)
		}
		else if (num=="150"){
			location.href="/brochure/high/lang_read_Lee.jsp";//  독서와 문법(이관규)
		}
		else if (num=="160"){
			location.href="/brochure/high/lang_speech_Park.jsp";//  화법과 작문(박영민)
		}
		 
		
		
		//2. 고등_사회교과
		else if (num=="200"){
			location.href="";//   
		}
		else if (num=="210"){
			location.href="/brochure/high/social_Yook.jsp";//   사회(육근록)
		}		
		else if (num=="220"){
			location.href="/brochure/high/social_learning.jsp";//    사회?문화(신형민)/경제(유종렬)
		}
		else if (num=="230"){
			location.href="/brochure/high/social_moral_Joh.jsp";//    생활과 윤리(조성민)
		}
		else if (num=="240"){
			location.href="/brochure/high/social_geography.jsp";//    한국 지리(최규학)/세계 지리(위상복)
		}
		else if (num=="250"){
			location.href="/brochure/high/social_history.jsp";//    한국사(도면회)/동아시아사(황진상)/세계사(조한욱)
		}

		
		//3.  고등_수학교과
		else if (num=="300"){
			location.href=" ";//  
		}
		else if (num=="310"){
			location.href="/brochure/high/math_Kim.jsp";//   수학I/수학II/미적분I/미적분II/기하와 벡터/확률과 통계(김원경)
		} 
		
}


// 필수 앱설치 Link
function app_URL(num1, target1){
	var UserAgent = navigator.userAgent;
	
	if(typeof target1 =="undefined" ) {
		target1 = "self";		
	} 
	
	if (num1=="3001"){   //  한컴오피스 한글뷰어
		if (target1=="blank") { 
			if(UserAgent.match(/iPhone|iPad|iPod/))	{ 
			window.open("https://itunes.apple.com/kr/app/hankeom-opiseu-byueo/id369832061?mt=8", "", "");   	
			 
			} else if(UserAgent.match(/Android/)) {
			window.open("https://play.google.com/store/apps/details?id=kr.co.hancom.hancomviewer.androidmarket&feature=search_result#?t=W10.", "", "");   
			} 
		}
	}
	
	else if (num1=="3002"){   //  씽크프리 오피스 모바일 
		if (target1=="blank") { 
			if(UserAgent.match(/iPhone|iPad|iPod/))	{ 
			window.open("https://itunes.apple.com/kr/app/pollaliseu-opiseu-polaris/id513188658?mt=8", "", "");   	
			 
			} else if(UserAgent.match(/Android/)) {
			window.open("https://play.google.com/store/apps/details?id=com.tf.thinkdroid.amlite&feature=search_result#?t=W10.", "", "");   
			} 
		}
	} 
	
	else if (num1=="3003"){   //  Adobe Reader 
		if (target1=="blank") { 
			if(UserAgent.match(/iPhone|iPad|iPod/))	{ 
			window.open("https://itunes.apple.com/kr/app/adobe-reader/id469337564?mt=8", "", "");   	
			 
			} else if(UserAgent.match(/Android/)) {
			window.open("https://play.google.com/store/apps/details?id=com.adobe.reader&feature=search_result#?t=W10.", "", "");   
			} 
		}
	} 	
		
}


//  Brochure_다운로드 Link
function down_URL(num2, target2){ 
	
	if(typeof target2 =="undefined" ) {
		target2 = "self";		
	}  
	 
	// 국어I/국어II(한철우) 
	if (num2=="11001"){  
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native_language_Brochure.pdf", "Visang_Brochure_국어1편", "78");  			 
		}
	}
	
	else if (num2=="11002"){   //  교과서_국어I(한철우)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native1_language_1.pdf", "고등국어 I-한철우 교과서", "100");   
		}
	} 
	
	else if (num2=="11003"){   //  교과서_국어II(한철우)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native1_language_2.pdf", "고등국어Ⅱ-한철우 교과서", "130");   
		}
	} 
	
	else if (num2=="11004"){   //   지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native3_language.pdf", "고등국어 I-한철우 지도서", "100");   
		}
	} 
	
	else if (num2=="11005"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native2_language.pdf", "고등국어 I-한철우 교사용교과서", "100");  
		}
	} 
	
	else if (num2=="11006"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_1.hwp", "국어I(한철우) 선정사유", "100");   
		}
	} 
	
	else if (num2=="11007"){   //  교수 학습 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_2.pdf", "고등국어(한철우) 수업PPT", "100");   
		}
	} 
	
	else if (num2=="11008"){   //   교수 학습 자료_제재 학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_3.hwp", "고등국어(한철우) 제재학습지", "100");   
		}
	} 
	
	else if (num2=="11009"){   //   교수 학습 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_4.hwp", "고등국어(한철우) 활동지", "100");   
		}
	} 
	
	else if (num2=="11010"){   //   교수 학습 자료_단원별 성취 기준
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_5.hwp", "고등국어(한철우) 단원별성취기준", "100");   
		}
	} 
	
	else if (num2=="11011"){   //   교수 학습 자료_수행 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_6.hwp", "고등국어(한철우) 수행평가", "100");   
		}
	} 
	
	else if (num2=="11012"){   //   교수 학습 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_7.hwp", "고등국어(한철우) 수업지도안", "100");   
		}
	} 
	
	else if (num2=="11013"){   //   교수 학습 자료_보충 자료
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native4_language_8.hwp", "고등국어(한철우) 보충자료", "100");   
		}
	} 
	
	else if (num2=="11014"){   //   평가 자료_쪽지 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_1.hwp", "고등국어(한철우) 쪽지시험", "100");   
		}
	} 
	
	else if (num2=="11015"){   //   평가 자료_어휘 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_2.hwp", "고등국어(한철우) 어휘시험", "100");  
		}
	} 
	
	else if (num2=="11016"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_3.hwp", "고등국어(한철우) 형성평가-①", "100");   
		}
	} 
	
	else if (num2=="11017"){   //   평가 자료_서술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_4.hwp", "고등국어(한철우) 서술형평가", "100");   
		}
	} 
	
	else if (num2=="11018"){   //   평가 자료_대단원 모의고사
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_5.hwp", "고등국어(한철우) 대단원모의고사-①", "100");   
		}
	} 
	
	else if (num2=="11019"){   //   평가 자료_수능 기출 문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native5_language_6.hwp", "고등국어(한철우) 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="11020"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/korean.mp4");   
		}
	} 
	
	else if (num2=="11021"){   //   멀티미디어 자료_도입 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native6_language_m2.mp4");   
		}
	} 
	
	else if (num2=="11022"){   //   멀티미디어 자료_낭송(본문 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native6_language_m3.mp4");   
		}
	} 
	
	else if (num2=="11023"){   //   멀티미디어 자료_낭송(보기 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native6_language_m4.mp4");  
		}
	} 
	
	else if (num2=="11024"){   //   멀티미디어 자료_전체 줄거리
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_1_high_native_lang_Han/Han_native6_language_m5.mp4"); 
		}
	} 
	
	//  문학(한철우)  
	else if (num2=="12001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture_Brochure.pdf", "Visang_Brochure_국어1편", "78");   
		}
	}
	
	else if (num2=="12002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture1.pdf", "문학-한철우 교과서", "110");   
		}
	} 
	
	else if (num2=="12003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture2.pdf", "문학-한철우 지도서", "100");   
		}
	} 
	
	else if (num2=="12004"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture3.pdf", "문학-한철우 교사용 교과서", "110");   
		}
	} 
	
	else if (num2=="12005"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_1.hwp", "문학(한철우) 선정사유", "100");   
		}
	} 
	
	else if (num2=="12006"){   //   교수 학습 자료_제재  PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_2.pdf", "고등_문학(한철우) 제재PPT", "100");   
		}
	} 
	
	else if (num2=="12007"){   //  교수 학습 자료_제재 학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_3.hwp", "고등_문학(한철우) 제재학습지", "100");   
		}
	} 
	
	else if (num2=="12008"){   //   교수 학습 자료_더 읽어 보기
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_4.hwp", "고등_문학(한철우) 더읽어보기", "100");   
		}
	} 
	
	else if (num2=="12009"){   //   교수 학습 자료_이론 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_5.pdf", "고등_문학(한철우) 이론PPT", "100");   
		}
	} 
	
	else if (num2=="12010"){   //   교수 학습 자료_이론 학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_6.hwp", "고등_문학(한철우) 이론학습지", "100");   
		}
	} 
	
	else if (num2=="12011"){   //   교수 학습 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_7.hwp", "고등_문학(한철우) 활동지", "100");   
		}
	} 
	
	else if (num2=="12012"){   //   교수 학습 자료_성취 기준 및 성취 수준
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_8.hwp", "고등_문학(한철우) 성취기준및성취수준", "100");   
		}
	} 
	
	else if (num2=="12013"){   //   교수 학습 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_9.hwp", "고등_문학(한철우) 수업지도안", "100");   
		}
	} 
	
	else if (num2=="12014"){   //   교수 학습 자료_참고 자료
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture4_10.hwp", "고등_문학(한철우) 참고자료", "100");   
		}
	} 
	
	else if (num2=="12015"){   //   평가 자료_쪽지 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_1.hwp", "고등_문학(한철우) 쪽지시험", "100");   
		}
	} 
	
	else if (num2=="12016"){   //   평가 자료_서술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_2.hwp", "고등_문학(한철우) 서술형평가", "100");   
		}
	} 
	
	else if (num2=="12017"){   //   평가 자료_수능 기출 문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_3.hwp", "고등_문학(한철우) 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="12018"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_5.hwp", "고등_문학(한철우) 수행평가", "110");   
		}
	} 
	
	else if (num2=="12019"){   //   평가 자료_수행 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_4.hwp", "고등_문학(한철우) 형성평가", "100");   
		}
	} 
	
	else if (num2=="12020"){   //   평가 자료_단원 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture5_6.hwp", "고등_문학(한철우) 단원평가", "100");   
		}
	} 
	
	else if (num2=="12021"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/korean.mp4");   
		}
	} 
	
	else if (num2=="12022"){   //   멀티미디어 자료_도입 영상 1
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture6_m2.mp4");   
		}
	} 
	
	else if (num2=="12023"){   //   멀티미디어 자료_도입 영상 2
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture6_m3.mp4");   
		}
	} 
	
	else if (num2=="12024"){   //   멀티미디어 자료_낭송(본문 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture6_m4.mp4");   
		}
	} 
	
	else if (num2=="12025"){   //   멀티미디어 자료_낭송(보기 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture6_m5.mp4");   
		}
	} 
	
	else if (num2=="12026"){   //   멀티미디어 자료_전체 줄거리
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_2_high_culture_Han/Han_culture6_m6.mp4");   
		}
	} 
	
	// 국어I/국어II(우한용)  
	else if (num2=="13001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native_language_Brochure.pdf", "Visang_Brochure_국어2편", "78");   
		}
	}
	
	else if (num2=="13002"){   //  교과서_국어I(우한용)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native1_language_1.pdf", "고등국어 I-우한용 교과서", "110");   
		}
	} 
	
	else if (num2=="13003"){   //  교과서_국어II(우한용)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native1_language_2.pdf", "고등국어Ⅱ-우한용 교과서", "110");   
		}
	} 
	
	else if (num2=="13004"){   //   지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native2_language.pdf", "고등국어 I-우한용 지도서", "100");   
		}
	} 
	
	else if (num2=="13005"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native3_language.pdf", "고등국어 I-우한용 교사용교과서", "110");   
		}
	} 
	
	else if (num2=="13006"){   //  교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_1.hwp", "국어I(우한용) 선정사유", "100");   
		}
	} 
	
	else if (num2=="13007"){   //   교수 학습 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_2.pdf", "고등_국어(우한용) 수업PPT", "100");   
		}
	} 
	
	else if (num2=="13008"){   //   교수 학습 자료_제재 학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_3.hwp", "고등_국어(우한용) 제재학습지", "100");   
		}
	} 
	
	else if (num2=="13009"){   //   교수 학습 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_4.hwp", "고등_국어(우한용) 활동지", "100");   
		}
	} 
	
	else if (num2=="13010"){   //   교수 학습 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_5.hwp", "고등_국어(우한용) 수업지도안", "100");   
		}
	} 
	
	else if (num2=="13011"){   //   교수 학습 자료_더 읽어 보기
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_6.hwp", "고등_국어(우한용) 더읽어보기", "100");   
		}
	} 
	
	else if (num2=="13012"){   //   교수 학습 자료_단원별 성취 기준
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native4_language_7.hwp", "고등_국어(우한용) 단원별성취기준", "100");   
		}
	} 
	
	else if (num2=="13013"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_1.hwp", "고등_국어(우한용) 형성평가_1회", "110");   
		}
	} 
	
	else if (num2=="13014"){   //   평가 자료_서술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_2.hwp", "고등_국어(우한용) 서술형평가", "110");   
		}
	} 
	
	else if (num2=="13015"){   //   평가 자료_쪽지 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_3.hwp", "고등_국어(우한용) 쪽지시험_1회", "100");   
		}
	} 
	
	else if (num2=="13016"){   //   평가 자료_어휘 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_4.hwp", "고등_국어(우한용) 어휘시험", "100");   
		}
	} 
	
	else if (num2=="13017"){   //   평가 자료_수능 기출 문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_5.hwp", "고등_국어(우한용) 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="13018"){   //   평가 자료_대단원 모의고사
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_6.hwp", "고등_국어(우한용) 대단원모의고사_1회", "110");   
		}
	} 
	
	else if (num2=="13019"){   //   평가 자료_수행 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native5_language_7.hwp", "고등_국어(우한용) 수행평가", "100");   
		}
	} 
	
	else if (num2=="13020"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/korean.mp4");   
		}
	} 
	
	else if (num2=="13021"){   //   멀티미디어 자료_도입 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native6_language_m2.mp4");   
		}
	} 
	
	else if (num2=="13022"){   //   멀티미디어 자료_낭송 
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native6_language_m3.mp4");   
		}
	} 
	
	else if (num2=="13023"){   //   멀티미디어 자료_전체 줄거리
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_3_high_native_lang_Woo/Woo_native6_language_m4.mp4");  
		}
	} 
	
	
	//  문학(우한용)  
	else if (num2=="14001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture_Brochure.pdf", "Visang_Brochure_국어2편", "78");   
		}
	}
	
	else if (num2=="14002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture1.pdf", "문학-우한용 교과서", "110");   
		}
	} 
	
	else if (num2=="14003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture2.pdf", "문학-우한용 지도서", "110");   
		}
	} 
	
	else if (num2=="14004"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture3.pdf", "문학-우한용 교사용 교과서", "110");   
		}
	} 
	
	else if (num2=="14005"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_1.hwp", "문학(우한용) 선정사유", "100");   
		}
	} 
	
	else if (num2=="14006"){   //   교수 학습 자료_제재  학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_2.hwp", "고등_문학(우한용) 제재학습지", "100");   
		}
	} 
	
	else if (num2=="14007"){   //  교수 학습 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_3.pdf", "고등_문학(우한용) 수업PPT", "100");   
		}
	} 
	
	else if (num2=="14008"){   //   교수 학습 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_4.hwp", "고등_문학(우한용) 활동지", "100");   
		}
	} 
	
	else if (num2=="14009"){   //   교수 학습 자료_참고 자료
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_5.hwp", "고등_문학(우한용) 참고자료", "100");   
		}
	} 
	
	else if (num2=="14010"){   //   교수 학습 자료_더 읽어 보기
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_6.hwp", "고등_문학(우한용) 더읽어보기", "100");   
		}
	} 
	
	else if (num2=="14011"){   //   교수 학습 자료_단원별 성취 기준
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_7.hwp", "고등_문학(우한용) 단원별성취기준", "100");   
		}
	} 
	
	else if (num2=="14012"){   //   교수 학습 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture4_8.hwp", "고등_문학(우한용) 수업지도안", "100");   
		}
	} 	  
	
	else if (num2=="14013"){   //   평가 자료_쪽지 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture5_1.hwp", "고등_문학(우한용) 쪽지시험", "100");   
		}
	} 
	
	else if (num2=="14014"){   //   평가 자료_수능 기출 문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture5_2.hwp", "고등_문학(우한용) 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="14015"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture5_3.hwp", "고등_문학(우한용) 형성평가(1회)", "100");   
		}
	} 
	
	else if (num2=="14016"){   //   평가 자료_서술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture5_4.hwp", "고등_문학(우한용) 서술형평가", "100");   
		}
	} 
	
	else if (num2=="14017"){   //   평가 자료_대단원 모의고사
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture5_5.hwp", "고등_문학(우한용) 대단원모의고사", "100");   
		}
	} 
	
	else if (num2=="14018"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/korean.mp4");   
		}
	} 
	
	else if (num2=="14019"){   //   멀티미디어 자료_도입 영상 1
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture6_m2.mp4");   
		}
	} 
	
	else if (num2=="14020"){   //   멀티미디어 자료_도입 영상 2
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture6_m3.mp4");   
		}
	} 
	
	else if (num2=="14021"){   //   멀티미디어 자료_낭송(본문 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture6_m4.mp4");   
		}
	} 
	
	else if (num2=="14022"){   //   멀티미디어 자료_낭송(보기 시)
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture6_m5.mp4");   
		}
	} 
	
	else if (num2=="14023"){   //   멀티미디어 자료_전체 줄거리
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/10_4_high_culture_Woo/Woo_culture6_m6.mp4");   
		}
	} 
	
	
	//  독서와 문법(이관규)  
	else if (num2=="15001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_5_high_read_Lee/Lee_read_Brochure.pdf", "Visang_Brochure_국어3편", "78");   
		}
	}
	
	else if (num2=="15002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_5_high_read_Lee/Lee_read1.pdf", "독서와 문법 교과서", "110");   
		}
	} 
	
	else if (num2=="15003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_5_high_read_Lee/Lee_read2.pdf", "독서와 문법 지도서", "110");   
		}
	} 
	
	else if (num2=="15004"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_5_high_read_Lee/Lee_read3.pdf", "독서와 문법 교사용 교과서", "130");   
		}
	} 
	
	else if (num2=="15005"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_5_high_read_Lee/Lee_read4_1.hwp", "독서와 문법 선정사유", "78");   
		}
	} 
	
	
	//  화법과 작문(박영민)  
	else if (num2=="16001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/10_6_high_speech_Park/Park_speech_Brochure.pdf", "Visang_Brochure_국어3편", "78");   
		}
	}
	
	else if (num2=="16002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_6_high_speech_Park/Park_speech1.pdf", "화법과 작문 교과서", "130");   
		}
	} 
	
	else if (num2=="16003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_6_high_speech_Park/Park_speech2.pdf", "화법과 작문 지도서", "100");   
		}
	} 
	
	else if (num2=="16004"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_6_high_speech_Park/Park_speech3.pdf", "화법과 작문 교사용 교과서", "100");   
		}
	} 
	
	else if (num2=="16005"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/10_6_high_speech_Park/Park_speech4_1.hwp", "화법과 작문 선정사유", "100");   
		}
	} 
		
	
	//  사회(육근록)  
	else if (num2=="17001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society_Brochure.pdf", "Visang_Brochure_사회1편", "78");   
		}
	}
	
	else if (num2=="17002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society1.pdf", "고등사회 교과서", "100");   
		}
	} 
	
	else if (num2=="17003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society2.pdf", "사회 지도서", "100");   
		}
	} 
	
	else if (num2=="17004"){   //   교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society3.pdf", "사회 교사용 교과서", "100");   
		}
	} 
	
	else if (num2=="17005"){   //   교수 학습 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_1.hwp", "사회 선정사유", "100");   
		}
	} 
	
	else if (num2=="17006"){   //   교수 학습 자료_교과서 한글 파일
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_2.hwp", "고등 사회 교과서지문", "100");   
		}
	} 
	
	else if (num2=="17007"){   //  교수 학습 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_3.hwp", "고등 사회 수업지도안", "100");   
		}
	} 
	
	else if (num2=="17008"){   //   교수 학습 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_4.pdf", "고등 사회 수업PPT", "100");   
		}
	} 
	
	else if (num2=="17009"){   //   교수 학습 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_5.hwp", "고등 사회 활동지", "100");   
		}
	} 
	
	else if (num2=="17010"){   //   교수 학습 자료_학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society4_6.hwp", "고등 사회 학습지", "100");   
		}
	} 
	
	else if (num2=="17011"){   //   평가 자료_서술형 논술형평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society5_1.hwp", "고등 사회 서술형논술형", "100");   
		}
	} 
	
	else if (num2=="17012"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society5_2.hwp", "고등 사회 형성평가", "100");   
		}
	} 
	
	else if (num2=="17013"){   //   평가 자료_총괄 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society5_3.hwp", "고등 사회 총괄평가", "100");   
		}
	} 
	
	else if (num2=="17014"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/hssociety.mp4");   
		}
	} 
	
	else if (num2=="17015"){   //   멀티미디어 자료_플래시
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society6_m2.mp4");   
		}
	} 
	
	else if (num2=="17016"){   //   멀티미디어 자료_동영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_1_high_society_Yook/Yook_society6_m3.mp4");  
		}
	} 
	
	
	//  사회 . 문화(신형민)/경제(유종렬)
	else if (num2=="18001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society_Brochure.pdf", "Visang_Brochure_사회1편", "78");   
		}
	}
	
	else if (num2=="18002"){   //  교과서_사회문화(신형민)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/Shin_society.pdf", "사회문화 교과서", "100");   
		}
	} 
	
	else if (num2=="18003"){   //  교과서_경제(유종열)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/Ryu_economy.pdf", "경제 교과서", "100");   
		}
	} 
	
	else if (num2=="18004"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society1.pdf", "사회문화 지도서", "100");   
		}
	} 
	
	else if (num2=="18005"){   //   강의 노트
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society2.pdf", "사회문화 강의노트", "100");   
		}
	} 
	
	else if (num2=="18006"){   //   수업 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_1.hwp", "사회문화 선정사유", "100");   
		}
	} 
	
	else if (num2=="18007"){   //   수업 자료_교과서 한글 파일
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_2.hwp", "고등 사회문화 교과서지문", "100");   
		}
	} 
	
	else if (num2=="18008"){   //  수업 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_3.hwp", "고등 사회문화 수업지도안", "100");   
		}
	} 
	
	else if (num2=="18009"){   //   수업 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_4.pdf", "고등 사회문화 수업PPT", "100");   
		}
	} 
	
	else if (num2=="18010"){   //   수업 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_5.hwp", "고등 사회문화 활동지", "100");   
		}
	} 
	
	else if (num2=="18011"){   //   수업 자료_학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society3_6.hwp", "고등 사회문화 학습지", "100");   
		}
	} 
	
	else if (num2=="18012"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society4_1.hwp", "고등 사회문화 형성평가", "100");   
		}
	} 
	
	else if (num2=="18013"){   //   평가 자료_서술형 논술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society4_2.hwp", "고등 사회문화 서술형논술형", "100");   
		}
	} 
	
	else if (num2=="18014"){   //   평가 자료_총괄 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society4_3.hwp", "고등 사회문화 총괄평가(1회)", "100");   
		}
	} 
	
	else if (num2=="18015"){   //   평가 자료_수능 기출 문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_2_high_society/society4_4.hwp", "고등 사회문화 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="18016"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/society.mp4");   
		}
	} 
	
	else if (num2=="18017"){   //   멀티미디어 자료_플래시
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_2_high_society/society5_m2.mp4");   
		}
	} 
	
	else if (num2=="18018"){   //   멀티미디어 자료_동영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_2_high_society/society5_m3.mp4");  
		}
	}  
	
	
	//  생활과 윤리(조성민)
	else if (num2=="19001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral_Brochure.pdf", "Visang_Brochure_사회3편", "78");   
		}
	}
	
	else if (num2=="19002"){   //  교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral1.pdf", "생활과 윤리 교과서", "100");   
		}
	} 
	
	else if (num2=="19003"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral2.pdf", "생활과 윤리 지도서", "100");   
		}
	} 
	
	else if (num2=="19004"){   //  강의 노트
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral3.pdf", "생활과 윤리 강의노트", "100");   
		}
	} 
	
	else if (num2=="19005"){   //   수업 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_1.hwp", "생활과 윤리 선정사유", "100");   
		}
	} 
	
	else if (num2=="19006"){   //   수업 자료_교과서 한글 파일
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_2.hwp", "고등 생활과 윤리 교과서지문", "100");   
		}
	} 
	
	else if (num2=="19007"){   //  수업 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_3.hwp", "고등 생활과 윤리 수업지도안", "100");   
		}
	} 
	
	else if (num2=="19008"){   //   수업 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_4.pdf", "고등 생활과 윤리 수업PPT", "100");   
		}
	} 
	
	else if (num2=="19009"){   //   수업 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_5.hwp", "고등 생활과 윤리 활동지", "100");   
		}
	} 
	
	else if (num2=="19010"){   //   수업 자료_학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral4_6.hwp", "고등 생활과 윤리 학습지", "100");   
		}
	} 
	
	else if (num2=="19011"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral5_1.hwp", "고등 생활과 윤리 형성평가", "100");   
		}
	} 
	
	else if (num2=="19012"){   //   평가 자료_서술형 논술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral5_2.hwp", "고등 생활과 윤리 서술형논술형", "100");   
		}
	} 
	
	else if (num2=="19013"){   //   평가 자료_총괄 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_3_high_moral_Joh/Joh_moral5_3.hwp", "고등 생활과 윤리 총괄평가", "100");   
		}
	} 
	
	else if (num2=="19014"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/ethics.mp4");   
		}
	}  
	
	
	//  한국 지리(최규학)/세계 지리(위상복)
	else if (num2=="20001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/geography_Brochure.pdf", "Visang_Brochure_사회2편", "78");   
		}
	}
	
	else if (num2=="20002"){   //  한국 지리 (최규학)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/geography_korea_Che.pdf", "한국지리 교과서", "");   
		}
	} 
	
	else if (num2=="20003"){   //  세계 지리 (위상복)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/geography_world_Wee.pdf", "세계지리 교과서", "");   
		}
	} 
	
	else if (num2=="20004"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography1.pdf", "한국지리 지도서", "100");   
		}
	} 
	
	else if (num2=="20005"){   //  강의 노트
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography2.pdf", "한국지리 강의노트", "100");   
		}
	} 
	
	else if (num2=="20006"){   //   수업 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_1.hwp", "한국지리 선정사유", "100");   
		}
	} 
	
	else if (num2=="20007"){   //   수업 자료_교과서 한글 파일
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_2.hwp", "고등 한국지리 교과서지문", "100");   
		}
	} 
	
	else if (num2=="20008"){   //  수업 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_3.hwp", "고등 한국지리 수업지도안", "100");   
		}
	} 
	
	else if (num2=="20009"){   //   수업 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_4.pdf", "고등 한국지리 수업PPT", "100");   
		}
	} 
	
	else if (num2=="20010"){   //   수업 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_5.hwp", "고등 한국지리 활동지", "100");  
		}
	} 
	
	else if (num2=="20011"){   //   수업 자료_학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography3_6.hwp", "고등 한국지리 학습지", "100");   
		}
	} 
	
	else if (num2=="20012"){   //   평가 자료_서술형 논술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography4_1.hwp", "고등 한국지리 서술형논술형", "100");   
		}
	} 
	
	else if (num2=="20013"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography4_2.hwp", "고등 한국지리 형성평가", "100");   
		}
	} 
	
	else if (num2=="20014"){   //   평가 자료_총괄 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography4_3.hwp", "고등 한국지리 총괄평가(1회)", "100");   
		}
	} 
	
	else if (num2=="20015"){   //   평가 자료_수능 기출문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography4_4.hwp", "고등 한국지리 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="20016"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/geography.mp4");   
		}
	}  
	
	else if (num2=="20017"){   //   멀티미디어 자료_플래시
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography5_m2.mp4");   
		}
	} 
	
	else if (num2=="20018"){   //   멀티미디어 자료_동영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_4_high_geography/korea_geography5_m3.mp4");   
		}
	} 
	
	
	//  한국사(도면회)/동아시아사(황진상)/세계사(조한욱)
	else if (num2=="21001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/history_Brochure.pdf", "Visang_Brochure_사회4편", "78");   
		}
	}
	
	else if (num2=="21002"){   // 교과서_한국사 (도면회)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/history_korea_Do.pdf", "한국사 교과서", "");   
		}
	} 
	
	else if (num2=="21003"){   //  교과서_동아시아사 (황진상)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/history_asia_Whang.pdf", "고등 동아시아사 교과서", "");   
		}
	} 
	
	else if (num2=="21004"){   //  교과서_세계사 (조한욱)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/history_world_Joh.pdf", "세계사 교과서", "100");   
		}
	} 
	
	else if (num2=="21005"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history1.pdf", "한국사 지도서", "100");   
		}
	} 
	
	else if (num2=="21006"){   //  강의 노트
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history2.pdf", "한국사 강의노트", "100");   
		}
	} 
	
	else if (num2=="21007"){   //   수업 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_1.hwp", "한국사 선정사유", "100");   
		}
	} 
	
	else if (num2=="21008"){   //   수업 자료_교과서 한글 파일
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_2.hwp", "고등 한국사 교과서지문", "100");   
		}
	} 
	
	else if (num2=="21009"){   //  수업 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_3.hwp", "고등 한국사 수업지도안", "100");   
		}
	} 
	
	else if (num2=="21010"){   //   수업 자료_수업 PDF
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_4.pdf", "고등 한국사 수업PPT", "100");   
		}
	} 
	
	else if (num2=="21011"){   //   수업 자료_활동지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_5.hwp", "고등 한국사 활동지", "100");   
		}
	} 
	
	else if (num2=="21012"){   //   수업 자료_학습지
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_6.hwp", "고등 한국사 학습지", "100");   
		}
	} 
	
	else if (num2=="21013"){   //   수업 자료_사료집
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history3_7.hwp", "고등 한국사 사료집", "100");   
		}
	} 
	
	else if (num2=="21014"){   //   평가 자료_형성 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history4_1.hwp", "고등 한국사 형성평가", "100");   
		}
	} 
	
	else if (num2=="21015"){   //   평가 자료_서술형 논술형 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history4_2.hwp", "고등 한국사 서술형논술형", "100");   
		}
	} 
	
	else if (num2=="21016"){   //   평가 자료_총괄 평가
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history4_3.hwp", "고등 한국사 총괄평가", "100");   
		}
	} 
	
	else if (num2=="21017"){   //   평가 자료_수능 기출문제
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/11_5_high_history/korea_history4_4.hwp", "고등 한국사 수능기출문제", "100");   
		}
	} 
	
	else if (num2=="21018"){   //   멀티미디어 자료_교육과정 핵심 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/history.mp4");  
		}
	}  
	
	else if (num2=="21019"){   //   멀티미디어 자료_플래시
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_5_high_history/korea_history5_m2.mp4");   
		}
	} 
	
	else if (num2=="21020"){   //   멀티미디어 자료_동영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/11_5_high_history/korea_history5_m3.mp4");   
		}
	} 
	
	
	//  수학I/수학II/미적분I/미적분II/기하와 벡터/확률과 통계(김원경)
	else if (num2=="22001"){   
		if (target2=="blank") {  //  브로슈어 
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math_Brochure.pdf", "Visang_수학_브로슈어_0628_final_1", "78");   
		}
	}
	
	else if (num2=="22002"){   // 교과서_수학I (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_1.pdf", "수학I 교과서", "130");   
		}
	} 
	
	else if (num2=="22003"){   //  교과서_수학II (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_2.pdf", "수학II 교과서", "130");   
		}
	} 
	
	else if (num2=="22004"){   //  교과서_미적분I (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_3.pdf", "미적분I 교과서", "130");   
		}
	} 
	
	else if (num2=="22005"){   //  교과서_미적분II (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_4.pdf", "미적분II 교과서", "130");  
		}
	} 
	
	else if (num2=="22006"){   //  교과서_기하와 벡터 (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_5.pdf", "기하와 벡터교과서", "130");  
		}
	} 
	
	else if (num2=="22007"){   //  교과서_확률과 통계 (김원경)
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math1_6.pdf", "확률과 통계교과서", "130");   
		}
	} 
	
	else if (num2=="22008"){   //  지도서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math2.pdf", "수학I  지도서", "100");   
		}
	} 
	
	else if (num2=="22009"){   //  교사용 교과서
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math3.pdf", "수학I  교사용 교과서", "130");   
		}
	} 
	
	else if (num2=="22010"){   //   지도 자료_선정 사유
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math4_1.hwp", "수학 선정사유", "100");   
		}
	} 
	
	else if (num2=="22011"){   //   지도 자료_소단원 학습 정리
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math4_2.pdf", "수학Ⅰ 지도자료 소단원학습정리PPT", "100");   
		}
	} 
	
	else if (num2=="22012"){   //  지도 자료_대단원 지도 계획
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math4_3.hwp", "수학I 지도자료 대단원지도계획", "100");   
		}
	} 
	
	else if (num2=="22013"){   //   지도 자료_수업 지도안
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math4_4.hwp", "수학I 지도자료 수업지도안", "100");   
		}
	} 
	
	else if (num2=="22014"){   //   평가 자료_쪽지 시험
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math5_1.hwp", "수학Ⅰ 평가자료 쪽지시험(문제,정답)", "100");   
		}
	} 
	
	else if (num2=="22015"){   //   평가 자료_수준별 문제 plus
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math5_2.hwp", "수학Ⅰ 평가자료 수준별 문제 plus(문제,정답)", "100");   
		}
	} 
	
	else if (num2=="22016"){   //   평가 자료_대단원 test
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math5_3.hwp", "수학Ⅰ 평가자료 대단원 test", "100");   
		}
	} 
	
	else if (num2=="22017"){   //   평가 자료_서술형  ·  논술형
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math5_4.hwp", "수학Ⅰ 평가자료 서술형 · 논술형(문제,정답)", "100");   
		}
	} 
	
	else if (num2=="22018"){   //   평가 자료_집중 연습
		if (target2=="blank") {  
			view_URL("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math5_5.hwp", "수학Ⅰ 평가자료 집중 연습(문제,정답)", "100");   
		}
	} 
	
	else if (num2=="22019"){   //   멀티미디어 자료_교육과정 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/VS/Marketing/math.mp4");   
		}
	}  
	
	else if (num2=="22020"){   //   멀티미디어 자료_중단원 도입 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math6_m1.mp4");  
		}
	} 
	
	else if (num2=="22021"){   //   멀티미디어 자료_개념 플래시
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math6_m2.swf");   
		}
	} 
	
	else if (num2=="22022"){   //   멀티미디어 자료_코너별 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math6_m3.swf");  
		}
	} 
	
	else if (num2=="22023"){   //   멀티미디어 자료_인터뷰 영상
		if (target2=="blank") {  
			view_Movie("http://dn.vivasam.com/brochure/12_high_math_Kim/Kim_math6_m4.mp4");   
		}
	} 
	
		
}

// 뷰어
function view_URL(goUrl, title, resolution){    		
	if(resolution == undefined || resolution == "")resulution = 96;
	//location.href="/commonviewer/mobile_pop_viewer_text.do?docPath="+goUrl+"&title="+title+"&resolution="+resolution;
	
	var textD=confirm("모바일 환경에 따라 문서 로딩시간이 오래 걸릴 수 있습니다. 이점 양해 부탁 드립니다.");	
	if(textD){ 
		window.open("/commonviewer/mobile_pop_viewer_text.do?docPath="+goUrl+"&title="+title+"&resolution="+resolution);
		}else{
		return false;
	} 
}

// 동영상
function view_Movie(goUrl){   
	var textM = confirm("3G/4G 네트워크 사용 시 무선 테이터 이용료가 부과될 수 있습니다. WIFI 환경에서 다운로드를 권장합니다."); 	
	if(textM){ 
		window.open(goUrl);
		}else{
		return false;
	} 
}  


