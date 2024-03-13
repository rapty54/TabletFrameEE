
/*URL 콜백함수 요청하면 JSON DATA 리턴됨.*/
function callQbankjson(api_url,callback)
{      
	
	loadOpenAPIJS(api_url,callback);
}

/*
 *  obj : string div ID 입력
 *  _layout : line (2단),빈값 (1단)
 *  _xsl : qbank_all(문제+해설) ,qbank_noexplain (문제)
 *  items_id : 문항아이디 |
 */
var _publicLayout = "";
var QBANK_ING = true;
var unitLvl = 0;
var unitcode = "";
var btntype = "";

var QBANK_NUM_L_R ="L";

var QBANK_NUMBER = 0;
var QBANK_NUMBERADD = 0;
var QBANK_NUMBER2 = 0;




function callQbankview_new(obj,_layout,_xsl,items_id,_unitLvl,_unitcode,_btntype)
{		
	

	QBANK_NA = "N";
	
	if (QBANK_NUM_L_R == "R")
	{
		QBANK_NUMBER2 = 0;
	}
	
	
	btntype = _btntype;
	
	unitLvl = _unitLvl;
	unitcode = _unitcode;
	
	QBANK_LAYOUT = _layout;
	
	_publicLayout = obj;
	var _url ="Items?Action=SelectItemsByIds&itemIds=" + items_id;
	
	//MAX 문항수 셋팅
	//var arrayView = new Array(200);
	
	//화면 초기화
	$("#"+obj).html('');

	//items_id 가 한개인 경우
	var _itemCount = 0;
	if ((items_id+"_").indexOf('|') < 0)
	{
		_itemCount= 1;
	}
	else {
		_itemCount = items_id.split('|').length;	
	}
	
	var classtxt = "";
	if (_layout =="line")
	{
		classtxt = "class='parallel'";	
	}
	
	if (_layout =="lineNew")
	{
		classtxt = "class='parallel'";	
	}
	
	var arrView = "S";
	
    for(var i = 0;i<= _itemCount*2 ;i++)
    {
        $("#"+obj).append(" <div id='"+ obj + "_" + i +"' " + classtxt + " ></div> ");        
        arrView += "|" + obj+"_"+ i;
    }

    
    // XML 호출시작
    OpenAPI(_xsl,_url, arrView ,0 );

}


function callQbankview(obj,_layout,_xsl,items_id,_unitLvl,_unitcode,_btntype)
{	
	
	QBANK_NA = "N";
	
	if (QBANK_NUM_L_R == "R")
	{
		QBANK_NUMBER2 = 0;
	}
	
	
	btntype = _btntype;
	
	unitLvl = _unitLvl;
	unitcode = _unitcode;
	
	QBANK_LAYOUT = _layout;
	
	_publicLayout = obj;
	var _url ="Items?Action=SelectItemsByIds&itemIds=" + items_id;
	
	//MAX 문항수 셋팅
	//var arrayView = new Array(200);
	
	//화면 초기화
	$("#"+obj).html('');

	//items_id 가 한개인 경우
	var _itemCount = 0;
	if ((items_id+"_").indexOf('|') < 0)
	{
		_itemCount= 1;
	}
	else {
		_itemCount = items_id.split('|').length;	
	}
	
	var classtxt = "";
	if (_layout =="line")		
	{
		classtxt = "class='parallel'";	
	}
	
	if (_layout =="lineNew")
	{
		classtxt = "class='parallel'";	
	}
	
	var arrView = "S";
	 
    
    for(var i = 0;i<= _itemCount*2 ;i++)
    {
    		
    	if (QBANK_LAYOUT != "line"  && QBANK_LAYOUT != "lineNew" ) {
    		$("#"+obj).append(" <div class='qView_info' style='display:none;' id='"+ obj + "_" + i +"_explan" +"'></div> ");    	
    	}
    	
    	else {
    		$("#"+obj).append(" <dl id='"+ obj + "_" + i +"_explan" +"'  style='display:none;'></dl> ");
    	}
        
        $("#"+obj).append(" <div id='"+ obj + "_" + i +"' " + classtxt + " ></div> ");        
        $("#"+obj).append(" <div id='"+ obj + "_" + i +"_btn" +"'></div> ");
        
        arrView += "|" + obj+"_"+ i;
        
       // arrayView[i] = obj+"_"+ i;             
    }
    
    // XML 호출시작
    OpenAPI(_xsl,_url, arrView ,0 );
    
    //$('#spinnerId').data().spinner.stop();
    
    /*
    for(var i = 0;i<= _itemCount*2 ;i++)
    {
    	 if ($( "#"+ obj  + "_" + i +"_explan" ).html() == "")
         {
      	   $( "#"+ obj  + "_" + i +"_explan" ).remove();
         }
    }
    */
    
}


var QBANK_LAYOUT = "";
var QBANK_NA = "";


function callQbankAddViewPaging(obj,_layout,_xsl,items_id,_unitLvl,_unitcode,_btntype,startNum)
{	
	
	QBANK_NUMBER = (startNum-1)*20;
	QBANK_NUMBER2 = (startNum-1)*20;
	
	
	QBANK_NA = "A";
	
	
	QBANK_LAYOUT = _layout;
	
	
	btntype = _btntype;
	
	unitLvl = _unitLvl;
	unitcode = _unitcode; 
	_publicLayout = obj;
	var _url ="Items?Action=SelectItemsByIds&itemIds=" + items_id;
	//MAX 문항수 셋팅
	//var arrayView = new Array(200);
	//화면 초기화
	
	//	$("#"+obj).html('');

	//items_id 가 한개인 경우
	var _itemCount = 0;
	if ((items_id+"_").indexOf('|') < 0)
	{
		_itemCount= 1;
	}
	else {
		_itemCount = items_id.split('|').length;	
	}
		
	
	var classtxt = "";
	if (_layout =="line")
	{
		classtxt = "class='parallel'";	
	}
	
	if (_layout =="lineNew")
	{
		classtxt = "class='parallel'";	
	}

	var arrView = "S";
    for(var i = 0;i<= _itemCount*2 ;i++)
    {

    	var idNum = i + (startNum * 3);
    	
        
       

    	if (QBANK_LAYOUT != "line" && QBANK_LAYOUT != "lineNew" ) {
    		 $("#"+obj).append(" <div  class='qView_info' style='display:none;' id='"+ obj  + "_" + idNum +"_explan" +"'></div> ");
    	}    	
    	else {
    		 $("#"+obj).append(" <dl id='"+ obj  + "_" + idNum +"_explan" +"' style='display:none;'></dl> ");
    	}
        
        $("#"+obj).append(" <div id='"+ obj + "_" + idNum +"' " + classtxt + " ></div> ");        
        $("#"+obj).append(" <div id='"+ obj + "_" + idNum +"_btn" +"'></div> ");
        
        
        arrView += "|" + obj+"_"+ idNum;
        
        //arrayView[i] = obj+"_"+ idNum;             
    }
    // XML 호출시작
    OpenAPI(_xsl,_url, arrView ,1); 
/*    
    for(var i = 0;i<= _itemCount*2 ;i++)
    {
    	var idNum = i + (startNum * 3);
   
    	 if ($( "#"+ obj  + "_" + idNum +"_explan" ).html() == "")
         {
      	   $( "#"+ obj  + "_" + idNum +"_explan" ).remove();
         }
    }
*/
}



function callQbankAddView(obj,_layout,_xsl,items_id,_unitLvl,_unitcode,_btntype,startNum)
{	
	
	
		
	QBANK_NA = "A";
	
	
	QBANK_LAYOUT = _layout;
	
	
	btntype = _btntype;
	
	unitLvl = _unitLvl;
	unitcode = _unitcode; 
	_publicLayout = obj;
	var _url ="Items?Action=SelectItemsByIds&itemIds=" + items_id;
	//MAX 문항수 셋팅
	//var arrayView = new Array(200);
	//화면 초기화
	
	//	$("#"+obj).html('');

	//items_id 가 한개인 경우
	var _itemCount = 0;
	if ((items_id+"_").indexOf('|') < 0)
	{
		_itemCount= 1;
	}
	else {
		_itemCount = items_id.split('|').length;	
	}
		
	
	var classtxt = "";
	if (_layout =="line" || _layout =="lineNew" )
	{
		classtxt = "class='parallel'";	
	}
	

	var arrView = "S";
    for(var i = 0;i<= _itemCount*2 ;i++)
    {

    	var idNum = i + (startNum * 3);
    	

    	if (QBANK_LAYOUT != "line"  && QBANK_LAYOUT != "lineNew" ) {
    		 $("#"+obj).append(" <div  class='qView_info' style='display:none;' id='"+ obj  + "_" + idNum +"_explan" +"'></div> ");
    	}
    	else {
    		 $("#"+obj).append(" <dl id='"+ obj  + "_" + idNum +"_explan" +"' style='display:none;'></dl> ");
    	}
        
        $("#"+obj).append(" <div id='"+ obj + "_" + idNum +"' " + classtxt + " ></div> ");        
        $("#"+obj).append(" <div id='"+ obj + "_" + idNum +"_btn" +"'></div> ");
        
        
        arrView += "|" + obj+"_"+ idNum;
        
        //arrayView[i] = obj+"_"+ idNum;             
    }
    // XML 호출시작
   OpenAPI(_xsl,_url, arrView ,1); 
/*    
    for(var i = 0;i<= _itemCount*2 ;i++)
    {
    	var idNum = i + (startNum * 3);
   
    	 if ($( "#"+ obj  + "_" + idNum +"_explan" ).html() == "")
         {
      	   $( "#"+ obj  + "_" + idNum +"_explan" ).remove();
         }
    }
*/
}

function changeLvl(val)
{
	if (val == "5" || val == "4")
	{
		return "<img src='"+CONTEXTPATH_QBANK+"/images/wizard/ico/level_h.gif'>";
	}
	else if (val == "3")
	{
		return "<img src='"+CONTEXTPATH_QBANK+"/images/wizard/ico/level_m.gif'>";
	}
	else if(val == "2" || val == "1")
	{
		return "<img src='"+CONTEXTPATH_QBANK+"/images/wizard/ico/level_l.gif'>";
	}
	return "-";
}

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
};


var itemSave_ID = "S";


function itemView(obj,IdName)
{	

	//alert(obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[5].codeName);
	if(obj.TYPE_ID != "34")
    {
		if (btntype!="9")
	    {		
			//+ obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].Title +
	        //지문이 아니면
		   var qbanktypeName = "";
		   var qbanktypeName2 = "";
		   var nrow = 0;
		   if ( $.isArray(obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA) )
		   {
			   for(var i2=0;i2 < obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA.length ; i2++ )
			  {
				   if (obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA[i2].Depth1ID != "7" )
				   {
					   qbanktypeName2 = obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA[i2].ValutAreaName;
					   
					   if (nrow>0)
					   {
							   qbanktypeName += "\n";
					   }
						qbanktypeName += "ㆍ" + obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA[i2].ValutAreaName;
						
						nrow++;
				   }
		      }
			   
			  if (nrow > 1)
			  {
				  qbanktypeName = qbanktypeName2 +" <img src='"+ CONTEXTPATH_QBANK +"/images/wizard/ico/more2.png' alt='"+ qbanktypeName  +"'  title='"+ qbanktypeName  +"' > ";  
			  } else {
				  qbanktypeName = qbanktypeName2;
			  }
		   }
		   else 
		   {
			   qbanktypeName = obj.ITEM_VALUT_AREAS.ITEM_VALUT_AREA.ValutAreaName;
		   }
		   //qbanktypeName

		   var unit1_name=  "";
		   var unit2_name=  "";
		   
		 //선택 단원 정보 
		   var QBUNIT0 = ""; // 영역
		   var QBUNIT1 = ""; // 교과서
		   var QBUNIT2 = ""; // 대단원
		 
		   
		   
		   if($.isArray(obj.ITEM_CHAPTERS.ITEM_CHAPTER)) {
			   if (unitcode=="")
			   {
				   try {
					   
					 unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
					  
					 if (obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[1].code=="3")
					  {
						 unit2_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName;					 
						 unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[7].codeName
					  } else {
						  unit2_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName;					 
					      unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[5].codeName
					  }
					 
					 //unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
					 //unit2_name += " > "  + CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code );
					 
					 QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
					 QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
					 QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[0].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;					 
					 
					 //alert("0."+QBUNIT0);
				  
				   }
				   catch(e) {}
			   }
			   else {
				   
				  var qbank_p =true;
				   
				   for (var ix=0; ix< obj.ITEM_CHAPTERS.ITEM_CHAPTER.length;ix++ )
				   {
							   
					  try
					  {
						  // 문항 단원 배열 수가 안 맞을 수 있음.
						  
						   if (obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[1].code=="3")
						   {
							   //영어 세부1
							   var x_code ="";
							   x_code = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[7].code;
							   if (unitcode.indexOf(x_code) >= 0 && qbank_p )
							   {
								   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
								   //unit2_name =  obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName;
								   unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   unit2_name += " > "  +  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[7].code ) ;
								   
								   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
								   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
								   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
								   
								  // unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[7].codeName
								   //unit2_name =  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   qbank_p = false;
							   }
							   x_code = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
							   if (unitcode.indexOf(x_code) >= 0 && qbank_p )
							   {
								   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
								   
								   //unit2_name =  obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName;
								   //unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[7].codeName;
								   
								   unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   unit2_name += " > "  +  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[7].code );
								   
								   
								   qbank_p = false;
								   //unit2_name =  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   
								   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
								   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
								   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
								   
							   }
						   }
						   else {
							   
							   //영어외 세부1
							   var x_code = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
							   if (unitcode.indexOf(x_code) >= 0 &&  qbank_p)
							   {
								   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
								   
								  // unit2_name =  obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName								   
								   //unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].codeName
								   unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   //unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].codeName+ "<--2";
								   unit2_name = unit2_name + " > " +  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code );
								   
								   qbank_p = false;
								   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
								   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
								   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;								   
								   
							   }
							   
							   x_code = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
							   if (unitcode.indexOf(x_code) >= 0 &&  qbank_p)
							   {
								   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
								   
								   //unit2_name =  obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].codeName								  
								   //unit2_name += " > "  + obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].codeName
								   
								   unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
								   unit2_name += " > "  + CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code );
								   

								   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
								   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
								   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER[ix].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
								   
								   qbank_p = false;
							   }
							   
						   }
						}
						catch(e) {}
					}			   
					
			   }
		   }
		   else {
			   try {
				   
				   if (obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[1].code=="3")
				  {
					   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;					 
					   unit2_name =   CALLUNIT1(obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
					   unit2_name += " > "  +  CALLUNIT1(obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[7].code );
					   
					   
					   
					   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
					   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
					   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
					   
					}
				   else {
					   
					   unit1_name = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[3].codeName;
					   
					   
					   
					   unit2_name =   CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code );
					   unit2_name = unit2_name + " > " +  CALLUNIT1( obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code ) ;
					   

					   QBUNIT0 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[2].code;
					   QBUNIT1 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
					   QBUNIT2 = obj.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				   }
				   
				   
				   
			   }
			   catch(e) {}
		   }
		   
		   
		   unit1_name = CALLUNIT0(unit1_name,QBUNIT1);
		  
		 if (unit2_name != "" )
		 {
			 // 단원정보가 있는 경우 
			 if (QBANK_LAYOUT != "line" && QBANK_LAYOUT != "lineNew" ) {
		
				   $( "#"+IdName+"_explan" ).append("<table><colgroup><col width='14%' /><col width='*' /><col width='14%' /><col width='18%' /></colgroup><tr><th>단&nbsp;원</th><td colspan='5' class='bold'>"+ unit1_name + " > " +  unit2_name +"</td>	</tr><tr><th>평가영역</th><td> " + qbanktypeName + " </td><th>난이도</th><td>"+ changeLvl(obj.LEVEL_CODE) +"</td><th>번호</th><td>"+ obj.ITEM_ID +"</td></tr></table>");
				  // $( "#"+IdName+"_explan" ).append("<table><colgroup><col width='14%' /><col width='*' /><col width='14%' /><col width='18%' /></colgroup><tr><th>단&nbsp;원</th><td colspan='3' class='bold'>"+  unit2_name +"</td>	</tr><tr><th>평가영역</th><td> " + qbanktypeName + " </td><th>난이도</th><td>"+ changeLvl(obj.LEVEL_CODE) +"</td></tr></table>");		      
			   }		
			   else {
		
				   $( "#"+IdName+"_explan" ).append("<dt>단원 : " + unit1_name + " > " + unit2_name + " </dt>");
				   //$( "#"+IdName+"_explan" ).append("<dt>단원 : " + unit2_name + " </dt>");
				   $( "#"+IdName+"_explan" ).append("<dd><span class='qbank_explan_level'>번호 : "+ obj.ITEM_ID +" </span><span class='qbank_explan_level'>난이도 : "+ changeLvl(obj.LEVEL_CODE) +" </span><span class='qbank_explan_test' >평가영역 : " + qbanktypeName + " </span></dd>");
				      
			   }
		
			 
		 }
		 else {
			 
			  // 단원정보가 없는 경우 예외 처	 
			  if (QBANK_LAYOUT != "line" && QBANK_LAYOUT != "lineNew" ) {
		
				   $( "#"+IdName+"_explan" ).append("<table><colgroup><col width='14%' /><col width='*' /><col width='14%' /><col width='18%' /></colgroup><tr><th>평가영역</th><td> " + qbanktypeName + " </td><th>난이도</th><td>"+ changeLvl(obj.LEVEL_CODE) +"</td></tr></table>");
				  // $( "#"+IdName+"_explan" ).append("<table><colgroup><col width='14%' /><col width='*' /><col width='14%' /><col width='18%' /></colgroup><tr><th>단&nbsp;원</th><td colspan='3' class='bold'>"+  unit2_name +"</td>	</tr><tr><th>평가영역</th><td> " + qbanktypeName + " </td><th>난이도</th><td>"+ changeLvl(obj.LEVEL_CODE) +"</td></tr></table>");		      
			   }		
			   else {
				   //$( "#"+IdName+"_explan" ).append("<dt>단원 : " + unit2_name + " </dt>");
				   $( "#"+IdName+"_explan" ).append("<dd><span class='qbank_explan_level'>번호 : "+ obj.ITEM_ID +" </span><span class='qbank_explan_level'>난이도 : "+ changeLvl(obj.LEVEL_CODE) +" </span><span class='qbank_explan_test' >평가영역 : " + qbanktypeName + " </span></dd>");
				      
			   }
		 }
		 
		   if (QBANK_LAYOUT == "line" || QBANK_LAYOUT == "lineNew" ) {
			   document.getElementById(IdName+"_explan").className = "qbank_explan";
		   }
		   
		   document.getElementById(IdName+"_explan").style.display="";
		   
	       var btnHtml = "";       
	       
	       if (btntype == "1")
	       {
	    	   btnHtml = "";
	    	   btnHtml += "<span  class='sideL'> \n";
	    	   
	    	   //btnHtml += "  <input type='button' value='제거' onclick=\"" + _publicLayout+"_click1" + "('"+obj.ITEM_ID+"')\" > \n";
	    	   btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/remove.png' onclick=\"" + _publicLayout+"_click1" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           
	           
	    	   btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/change.png' onclick=\"" + _publicLayout+"_click2" + "('"+obj.ITEM_ID+"','" + QBUNIT1+"_"+QBUNIT0 + "','" + QBUNIT2 + "')\"  ></a> \n";
	           //  btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click2" + "('"+obj.ITEM_ID+"')\" value='교체' > \n";
	           btnHtml += "</span>";
	           btnHtml += "<span  class='sideR'> \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/error.png' onclick=\"error_click3('"+obj.ITEM_ID+"')\"  ></a> \n";
	           
	           
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click3" + "('"+obj.ITEM_ID+"')\" value='오류신고' > \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/scrap.png' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           //btnHtml += "  <input type='button' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\" value='스크랩' > \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn";   
	       }
	       else if (btntype=="2")
	       {
	    	   btnHtml = "";
	           btnHtml += "<span  class='sideR'> \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/error.png' onclick=\"error_click3('"+obj.ITEM_ID+"')\"  ></a> \n";
	          // btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click3" + "('"+obj.ITEM_ID+"')\" value='오류신고' > \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/scrap.png' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	          // btnHtml += "  <input type='button' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\" value='스크랩' > \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn"; 
	       }
	       else if (btntype=="3")
	       {
	    	   btnHtml = "";
	    	   btnHtml += "<span  class='sideL'> \n";
	           
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/scrap.png' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/error.png' onclick=\"error_click3('"+obj.ITEM_ID+"')\"  ></a> \n";
	          //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click4" + "('"+obj.ITEM_ID+"')\" value='오류신고' > \n";
	           btnHtml += "</span>";
	           btnHtml += "<span  class='sideR'> \n";
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click5" + "('"+obj.ITEM_ID+"')\" value='문항선택' > \n";        
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/select.png' onclick=\"" + _publicLayout+"_click5" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn"; 
	       }       
	       else if (btntype=="4")
	       {
	    	   btnHtml = "";
	           btnHtml += "<span  class='sideR'> \n";
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click1" + "('"+obj.ITEM_ID+"')\" value='제거' > \n";    
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/remove.png' onclick=\"" + _publicLayout+"_click1" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn"; 
	       }           
	       else if (btntype=="5")
	       {
	    	   btnHtml = "";
	    	   btnHtml += "<span  class='sideL'> \n";
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click2" + "('"+obj.ITEM_ID+"')\" value='교체' > \n";
	    	   btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/change.png' onclick=\"" + _publicLayout+"_click2" + "('"+obj.ITEM_ID+"','" + QBUNIT1+"_"+QBUNIT0 + "','" + QBUNIT2 + "')\"  ></a> \n";
	           btnHtml += "</span>";
	           btnHtml += "<span  class='sideR'> \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/error.png' onclick=\"error_click3('"+obj.ITEM_ID+"')\"  ></a> \n"; 
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click3" + "('"+obj.ITEM_ID+"')\" value='오류신고' > \n";
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/scrap.png' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	          // btnHtml += "  <input type='button' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\" value='스크랩' > \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn"; 
	       }
	       else if (btntype=="6")
	       {
	    	   btnHtml = "";
	    	   btnHtml += "<span  class='sideL'> \n";
	           
	           //btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/scrap.png' onclick=\"openScrapingLayer" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           //btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/error.png' onclick=\"error_click3('"+obj.ITEM_ID+"')\"  ></a> \n";
	          //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click4" + "('"+obj.ITEM_ID+"')\" value='오류신고' > \n";
	           btnHtml += "</span>";
	           btnHtml += "<span  class='sideR'> \n";
	           //btnHtml += "  <input type='button' onclick=\"" + _publicLayout+"_click5" + "('"+obj.ITEM_ID+"')\" value='문항선택' > \n";        
	           btnHtml += "  <a href='javascript:void(0)'><img src='"+CONTEXTPATH_QBANK+"/images/wizard/btn/select.png' onclick=\"" + _publicLayout+"_click5" + "('"+obj.ITEM_ID+"')\"  ></a> \n";
	           btnHtml += "</span>";
	           
	           $( "#"+IdName+"_btn" ).append( btnHtml );
	           document.getElementById(IdName+"_btn").className = "qbank_btn"; 
	       }       
	      
	    }
	       if (QBANK_LAYOUT != "line") {
	    	   /*
	    	   //alert(QBANK_NUMBER + " / "+ QBANK_NUMBER2 + " / " + QBANK_NUM_L_R);
	    	   if (QBANK_NA == "A")
	    	   {
	    		   QBANK_NUMBER++;
	    		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >"+  QBANK_NUMBER  + ". </strong>" );   
	    	   }
	    	   else {
	    		   
	    		   if (QBANK_NUM_L_R == "R")
	    		   {
	    			   QBANK_NUMBER2++;    		   
	        		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >"  +  QBANK_NUMBER2  + ". </strong>" );
	    		   }
	    		   else {
	    			   QBANK_NUMBER++;    		 
	        		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >"  +  QBANK_NUMBER  + ". </strong>" );   
	    		   }      		   
	    	   }
	    	   */
	       }
/*
       if (QBANK_LAYOUT != "line") {
    	   
    	   //alert(QBANK_NUMBER + " / "+ QBANK_NUMBER2 + " / " + QBANK_NUM_L_R);
    	   if (QBANK_NA == "A")
    	   {
    		   QBANK_NUMBER++;
    		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >["+ obj.ITEM_ID +"]" +  QBANK_NUMBER  + ". </strong>" );   
    	   }
    	   else {
    		   
    		   if (QBANK_NUM_L_R == "R")
    		   {
    			   QBANK_NUMBER2++;    		   
        		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >["+ obj.ITEM_ID +"]"  +  QBANK_NUMBER2  + ". </strong>" );
    		   }
    		   else {
    			   QBANK_NUMBER++;    		 
        		   $( "#"+IdName + ' .queTxt').prepend( "<strong style='font-size: 14px' class='qbank_number' >["+ obj.ITEM_ID +"]"  +  QBANK_NUMBER  + ". </strong>" );   
    		   }      		   
    	   }
       }
      
       */
       
    }
	
	 QBANK_ING = true;
	 
	 /*
     if ($( "#"+IdName+"_explan" ).html() == "")
     {
  	   $( "#"+IdName+"_explan" ).remove();
     }
     */
}

var qnumber = 1;

//나의 시험지 오픈팝업
function openManage()
{
	var popOption = "width=801, height=712, resizable=no, scrollbars=yes, status=no;";    //팝업창 옵션(optoin)
	window.open(CONTEXTPATH_QBANK+"/qbank/pop_mManage.do","",popOption);

}

var UNITTITLE;

function CALLUNIT0(val)
{
	
	return val.replace("1-1","①").replace("1-2","①").replace("2-1","②").replace("2-2","②").replace("3-1","③").replace("3-2","③");
	
}


function CALLUNIT0(val,code)
{
	
	///alert(code);
	
	if (code=="253" || code=="222" || code=="224" || code=="254" || code=="223" || code=="225" )
	{
		return val.replace("1-1","①").replace("1-2","①").replace("2-1","②").replace("2-2","②").replace("3-1","③").replace("3-2","③");
		
	} else {
		return val;	
	}
}

function CALLUNIT1(code)
{
	if($.isArray(UNITTITLE)) {
		for(var i=0;i<UNITTITLE.length;i++)
		{
			if (code ==  UNITTITLE[i].code)
			{
				return UNITTITLE[i].name;
				break;
			}
		}
	}
	else {
		return "";
	}
	
}


function UINITTITLE()
{
	  //단원정보 가져오기qbank_code.do?code
    var aurl = CONTEXTPATH_QBANK+"/qbank/qbank_code.do?code=0&type=TITLE_UNIT1";
    
    $.ajax({
     type: "GET",
     url: aurl,
     cache: false,
     async: true,        
     data : {vivasamformat : "json"},
     success: function(data){
  	    
    	 UNITTITLE = data;
  	    //alert(data[0].code);
  	    //alert(data.length);
      
         },
         error: function (xhr, ajaxOptions, thrownError){
                // alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
             }, 
         complete:function (xhr, textStatus){                
            // alert("idx:\n\ncomplete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
            
         }         
      }); 	
}

function imageView(imgurl)
{
	   
	   window.open(CONTEXTPATH_QBANK+"/html/imgviewer/imgview.html?imgurl="+imgurl,"imgview","width=10,height=10,left=45, top=15, scrollbars=yes, menubar=no,resizable=no,directories=no,location=no")
}



