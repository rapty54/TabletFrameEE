
		function contentView(obj,data,objname,keyword)
		{
			var html = "";	
			var lnbCode = "";
			
			for(var i=0;i<data.length;i++)
	        {
				
				var schoolLevel = data[i].dataSub[0].schoolLevel;
				var textbookCode = data[i].dataSub[0].textbookCode;
				var textBook = data[i].dataSub[0].textBook;
				var unit1Code = data[i].dataSub[0].unit1Code;
				var unit1 = data[i].dataSub[0].unit1;
				var schoolYear = data[i].dataSub[0].schoolYear;
				var educourseId = data[i].dataSub[0].educourseId;
				var type1 = data[i].dataSub[0].type1name;
				var type2 = data[i].dataSub[0].type2name;
				var type1Code = data[i].dataSub[0].type1;
				var type2Code = data[i].dataSub[0].type2;
				
				var schoolGrade = data[i].dataSub[0].schoolGrade;
				var schoolTerm = data[i].dataSub[0].schoolTerm;
				var courseCd = data[i].dataSub[0].courseCd;
				
				if (unit1Code=="")
				{
					unit1Code = textbookCode;
				}
				
				if (schoolLevel == "NES" && textbookCode != "" && schoolGrade != "" && schoolTerm != "" && courseCd != "") {
					lnbCode	= "NES-"+ textbookCode +"-"+ schoolGrade +"-"+ schoolTerm +"-"+ courseCd;	
				}
				else {
					if ( obj =="spc")
					{
						lnbCode	= "A-"+ textbookCode +"-"+ type2Code;
					} else if (obj =="ope") {
						lnbCode	= type1Code;
					}
					else {
						lnbCode	= "A-"+ textbookCode +"-"+ unit1Code;
					}	
				}
				
				
				html += "<li>";
				if (data[i].fileType == "FT201" || data[i].fileType == "FT203"  )
				{
				
					
					html += "<div class='areaL'>";
					
					if ( obj =="spc")
					{
						html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";
					} else if (obj =="ope") {
						html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";
					}
					else {
					
						html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";
					}
					
					
					html += "			<img src=\"" + data[i].thumbnail + "\" class='thumbImg' alt='" + data[i].subject + "' />";
					html += "		</a>";
					html += "</div>";	
				}
				
				
				html += "<div class='areaC'>";
				html += "<dl>";
				html += "	<dt>";
				
				if ( obj =="spc")
				{
					//준회원의 경우 특화자료이면서 과학 교과목에 해당되면 권한 제한
					if (MEMLEVEL == "AU400" && educourseId == "103011" && type2Code.substring(0,3) == "303") {
						html += "<a href=\"javascript:memLevelAlert('eleEvalData');\" onclick=''>";
					}
					else {
						html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";
					}
				} else if (obj =="ope") {
					html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";
				}
				else {
					//준회원이면서 평가자료인 경우 권한 제한
					if (type1Code == "1110002" && MEMLEVEL == "AU400") {
						html += "<a href=\"javascript:memLevelAlert('eleEvalData');\" onclick=''>";
					}
					else {
						html += "<a href=\"javascript:ContentView2015('"+ lnbCode +"' ,'"+data[i].contentGubun+"','"+data[i].contentId+"');\" onclick=''>";	
					}
				}
				//html += "		<img src='../../images/new/ico_korean.gif' alt='한글파일' />";
				
				
				if (data[i].fileType != "")
				{
					var arr = data[i].filename.split(".");
		          	var ext = arr[arr.length-1];          	
		          	html+="<img src='"+CONTEXTPATH +"/images/common/icon/ico_"+ ext.toLowerCase() +".png' alt='' /> ";
		          			          		
				}
				
	          	
				if (data[i].subject != "")
				{
				
				
				//	html +=  data[i].subject.replace(keyword,"<font color='blue'>"+ keyword +"</font>");
					html +=  data[i].subject.replace(keyword,"<span style='color:#111111;font-weight:bold'>"+ keyword +"</span>");

				}
				
				
				html += "	</a></dt>";
				
				if (data[i].fileType != "")
				{
					html += "<dd class='imgblank'>";
				} else {
					html += "<dd>";					
				}
				
				if ( obj =="spc" ||  obj =="ope")
				{
				          
				} else {
					
					var schoolLevelN = "";
					if (schoolLevel=="ES" || schoolLevel=="NES")
					{
						schoolLevelN = "초등";
					}
					else if  (schoolLevel=="MS")
					{
						schoolLevelN = "중학";				
					}
					else if  (schoolLevel=="HS")
					{
						schoolLevelN = "고등";				
					}
					
					if (schoolLevelN != "" && textBook != "")
						html +=  schoolLevelN + " &gt; "+ textBook;
					else if( schoolLevelN != "" )
						html +=  schoolLevelN; 
					else if( textBook != "" )
						html +=  textBook;
						
					
				}
				
				/*
				if ( obj !="spc" && obj !="ope") {
					if (schoolYear!="")
					{
						html += "	<img src='"+CONTEXTPATH +"/images/new/ico_"+ schoolYear +"new_02.png' alt='"+ schoolYear +"' />";	
					}
				}
				*/
				
				var strtype = "";
				
				if ( obj =="spc")
				{
					
					strtype +=  type1 + " > "+ type2 +" [특화자료]";
					
				} else if (obj =="ope") {
					
					strtype +=  " 열린자료 > 라이브러리 > " + type1;
					
				}
				else {
					
					
					if ( type1Code.substring(0,3) == "238")
					{
						strtype += type1 +" 평가자료";
					} else 
					{
						strtype += "	["+ type1 +"]" ;	
					}
				}

				html += strtype;
				
				
				html += "	</dd>";
				html += "</dl>";
				html += "</div>";
				
				html += "<div class='areaR'>";
				if ( obj =="spc")
				{
					//준회원의 경우 특화자료이면서 과학 교과목에 해당되면 권한 제한
					if (MEMLEVEL == "AU400" && educourseId == "103011" && type2Code.substring(0,3) == "303") {
						html += "<a href=\"javascript:memLevelAlert('eleEvalData');\" onclick=''>";
					}
					else {
						html += "<a href=\"javascript:viewFolder2015( '"+data[i].contentGubun+"-"+data[i].contentId+"','"+ lnbCode +"')\" >";	
					}
	        	} else if (obj =="ope") {
	        		html += "<a href=\"javascript:viewFolder2015( '"+data[i].contentGubun+"-"+data[i].contentId+"','"+lnbCode +"')\" >";
	        	}
				else {			
					//준회원이면서 평가자료인 경우 권한 제한
					if (type1Code == "1110002" && MEMLEVEL == "AU400") {
						html += "<a href=\"javascript:memLevelAlert('eleEvalData');\" onclick=''>";
					}
					else {
						html += "<a href=\"javascript:viewFolder2015( '"+data[i].contentGubun+"-"+data[i].contentId+"','"+ lnbCode +"')\" >";
					}
				}
										
				html += "<img src='"+CONTEXTPATH +"/images/new/btn_put_03.gif' alt='' />";						
				html += "</a>";	
				
				if(data[i].downyn=="Y")
				{
					//초등 평가자료와 중고등 평가자료 유형분류에 대한 준회원 권한 체크
					if (MEMLEVEL == "AU400" && ((type1Code.substring(0, 3) == '238'  && type1Code.length == 6) || type1Code == "1110002")) {
						html += "<a href=\"javascript:memLevelAlert('eleEvalData')\" >";						
						html += "<img src='"+CONTEXTPATH +"/images/new/btn_down_03.gif' alt='' />";						
						html += "</a>";
					}
					else {
						html += "<a href=\"javascript:go_DownloadFile('ID', '"+data[i].contentGubun+"-"+data[i].contentId+"')\" >";						
						html += "<img src='"+CONTEXTPATH +"/images/new/btn_down_03.gif' alt='' />";						
						html += "</a>";	
					}					
				} else {
					html += "<img src='"+CONTEXTPATH +"/images/new/btn_down_03_no.gif' alt='' />";
				}
				

				
				
				html += "</div>";
				html += "</li>";
	        }
			
			if(objname == "detail"){
				$("#period_" + objname).html('');
			}
			
			$("#"+objname).html(html);
			
		}
		

		function contentViewCRE(obj,data,objname,keyword)
		{
			var html = "";	
			
			for(var i=0;i<data.length;i++)
	        {
				
				html += "<li>";
				if ( data[i].thumbnail != "" )
				{
					html += "<div class='areaL'>";
					html += "<a href=\"javascript:CreateView('"+data[i].ext2+"' ,'"+data[i].contentId+"');\" onclick=''>";
					html += "			<img src='" + data[i].thumbnail + "' class='thumbImg' alt='" + data[i].subject + "' />";
					html += "		</a>";
					html += "</div>";	
				}
				
				
				html += "<div class='areaC'>";
				html += "<dl>";
				html += "	<dt>";
				
			
				html += "<a href=\"javascript:CreateView('"+data[i].ext2+"' ,'"+data[i].contentId+"');\" onclick=''>";
				
				//html += "		<img src='../../images/new/ico_korean.gif' alt='한글파일' />";
				
				html +=  data[i].subject.replace(keyword,"<span style='color:#111111;font-weight:bold'>"+ keyword +"</span>");
	//			html +=  data[i].subject.replace(keyword,"<span style='color: '>"+ keyword +"</span>");
				
				
				html += "	</a></dt>";
				
			
				html += "<dd>";					
			
				html +=  "창의적 체험활동 > " + data[i].ext1;          
				html += "	</dd>";
				html += "</dl>";
				html += "</div>";
				
				html += "<div class='areaR'>";
				html += "<a href=\"javascript:CreateView('"+data[i].ext2+"' ,'"+data[i].contentId+"');\" onclick=''>";
				html += "<img src='"+CONTEXTPATH +"/images/new/btn_go_06.gif' alt='바로가기' />";
				html += "</a>";
				
				html += "</div>";
				html += "</li>";
	        }

			/*
			if (data.length > 0)
			{
				$("#"+obj+"Cnt").html("("+ data[0].totalCnt +")");
			} else {
				$("#"+obj+"Cnt").html("(0)");
			}
			*/
			
			if(objname == "detail"){
				$("#period_" + objname).html('');
			}
			
			$("#"+objname).html(html);
			
		}
		
		//차시별 자료 그려주기
		function contentViewPER(obj, data, objname, keyword) {
			var html = "";
			
			for(var i = 1; i < data.length; i++) {
				
				var lnbCode = "A-" + data[i].textbook + "-" + data[i].unit1;
				
				if(data[i].docDataList != null && data[i].docDataList.length > 0){
					html += "<tr class='bdr_b_none'>";
				} else { 
					html += "<tr>"; 
				}
				
				html += "<th class='chasiTitle' style='background-image:none;'>";
				html += "<div>";
				html += "<a href=\"javascript:periodPop('" + data[i].periodId + "', '" + lnbCode + "');\">";
				html += data[i].periodName.replace(keyword, "<span style='color:#111111;font-weight:bold'>" + keyword + "</span>");
				html += "</a>";
				html += "</div>";
				html += "<em>초등 > " + data[i].textbookNm + " [차시별 자료]</em>"
				html += "</th>";
				
				html += "<th class='chasiTitle' colspan='2'>";
				html += "<a href=\"javascript:periodPop('" + data[i].periodId + "', '" + lnbCode + "');\" class='btn_chasiview'>";
				html += "<img src='" + CONTEXTPATH + "/images/period/chasi/btn_chasiview.gif' alt='차시창 보기' title='차시창 보기' />";
				html += "</a>";
				html += "</th>";
				
				if(data[i].docDataList != null && data[i].docDataList.length > 0){
					
					html += "<tr>";
					html += "<td class='title'>";
					html += "<ul id=period" + data[i].periodId + " class='chkset_chasi'>";
					
					$(data[i].docDataList).each(function(index, docData){
						
						var arr = docData.saveFileName.split(".");
			          	var ext = arr[arr.length-1];          	
						
						html += "<li>";
						html += "<input type='checkbox' name='checkPeriod' value='" + docData.contentGubun + "-" + docData.contentId + "'/>";
						html += "<div>";
						
						if(docData.fileType == 'FT211' || docData.fileType == 'FT212'){
							html += "<a href=\"javascript:popViewer('" + docData.contentGubun + "', '" + docData.contentId + "', '" + lnbCode + "');\" onclick=''>";
						} else {
							html += "<a href=\"javascript:ContentView2015('" + lnbCode + "', '" + docData.contentGubun + "', '" + docData.contentId + "');\" onclick=''>";
						}
						
						html += "<img src='" + CONTEXTPATH + "/images/common/icon/ico_" + ext.toLowerCase() + ".png' alt='' /> ";
						html += "<span title='" + docData.title + "'>" + docData.title + "</span>";
						html += "</a>";
						html += "</div>";
						html += "</li>";
						
					});
					
					html += "<td class='putBtn'>";
					html += "<a href=\"javascript:periodDocDownAndInsert('" + data[i].periodId + "', 'A-" + data[i].textbookCd + "-" + data[i].lnbCode + "', 'insert')\" >";	
					html += "<img src='" + CONTEXTPATH + "/images/new/btn_put_03.gif' alt='' />";
					html += "</a>";
					html += "</td>";
				
					html += "<td class='downBtn'>";
					html += "<a href=\"javascript:periodDocDownAndInsert('" + data[i].periodId + "', '', 'down')\" >";						
					html += "<img src='" + CONTEXTPATH + "/images/new/btn_down_03.gif' alt='' />";						
					html += "</a>";
					html += "</td>";
					
					html += "</ul>";
					html += "</td>";
					html += "</tr>";
					
				}	
			}
			
			if(objname == "detail"){
				$("#"+objname).html('');
				$("#period_" + objname).html(html);	//차시 자료 상세 검색리스트 영역
				
				return;
			}
			
			$("#"+objname).html(html);
		}
		
		function CreateView(type,seq)
		{
		    	
		    var pageLink = "";
			var arr = type.split("-");
	      	if ( arr[1] == "RS011"  )
	      	{
	      		pageLink = "createDetail.do?pageNo=1&pageSize=10";
	      	} 
	      	else  if ( arr[1] == "RS021"  )
	      	{
	      		pageLink = "createDetailrs21.do?pageNo=1&pageSize=12";
	      	}
	      	else  if ( arr[1] == "RS012"  )
	      	{
	      		pageLink = "createDetailrs12.do?pageNo=1&pageSize=9";
	      	}
	    	else  if ( arr[1] == "RS022"  )
	      	{
	      		pageLink = "createDetailrs22.do?pageNo=1&pageSize=10";
	      	}
	    	else  if ( arr[1] == "RS032"  )
	      	{
	      		pageLink = "createDetailrs32.do?pageNo=1&pageSize=10";
	      	}
	    	else  if ( arr[1] == "RS013"  )	      	
	    	{
	    		window.open(seq,"view","");
	    		return;
	      	}
	      	var shref= CONTEXTPATH + "/create/"+pageLink+"&idx="+seq+"&keywordType=&keyword=&searchTypeCd="+ arr[1]  +"&searchTypeCd2="+ arr[2]  +"&searchTypeCd3=";
	      	
	      	window.open(shref,"view","");
		}
		
		//게시판 페이징
		function Paging(TotalCnt, PageSize, CurPage, pagingDiv, fnName) {
				
		    $(pagingDiv).html("");
		    var TotalPage = Math.ceil(TotalCnt / PageSize);
		    
	
		    
		    //alert(TotalPage);
		    
		    if (TotalPage < 11) {
		        //prev
		        
		        for (var i = 1; i < TotalPage + 1 ; i++) {
		            var html = "";
		            if (CurPage == i) {
		                html = "<a class=\"on\" style=\"cursor:default;\"><b>" + i + "</b></a>";
		            }
		            else {
		                html = "<a href='javascript:" + fnName + "("+ i +")' >" + i + "</a>";
		            }
		            $(pagingDiv).append(html);
		        }
		        //next
		        
		 
		    }
		    else {
		 
		        var preChar = "";
		        if (String(CurPage).substr(String(CurPage).length - 1, 1) == "0") {
		            preChar = String(CurPage - 10).slice(0, -1);
		        }
		        else {
		            preChar = String(CurPage).slice(0, -1);
		        }
		 
		        //prev
		        if (CurPage > 10) {
		        	   
		        	var html = "<a class='btn2' href='javascript:" + fnName + "(1)'  > <img src='"+CONTEXTPATH +"/images/new/paging_first.gif' width='9' height='7' alt='' /> </a>";
		        	html += "<a class='btn'  href='javascript:" + fnName + "("+ (((Number(preChar)) * 10)) +")'  > <img src='"+CONTEXTPATH +"/images/new/paging_prev.gif' width='4' height='7' alt='' />  </a>";
		            $(pagingDiv).append(html);
		         
		        }
		        
		 
		        for (var i = 1; i < 11 ; i++) {
		            var html = "";
		            if ((Number(preChar) * 10 + i) < Number(TotalPage) + 1) {
		                if (CurPage == (Number(preChar) * 10 + i)) {
		                    html = "<a class=\"on\" >" + (Number(preChar) * 10 + i) + "</a>";
		                }
		                else if (i == 10) {
		                    html = "<a  href='javascript:" + fnName + "("+ ((Number(preChar) + 1) * 10) +")'  >" + ((Number(preChar) + 1) * 10) + "</a>";
		                }
		                else {
		                    html = "<a  href='javascript:" + fnName + "("+  (Number(preChar) * 10 + i) +")'  >" + (Number(preChar) * 10 + i) + "</a>";
		                }
		                $(pagingDiv).append(html);
		            }
		            else {
		                break;
		            }
		        }
		 
		        //next
		        if (TotalPage > (Number(String(CurPage - 1).slice(0, -1)) + 1) * 10) {
		        	 
		        	var html = "<a class='btn btnNext'  href='javascript:" + fnName + "("+ (((Number(preChar) + 1) * 10) + 1)  +")'  >  <img src='"+CONTEXTPATH +"/images/new/paging_next.gif' width='4' height='7' alt='' /> </a>";
		            html += "<a class='btn2'    href='javascript:" + fnName + "("+ TotalPage +")'  >  <img src='"+CONTEXTPATH +"/images/new/paging_last.gif' width='9' height='7' alt='' /> </a>";
		            $(pagingDiv).append(html);
		            
		            
		        }
		        else {
		            var html = "<a class='btn btnNext'  ></a>";
		            $(pagingDiv).append(html);
		        }
		 
		    }
	   }
		
	   function appendOption(objname,code,val)
	   {
		   
		   $("#"+objname).append("<option value='"+ code +"'>"+ val +"</option>");
				   
	   }
	   
	   function clearOption(objname,code,val)
	   {
		   $("#"+objname).html("<option value='"+ code +"'>"+ val +"</option>");
	   }