
    var xmlDoc = null;
    var xslDoc = null;
    
    var MAXITEMCOUNT = 30;
    var VIEWTYPE = "1";
    
    var WaitMessage = "대기";
    var ErrorMessage = "오류";
    
    
    //var API_SERVICE_KEY = "8daf18aab732289eb618af38448af39c";
    var API_SERVICE_KEY = "56fc180e753ee4c8f76a7de4604023ae";
    
    var API_ISENCRYPT = "false";    
    
    var API_URL = "https://api.vivatem.com/api/xip/webservice/";
//    var API_URL = "http://dev.vivatem.visang.com/api/xip/webservice/";
    
    
   // var CONTEXTPATH_QBANK = "/renew_vivasam";
    var CONTEXTPATH_QBANK = "";
    
    // api xsl 위치 셋팅
    var API_FOLDER_XSL = CONTEXTPATH_QBANK+"/js/qbank/";
    
    var APINUM = 1;
    
    function doXSLT(id) { 
    	  
    	alert("id3="+id);
    	
    	  
    } 


    function doXSLT_onlyTile(id) { 
     	if (xmlDoc == null || xslDoc == null) return; 
      	var itemList = document.getElementById(id);

    	try {
    		var content = "";
	      	if (window.ActiveXObject) {	   
	      	    content = xmlDoc.transformNode(xslDoc);
	      	} else {
		        var xsltProc = new XSLTProcessor(); 
		        xsltProc.importStylesheet(xslDoc);  
		        var fragment = xsltProc.transformToFragment(xmlDoc, document); 
		        itemList.appendChild(fragment); 
				content = itemList.innerHTML;		    	
	      	}   							      
          	
          	content = content.replace(/&lt;/gi, "<");
          	content = content.replace(/&gt;/gi, ">");
          	content = content.replace(/&amp;/gi, "&");					
			content = content.replace(/fontfamily="batang"/gi, "").replace(/\/\/\/t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;");		

	      	itemList.innerHTML = content;

	    	MathJax.Hub.Queue(["Typeset", MathJax.Hub, itemList]);
      	} catch(e) {
        	//alert("doXSLT : " + e);
			return;		        
      	} 			    	
    } 
    
    
     function loadedItemsLML (id, xmlData)
     {
    	 //alert("xx");
    	 
     }
     
    function loadedItemsLMLTITLE(id, xmlData) {
        try {
          if (window.ActiveXObject) {       
            xmlDoc = new ActiveXObject("MSXML.DOMDocument"); // IE용 
            xmlDoc.async = false; 
            xmlDoc.loadXML(xmlData);        
          } else if (document.implementation.createDocument) {              
             xmlDoc = document.implementation.createDocument("","",null); // Mozilla, Firefox, Opera, 기타 용 
             xmlDoc = $.parseXML(xmlData);
          } else { 
             alert("XML을 사용 할 수 없는 브라우저입니다."); 
          }
        } catch(e) {
          alert(e);
        } 
        doXSLT_onlyTile(id);
      }
    
    
  
    function loadedItemsLML_V2(id, ANSWER, EXPLANATION, QUESTION,TYPE) {
    
    	
    	
    	 var htmlv2;
    	 
    	 if (QBANK_LAYOUT == "line" )
    	{
    		 //클래스 삽입
        	 $("#"+id).addClass("imgView");    
         
    		 //2단구성 (오류신고, 스크립뷰 등등..)
    		 if (TYPE != "34")    	 {
    			 htmlv2 = "<table><tr><td><img src='"+ QUESTION + "'  width='391px'  /><br><br></td>";
    			 htmlv2 += "<td width='33'>&#160;</td><td>"

    		    htmlv2 += "<div class='Ex_box2'>";
    		    htmlv2 += "	<div class='Justify'><img src='"+  ANSWER + "'  width='391px'  /></div>";
    		    
    		    	if (EXPLANATION !="")
    		    	{
    		      		htmlv2 += "<div class='Justify'><img src='"+  EXPLANATION + "'  width='391px'  /></div></div>";
        		   }
    		    	 htmlv2 += "</div>";

    				 
    			 htmlv2 += "</td></tr></table>";
    		 }

    	} 
    	else  if (QBANK_LAYOUT == "lineNew" )
    	{
    		
         //클래스 삽입
   		 //2단구성 (오류신고, 스크립뷰 등등..)
   		 if (TYPE != "34")    	 {
   			
   			$("#"+id).addClass("imgView");
   			 htmlv2 = "<table><tr><td><img src='"+ QUESTION + "'  width='391px'  /><br><br>";
   			 
   		    htmlv2 += "<div class='Ex_box2'>";
   		    htmlv2 += "	<div class='Justify'><img src='"+  ANSWER + "'  width='391px'  /></div>";
   		    
   		    	if (EXPLANATION !="")
   		    	{
   		      		htmlv2 += "<div class='Justify'><img src='"+  EXPLANATION + "'  width='391px'  /></div></div>";
       		   }
   		    	 htmlv2 += "</div>";

   				 
   			 htmlv2 += "</td></tr></table>";
   		 }
    	}
    	else 
    	{
    		//$("#"+id).addClass("imgView");
    		// 1단구성
	       	 if (TYPE == "34")    	 {
	       		 var htmlv2;
	       		 if (QBANK_LAYOUT != "noex" ) {
	       			
		    		 //클래스 삽입
		     		 $("#"+id).addClass("imgViewText");    
		     		
		       	   	 htmlv2 = "<table><tr><td>";
		       	   	 htmlv2 += "<img src='"+ QUESTION + "'  width='429px'  /><br><br>";		 
		       		 htmlv2 += "</td></tr>	</table>";
	       		 }
	       	   	
	       	 }
	       	 else {
		       		
	    		 //클래스 삽입
	       		   $("#"+id).addClass("imgView");    
		       	   if (QBANK_NA == "A")
		    	   {
		    		   
		    		  
		    		   QBANK_NUMBER++;
		    		   APINUM = QBANK_NUMBER;
		    		 
		    	   }
		    	   else {
		    		   
		    		   if (QBANK_NUM_L_R == "R")
		    		   {
		    			  
		    			  
		    			   QBANK_NUMBER2++;    		
		    			   APINUM = QBANK_NUMBER2;
		        		
		    		   }
		    		   else {
		    			  
		    			  
		    			   QBANK_NUMBER++;    		
		    			   APINUM = QBANK_NUMBER;
		        		 
		    		   }      		   
		    	   }    		
	    			       		 
	       		 
	       		 
	       		 htmlv2 = "<table><tr><th><p>"+ APINUM +"</p></th><td>";    	 
	           	 
	       		 htmlv2 += "<img src='"+ QUESTION + "'  width='391px'  /><br><br>"    	 
	       		 
	       		 if (VIEWTYPE=="1")
	       		{
	       			 htmlv2 += "<div class='imgBox'  style='display:none;'>"
	       		}
	       		 else {
	       			htmlv2 += "<div class='imgBox' >";
	       		 }
	       		 
	       		 if (ANSWER != "")
	       		 {
	       			 if (VIEWTYPE=="1")
	       			{
	       				htmlv2 += "<span class='imgANEX'><img src='"+  ANSWER + "'  width='391px' /><br><br></span>"	 
	       			} else {
	       				htmlv2 += "<span class='imgANEX'><img src='"+  ANSWER + "'  width='391px'  /><br><br></span>"
	       			}
	       			     	     	 
	       		 }
	       		 
	       		 if (EXPLANATION != "")
	       		 {
	       			
	       			 if (VIEWTYPE=="1")
		       			{
		       				if (EXPLANATION !="")
		        		    {
		       					htmlv2 += "<span class='imgANEX' ><img src='"+  EXPLANATION + "' width='391px' /><br><br></span>"
		        		    }
		       			} else {
		       				if (EXPLANATION !="")
		        		    {
		       				htmlv2 += "<span class='imgANEX'><img src='"+  EXPLANATION + "'  width='391px'  /><br><br></span>"
		        		    }
		       			}
	       		 }
	       		htmlv2 += "</div>"
	       		 
	       		 
	       		 
	       		 
	       		 
	       		 htmlv2 += "</td></tr>	</table>";
	           	 
	          
	       	 }
    	}
    	 
    	 
    	 $("#"+id).append(htmlv2);
    	
    	 
    	 
    }

   function loadedtitleXsl()
   {
	   
	   var _xslname = API_FOLDER_XSL + "item.xsl";
	   
	   $.ajax({
	        type: "GET",
	        url: _xslname,
	        async : false,
	        dataType: (navigator.userAgent.indexOf("IE") != -1) ? "text" : "xml",
	        success: function(data) {      
	          if (window.ActiveXObject) {  
	            xslDoc = new ActiveXObject("MSXML.DOMDocument"); // IE용 
	            xslDoc.async = false; 
	            xslDoc.loadXML(data);   
	            //console.debug(data);
	          } else {   
	            xslDoc = data;     
	          }
	        }
	   });
   }
    
    
    
   function loadedItemsJSON(jsonData) {

	 loading = true;
	   
     var itemsData = jsonData;       
   

     
      if (itemsData.ITEMS) {
    	  
    	  var arrIDs = strArrView.split("|");
    	  
    	  if($.isArray(itemsData.ITEMS.ITEM)) {
    		  for(var ij = 0;ij < itemsData.ITEMS.ITEM.length;ij++)
              {  
    			
    			  //$("#viewmsg").append(itemsData.ITEMS.ITEM[ij].ITEM_ID + "<br />");
    			  
    			loadedItemsLML_V2(arrIDs[ij+1] , itemsData.ITEMS.ITEM[ij].CORRECT_ANSWER_IMAGE , itemsData.ITEMS.ITEM[ij].EXPLANATION_IMAGE , itemsData.ITEMS.ITEM[ij].QUESTION_IMAGE ,itemsData.ITEMS.ITEM[ij].TYPE_ID);
    			  
         		if(itemsData.ITEMS.ITEM[ij].TYPE_ID != "34")
         	    {
         		 itemView(itemsData.ITEMS.ITEM[ij],arrIDs[ij+1]);	 
         		}
              }
    	  }
    	  else {
    		  
    		  loadedItemsLML_V2(arrIDs[1] , itemsData.ITEMS.ITEM.CORRECT_ANSWER_IMAGE , itemsData.ITEMS.ITEM.EXPLANATION_IMAGE , itemsData.ITEMS.ITEM.QUESTION_IMAGE,itemsData.ITEMS.ITEM.TYPE_ID);
    		  
 	  		 //지문처리
 	  		 if(itemsData.ITEMS.ITEM.TYPE_ID != "34")
 	  	     {
 	  			itemView(itemsData.ITEMS.ITEM,arrIDs[1]);	 
 	  		 }
    	  }
      }
    }


   
   function loadOpenAPI(url) {
	   
	   url = url.replace("110.45.169.30/","vivatem.doq.kr/")
	   url += "&viewType=IMAGE";
	   
       var jsonPath = url;
       $.ajax({
          type:"GET",  
          url:jsonPath,
          jsonpCallback : "loadedItemsJSON",
          dataType:"jsonp",
          async : false
      });
   }
   
   
   
   var strArrView;
   
   
   var QBANKFA = 0;
   function OpenAPI(xslName,urlApi, _arrView , fa) {
	   
	  
	   
	   //xmlDoc = null;
	   //xslDoc = null;	    

	   strArrView = _arrView;
	   var _xslname = API_FOLDER_XSL + xslName + ".xsl";

	   var _url = API_URL + urlApi;
	   _url +=  "&IsEncrypt="+API_ISENCRYPT;
	   _url +=  "&SERVICE_KEY="+API_SERVICE_KEY;	   
	   //$("#viewmsg").append(urlApi + "<br />");
	   loadOpenAPI(_url);
	   
   }
   
   
   //1. JSON 데이타만 가져오기
   function loadOpenAPIJS(urlApi,callback) {
	   var _url = API_URL + urlApi;
	   _url += "&IsEncrypt="+API_ISENCRYPT;
	   _url += "&SERVICE_KEY="+API_SERVICE_KEY;	   

	
	   
	   
       $.ajax({
          type:"GET",
          url:_url,
          jsonpCallback : callback,
          dataType:"jsonp"
      });
   }
   
   //1. JSON 데이타만 가져오기
   function loadOpenVivasamJS(urlApi,callback) {
	 
	   $.ajax({
          type:"GET",
          url:urlApi,
          jsonpCallback : callback,
          dataType:"jsonp"
      });
   }
   
   
   
/*----------------------------------------------------------
* 
*  공통
*  OpenAPI(xslName,urlApi,_arrayView, arrView)
*  loadOpenAPI(url) xml : divtag
*---------------------------------------------------------- */

// select option 추가
   function appendOption(obj,id,txt,selected) {
	   
	   if (id=="ADD") {
		   $(obj).append("<option style='background-color:#999;' value='"+ id +"'>"+ txt +"</option>");
	   } else {
		   $(obj).append("<option value='"+ id +"'>"+ txt +"</option>");   
	   }
       
   }
   
   function appendOptionV2(objname,code,val)
   {
	   
	   $("#"+objname).append("<option value='"+ code +"'>"+ val +"</option>");
			   
   }
   
   function clearOptionV2(objname)
   {
	   $("#"+objname).html("<option>선택</option>");
   }
   
   //select option 삭제
   function clearOption(obj) {
	   $(obj).html("<option value=''>선택</option>");

	}
   

   

