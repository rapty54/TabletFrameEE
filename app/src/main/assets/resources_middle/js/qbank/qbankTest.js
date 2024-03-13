
	    
	    
	    function unitSelectBok( jsonData ) {

			var dataObj = jsonData.XipChapterGroupLists.XipChapterGroupList;
			var dataLeng = dataObj.length;
			
			
			var arryUnit0Cnt = 0;
			var arryUnit1Cnt = 0;
			var arryUnit2Cnt = 0;
			
			var tmpArryUnit0Cnt = 0;
			var tmpArryUnit1Cnt = 0;
			var tmpArryUnit2Cnt = 0;

			for ( var i=0; i < dataLeng ; i++ ) {
				

/* 		    	console.log("-----------------------------------------------------------------------");
		    	console.log("data cnt        : " + i );
		    	console.log("chapterLevel    : " + dataObj[i].chapterLevel );
 */
				if ( dataObj[i].chapterLevel == "0" ) {

					arryUnit0Cnt++;
					
					arryUnit1Cnt = 0;
					arryUnit2Cnt = 0;
					
					tmpArryUnit0Cnt = arryUnit0Cnt;
				}

				if ( dataObj[i].chapterLevel == "1" ) {
					
					arryUnit1Cnt++;
					
					arryUnit2Cnt = 0;

					if ( tmpArryUnit1Cnt < arryUnit1Cnt ) {
						tmpArryUnit1Cnt = arryUnit1Cnt;
					}
				}
				
				if ( dataObj[i].chapterLevel == "2" ) {
					
					arryUnit2Cnt++;
					
					if ( tmpArryUnit2Cnt < arryUnit2Cnt ) {
						tmpArryUnit2Cnt = arryUnit2Cnt;
					}
				}
			}

	    	console.log("-----------------------------------------------------------------------");
	    	console.log("tmpArryUnit0Cnt : " + tmpArryUnit0Cnt );
	    	console.log("tmpArryUnit1Cnt : " + tmpArryUnit1Cnt );
	    	console.log("tmpArryUnit2Cnt : " + tmpArryUnit2Cnt );
	    	console.log("-----------------------------------------------------------------------");

			var arrySubjectId = new Array();
			var arrySubjectName = new Array();
			var arryChapterId = new Array();
			var arryChapterName = new Array();
			 
			var i = 0;
			
			for ( i = 0 ; i < tmpArryUnit0Cnt ; i++ ) {

				arrySubjectId[i] = new Array(tmpArryUnit1Cnt+1);
				arrySubjectName[i] = new Array(tmpArryUnit1Cnt+1);
				arryChapterId[i] = new Array(tmpArryUnit1Cnt+1);
				arryChapterName[i] = new Array(tmpArryUnit1Cnt+1);
				
				for ( var j = 0 ; j <= tmpArryUnit1Cnt ; j++ ) {

					arrySubjectId[i][j] = new Array(tmpArryUnit2Cnt+1);
					arrySubjectName[i][j] = new Array(tmpArryUnit2Cnt+1);
					arryChapterId[i][j] = new Array(tmpArryUnit2Cnt+1);
					arryChapterName[i][j] = new Array(tmpArryUnit2Cnt+1);
				}
			}

			arryUnit0Cnt = 0;
			arryUnit1Cnt = 0;
			arryUnit2Cnt = 0;
			
			for(var i=0; i < dataLeng ; i++) {
				
				if ( dataObj[i].chapterLevel == "0" ) {

			    	console.log("");
			    	console.log("-----------------------------------------------------------------------");
			    	console.log("chapterLevel[" + i + "] : " + dataObj[i].chapterLevel );
			    	console.log("-----------------------------------------------------------------------");
			    	
					if ( i != 0 )  arryUnit0Cnt++;		//	unit0의 배열 수 를 증가시킨다
					
					arryUnit1Cnt = 0;
					arryUnit2Cnt = 0;
					
			    	arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].subjectId;
					arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].subjectName;
					arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].chapterId;
					arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].chapterName;

			    	console.log("arrySubjectId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arrySubjectName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("-----------------------------------------------------------------------");
				}
				
				if ( dataObj[i].chapterLevel == "1" ) {

			    	console.log("");
			    	console.log("-----------------------------------------------------------------------");
			    	console.log("chapterLevel[" + i + "] : " + dataObj[i].chapterLevel );
			    	console.log("-----------------------------------------------------------------------");
			    	
					if ( arryUnit1Cnt == 0 ) { 
						arryUnit1Cnt = 1;
					} else {
						arryUnit1Cnt++;		//	unit0의 배열 수 를 증가시킨다
					}
					
					arryUnit2Cnt = 0;

			    	arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].subjectId;
					arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].subjectName;
					arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].chapterId;
					arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].chapterName;

			    	console.log("arrySubjectId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arrySubjectName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("-----------------------------------------------------------------------");
				}

				if ( dataObj[i].chapterLevel == "2" ) {

			    	console.log("");
			    	console.log("-----------------------------------------------------------------------");
			    	console.log("chapterLevel[" + i + "] : " + dataObj[i].chapterLevel );
			    	console.log("-----------------------------------------------------------------------");

			    	arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].subjectId;
					arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].subjectName;
					arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt]   = dataObj[i].chapterId;
					arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] = dataObj[i].chapterName;

			    	console.log("arrySubjectId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arrySubjectId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arrySubjectName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arrySubjectName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterId[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "]   : " + arryChapterId[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("arryChapterName[" + arryUnit0Cnt + "][" + arryUnit1Cnt + "][" + arryUnit2Cnt + "] : " + arryChapterName[arryUnit0Cnt][arryUnit1Cnt][arryUnit2Cnt] );
			    	console.log("-----------------------------------------------------------------------");
					
					arryUnit2Cnt++;		//	unit0의 배열 수 를 증가시킨다
				}
				
		    	console.log("subjectId   : " + dataObj[i].subjectId );
		    	console.log("subjectName : " + dataObj[i].subjectName );
		    	console.log("chapterId   : " + dataObj[i].chapterId );
		    	console.log("chapterName : " + dataObj[i].chapterName );
		    	console.log("-----------------------------------------------------------------------");
		    	
				
			}

			console.log("-----------------------------------------------------------------------");
	    	console.log("arrySubjectId[0][0][0]   : " + arrySubjectId[0][0][0] );
			console.log("arrySubjectName[0][0][0] : " + arrySubjectName[0][0][0] );
			console.log("arryChapterId[0][0][0]   : " + arryChapterId[0][0][0] );
	    	console.log("arryChapterName[0][0][0] : " + arryChapterName[0][0][0] );
	    	console.log("-----------------------------------------------------------------------");
	    	console.log("arrySubjectId[1][0][0]   : " + arrySubjectId[1][0][0] );
			console.log("arrySubjectName[1][0][0] : " + arrySubjectName[1][0][0] );
			console.log("arryChapterId[1][0][0]   : " + arryChapterId[1][0][0] );
	    	console.log("arryChapterName[1][0][0] : " + arryChapterName[1][0][0] );
	    	console.log("-----------------------------------------------------------------------");
	    	console.log("arrySubjectId[2][0][0]   : " + arrySubjectId[2][0][0] );
			console.log("arrySubjectName[2][0][0] : " + arrySubjectName[2][0][0] );
			console.log("arryChapterId[2][0][0]   : " + arryChapterId[2][0][0] );
	    	console.log("arryChapterName[2][0][0] : " + arryChapterName[2][0][0] );
	    	console.log("-----------------------------------------------------------------------");
	    	console.log("arrySubjectId[2][10][1]   : " + arrySubjectId[2][10][1] );
			console.log("arrySubjectName[2][10][1] : " + arrySubjectName[2][10][1] );
			console.log("arryChapterId[2][10][1]   : " + arryChapterId[2][10][1] );
	    	console.log("arryChapterName[2][10][1] : " + arryChapterName[2][10][1] );
	    	console.log("-----------------------------------------------------------------------");
	    	console.log("arrySubjectId[2][5][1]   : " + arrySubjectId[2][5][1] );
			console.log("arrySubjectName[2][5][1] : " + arrySubjectName[2][5][1] );
			console.log("arryChapterId[2][5][1]   : " + arryChapterId[2][5][1] );
	    	console.log("arryChapterName[2][5][1] : " + arryChapterName[2][5][1] );
	    	console.log("-----------------------------------------------------------------------");
	    	
	    	console.log("unit1 length : " + arrySubjectId.length );
	    	console.log("unit1[] length : " + arrySubjectId[1][0].length );
	    	
	    	for ( var i = 0 ; i < tmpArryUnit0Cnt ; i++ ) {

		    	console.log("arrySubjectId[" + i + "][0][0]   : " + arrySubjectId[i][0][0] );
		    	console.log("arrySubjectId[" + i + "][0][0]   : " + arrySubjectName[i][0][0] );
		    	console.log("arrySubjectId[" + i + "][0][0]   : " + arryChapterId[i][0][0] );
		    	console.log("arrySubjectId[" + i + "][0][0]   : " + arryChapterName[i][0][0] );
	    	}
	    }