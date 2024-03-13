
    var xmlDoc = null;
    var xslDoc = null;

    function doXSLT(id) { //XML파일을 XSL형식으로 HTML로 변경하는 함수
      if (xmlDoc == null || xslDoc == null) return; 
      var itemList = document.getElementById(id); //id=itemList 인 태그 객체생성: 아래 의 div객체 생성

      if (window.ActiveXObject) { //일반 브라우저(익스플로어)       
        itemList.innerHTML = xmlDoc.transformNode(xslDoc);  //XML파일을 XSL형식으로 HTML로 변경 : HTML형태로 출력
      } else { //특정 브라우저(크롬,파폭등..)
        var xsltProc = new XSLTProcessor(); //객체생성
        xsltProc.importStylesheet(xslDoc);  //XSL파일 형식으로 세팅
        var fragment = xsltProc.transformToFragment(xmlDoc, document); //XML -> XSL형식으로 ->HTML병경
        itemList.appendChild(fragment); //itemList노드의 마지막 자식 노드로 설정.(div추가)

        if (navigator.userAgent.indexOf("Firefox") != -1) {
          var content = itemList.innerHTML;
          content = content.replace(/&lt;/gi, "<");
          content = content.replace(/&gt;/gi, ">");
          content = content.replace(/&amp;/gi, "&");
          itemList.innerHTML = content;
        }      
      }    

      MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("itemList")]);
    } 

    function loadedItemsLML(id, xmlData) {
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

      doXSLT(id);
    }

   
   function loadedItemsJSON(jsonData) {

     var itemsData = jsonData;
     
     callback(jsonData);
       
   
     
      if (itemsData.ITEMS) {
    	  
    	
    	 for(var ij = 0;ij < itemsData.ITEMS.ITEM.length;ij++)
         {
    
    		 loadedItemsLML(arrayView[ij], itemsData.ITEMS.ITEM[ij].ITEM_XML);
    		 
    		 if(itemsData.ITEMS.ITEM[ij].TYPE_ID != "34")
    	     {
    			 divtag(itemsData.ITEMS.ITEM[ij],ij);	 
    		 }
    		 
         }
    	  

        
      }
    }

   function loadOpenAPI(url) {
      
	  
       var jsonPath = url;
       $.ajax({
          type:"GET",  
          url:jsonPath,
          jsonpCallback : "loadedItemsJSON",
          dataType:"jsonp",
          async : false,
      });
   }
   
   function loadOpenAPITWO(url,callback) {
	   
	   OpenAPI("","");
	   
       var jsonPath = url;
       $.ajax({
          type:"GET",
          url:jsonPath,
          jsonpCallback : callback,
          dataType:"jsonp"
      });
   }
   
   
   var callbackfn;
   
  var arrayView;
   
   function OpenAPI(xslName,urlApi,_arrayView) {
	   xmlDoc = null;
	   xslDoc = null;
	    
	   arrayView = _arrayView;
	   
	   	if (xslName == "")
	   		xslName = "/qbank/item/view/items.xsl";
	   
	   	if (urlApi == "")
	   		urlApi = "http://vivatem.visangesl.com/api/xip/webservice/Items?Action=SelectItemsByIds&IsEncrypt=false&itemIds=9785|1704|1708|1705|9562|9563|8126|11377|9749|1169|11380&SERVICE_KEY=8daf18aab732289eb618af38448af39c"
	   		 
	      $.ajax({
	        type: "GET",
	        url: xslName,
	        async : false,
	        dataType: (navigator.userAgent.indexOf("IE") != -1) ? "text" : "xml",
	        success: function(data) {      
	          if (window.ActiveXObject) {  
	            xslDoc = new ActiveXObject("MSXML.DOMDocument"); // IE용 
	            xslDoc.async = false; 
	            xslDoc.loadXML(data);   
	          } else {   
	            xslDoc = data;     
	          }
	      
	          loadOpenAPI(urlApi);
	       
	        }
	      });
	    }
   
   
   function callbackCall(val1,fn1) {
	   
	   if (typeof fn1 =="function")
	   {
		   fn1(val1);
	   }
	   
   }
   
   function loadOpenAPIJS(url,callback) {
	      
       var jsonPath = url;
       $.ajax({
          type:"GET",
          url:jsonPath,
          jsonpCallback : callback,
          dataType:"jsonp"
      });
   }
   
   
   /*----------------------------------------------------------
    * 
    *  공통
    * 
    *---------------------------------------------------------- */
   
// select option 추가
   function appendOption(obj,id,txt) {
       var option = new Option( txt,id, true);
       obj.options[obj.length] = option;
   }

   //select option 삭제
   function clearOption(obj) {        
          obj.options.length = 0;
          appendOption(obj,"","선택하세요");
   }
   
   

