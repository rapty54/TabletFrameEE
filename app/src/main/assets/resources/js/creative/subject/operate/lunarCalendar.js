//내용, 월, 일, 양(1)/음(2)/해당연도
var holidayTable = [
	// 고정 공휴일
	["신정", 1, 1, 1],
	//	["설 전날", 12, 0, 2],
	["설날", 1, 1, 2],
	["설 다음날", 1, 2, 2],
	["3·1절", 3, 1, 1],
	["석가탄신일", 4, 8, 2],
	["어린이날", 5, 5, 1],
	["현충일", 6, 6, 1],
	["광복절", 8, 15, 1],
	["추석 전날", 8, 14, 2],
	["추석", 8, 15, 2],
	["추석 다음날", 8, 16, 2],
	["개천절", 10, 3, 1],
	["한글날", 10, 9, 1],
	["성탄절", 12, 25, 1],

	// 변동 공휴일
	["대통령 선거", 3, 9, 2022],
	["지방 선거", 6, 1, 2022],
	["대체 휴일", 9, 12, 2022],
	["대체 휴일", 10, 10, 2022],
	["대체 휴일", 1, 24, 2023],
	["대체 휴일", 5, 29, 2023],
	["대체 휴일", 10, 2, 2023],
];

// 음력 데이터 (평달 - 작은달 :1	 큰달:2 )
// (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
// (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,	평달과 윤달이 모두 크면 : 6)
var lunarMonthTable = [
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
	[2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2] /* 여기 변경 */,
	[2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
	[2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
	[1, 5, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
	[1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2] /* 2051 */,
	[1, 2, 1, 1, 2, 1, 1, 5, 2, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
	[1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 4, 1, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1],
	[2, 1, 2, 4, 2, 1, 2, 1, 2, 2, 1, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1],
	[2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2, 1] /* 2061 */,
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 5, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2] /* 2071 */,
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 2, 3, 2, 1, 2, 2, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2] /* 2081 */,
	[1, 2, 2, 2, 1, 2, 3, 2, 1, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 6, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 5, 1, 2, 1, 1, 2, 2, 2, 1],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 2, 1, 2, 1, 1, 5, 1, 2, 2, 1],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1] /* 2091 */,
	[2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[1, 2, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 5, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2, 1]
];

//윤년을 판단하는 함수
function isLeapYear(year) {
	return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}

// 계산을 빨리하기 위하여 기준 년도를 구한다.
function getBaseDate(year, month, day) {
	var solYear, solMonth, solDay;
	var lunYear, lunMonth, lunDay;
	var lunLeapMonth, lunMonthDay;
	var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (year < 2001 || year > 2101) {
		throw "2001년부터 2101년까지만 확인 가능합니다.";
	}
	if (year >= 2080) {
		/* 기준일자 양력 2080년 1월 1일 (음력 2079년 12월 10일) */
		solYear = 2080;
		solMonth = 1;
		solDay = 1;
		lunYear = 2079;
		lunMonth = 12;
		lunDay = 10;
		lunLeapMonth = 0;
		solMonthDay[1] = 29; /* 2080 년 2월 28일 */
		lunMonthDay = 30; /* 2079년 12월 */
	} else if (year >= 2060) {
		/* 기준일자 양력 2060년 1월 1일 (음력 2059년 11월 28일) */
		solYear = 2060;
		solMonth = 1;
		solDay = 1;
		lunYear = 2059;
		lunMonth = 11;
		lunDay = 28;
		lunLeapMonth = 0;
		solMonthDay[1] = 29; /* 2060 년 2월 28일 */
		lunMonthDay = 30; /* 2059년 11월 */
	} else if (year >= 2040) {
		/* 기준일자 양력 2040년 1월 1일 (음력 2039년 11월 17일) */
		solYear = 2040;
		solMonth = 1;
		solDay = 1;
		lunYear = 2039;
		lunMonth = 11;
		lunDay = 17;
		lunLeapMonth = 0;
		solMonthDay[1] = 29; /* 2040 년 2월 28일 */
		lunMonthDay = 29; /* 2039년 11월 */
	} else if (year >= 2020) {
		/* 기준일자 양력 2020년 1월 1일 (음력 2019년 12월 7일) */
		solYear = 2020;
		solMonth = 1;
		solDay = 1;
		lunYear = 2019;
		lunMonth = 12;
		lunDay = 7;
		lunLeapMonth = 0;
		solMonthDay[1] = 29; /* 2020 년 2월 28일 */
		lunMonthDay = 30; /* 2019년 12월 */
	} else if (year >= 2000) {
		/* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
		solYear = 2000;
		solMonth = 1;
		solDay = 1;
		lunYear = 1999;
		lunMonth = 11;
		lunDay = 25;
		lunLeapMonth = 0;
		solMonthDay[1] = 29; /* 2000 년 2월 28일 */
		lunMonthDay = 30; /* 1999년 11월 */
	}
	return {
		solYear: solYear,
		solMonth: solMonth,
		solDay: solDay,
		lunYear: lunYear,
		lunMonth: lunMonth,
		lunDay: lunDay,
		solMonthDay: solMonthDay,
		lunLeapMonth: lunLeapMonth,
		lunMonthDay: lunMonthDay
	};
}
// 양력/음력, 음력/양력 변환
// 인수 : 년,월,일, 타입(1이면 양력을 음력으로 2이면 음력을 양력으로), 음력일 경우 윤달인지(0이면 평달, 1이면 윤달)
function calcLunar(year, month, day, type, leapmonth) {
	var baseDate = getBaseDate(year);
	var solYear = baseDate.solYear;
	var solMonth = baseDate.solMonth;
	var solDay = baseDate.solDay;
	var lunYear = baseDate.lunYear;
	var lunMonth = baseDate.lunMonth;
	var lunDay = baseDate.lunDay;
	var solMonthDay = baseDate.solMonthDay;
	var lunLeapMonth = baseDate.lunLeapMonth;
	var lunMonthDay = baseDate.lunMonthDay;
	while (true) {
		// 기준 년월일을 하루씩 늘려서 입력된 날짜와 같으면 그값을 리턴한다.
		if (type == 1 && year == solYear && month == solMonth && day == solDay) {
			// 날짜가 양력과 일치하면 음력을 리턴
			return {
				solYear: solYear,
				solMonth: solMonth,
				solDay: solDay,
				lunYear: lunYear,
				lunMonth: lunMonth,
				lunDay: lunDay,
				leapMonth: lunLeapMonth == 1 // 윤달 인지를 리턴
			};
		}
		if (
			type == 2 &&
			year == lunYear &&
			month == lunMonth &&
			day == lunDay &&
			leapmonth == lunLeapMonth
		) {
			// 날짜가 음력과 일치하면 양력을 리턴
			return {
				solYear: solYear,
				solMonth: solMonth,
				solDay: solDay,
				lunYear: lunYear,
				lunMonth: lunMonth,
				lunDay: lunDay,
				leapMonth: lunLeapMonth == 1 // 윤달 인지를 리턴
			};
		}
		//------------------------------------------------------------------------
		// 양력날짜를 더한다.
		if (solMonth == 12 && solDay == 31) {
			// 12월에 31일이면 년도 증가 1월 1일
			solYear++;
			solMonth = 1;
			solDay = 1;
			/* 윤년이면 2월을 29일로 */
			solMonthDay[1] = isLeapYear(solYear) ? 29 : 28;
		} else if (solMonthDay[solMonth - 1] == solDay) {
			// 일이 마지막 날이면 월증가 일이 1
			solMonth++;
			solDay = 1;
		} else {
			// 아니면 날짜 증가
			solDay++;
		}
		//------------------------------------------------------------------------
		// 음력 데이터 (평달 - 작은달 :1,	큰달:2 )
		// (윤달이 있는 달 - 평달이 작고 윤달도 작으면 : 3 , 평달이 작고 윤달이 크면 : 4)
		// (윤달이 있는 달 - 평달이 크고 윤달이 작으면 : 5,	평달과 윤달이 모두 크면 : 6)
		// 음력 날짜를 더한다.

		// 년도를 계산하기 위하여 인덱스 값 변경 2000년부터 이므로 년도에서 2000를 뺀다.
		var lunIndex = lunYear - 2000;
		if (
			lunMonth == 12 &&
			((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) || // 작은달 말일
				(lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30)) // 큰달 말일
		) {
			// 12월 말일이면 년도증가 월일은 1일로
			lunYear++;
			lunMonth = 1;
			lunDay = 1;

			// 년도가 변경되었으므로 인덱스값 조정
			lunIndex = lunYear - 2000;
			// 1월의 마지막 날짜가 큰달인지 작은달인지 판단한다.
			if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
				lunMonthDay = 29;
			} else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
				lunMonthDay = 30;
			}
		} else if (lunDay == lunMonthDay) {
			// 말일이라면 월과 마지막 날짜를 다시 조정한다.
			if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
				// 윤달이라면 (배열 값이 3이상)
				lunDay = 1;
				lunLeapMonth = 1; // 윤달
			} else {
				// 평달이라면
				lunMonth++;
				lunDay = 1;
				lunLeapMonth = 0; // 평달
			}
			// 월의 마지막 날짜 계산
			if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) {
				// 평달이면서 작은달은 29일
				lunMonthDay = 29;
			} else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) {
				// 평달이면서 큰달은 30일
				lunMonthDay = 30;
			} else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) {
				// 윤달이 있는 달이면 (평달이 작고 윤달도 작으면 : 3)
				lunMonthDay = 29;
			} else if (
				lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
				lunLeapMonth == 0
			) {
				// 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)	-- 평달이라면
				lunMonthDay = 29;
			} else if (
				lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
				lunLeapMonth == 1
			) {
				// 윤달이 있는 달이면 (평달이 작고 윤달이 크면 : 4)	-- 윤달이라면
				lunMonthDay = 30;
			} else if (
				lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
				lunLeapMonth == 0
			) {
				// 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)	-- 평달이라면
				lunMonthDay = 30;
			} else if (
				lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
				lunLeapMonth == 1
			) {
				// 윤달이 있는 달이면 (평달이 크고 윤달이 작으면 : 5)	-- 윤달이라면
				lunMonthDay = 29;
			} else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) {
				// 윤달이 있는 달이면 ( 평달과 윤달이 모두 크면 : 6)
				lunMonthDay = 30;
			}
		} else {
			// 일 증가
			lunDay++;
		}
	}
}

function isHoliday(year, month, day) {
	var obj = calcLunar(year, month, day, 1);
	return getHoliday(obj);
}
/**
 * 휴일을 체크하여 휴일일 경우 휴일 데이터 반환
 */
function getHoliday(obj) {
	var i;
	var addHolidays = ["설 전날", 12, 0, 2]; //가변적인 설 전날

	// 전년도 12월의 마지막날짜를 읽어온다.
	if (lunarMonthTable[obj.solYear - 1 - 2000][11] == 1) {
		addHolidays[2] = 29;
	} else if (lunarMonthTable[obj.solYear - 1 - 2000][11] == 2) {
		addHolidays[2] = 30;
	}
	// 12월 말일이면
	if (addHolidays[1] == obj.lunMonth && addHolidays[2] == obj.lunDay) {
		return addHolidays; // addHolidays 객체를 리턴
	}
	// 배열을 반복하면서 같은지 검색
	for (i = 0; i < holidayTable.length; i++) {
		if (holidayTable[i][3] == 1 && // 양력
			holidayTable[i][1] == obj.solMonth && // 양력 월
			holidayTable[i][2] == obj.solDay // 양력 일
		) {
			return holidayTable[i]; // 리턴
		}
		if (!obj.leapMonth && // 윤달이 아니면서
			holidayTable[i][3] == 2 && // 음력
			holidayTable[i][1] == obj.lunMonth && // 음력 월
			holidayTable[i][2] == obj.lunDay // 음력 일
		) {
			return holidayTable[i];
		}
		if (holidayTable[i][3] == obj.solYear && // 해당연도
			holidayTable[i][1] == obj.solMonth && // 양력 월
			holidayTable[i][2] == obj.solDay // 양력 일
		) {
			return holidayTable[i]; // 리턴
		}
	}
	return null;
}
