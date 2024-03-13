// 전체 차시보기
var Period = {
	// 학년
	grade: _grade,
	// 학기
	semester: _semester,
	// 교과서코드
	textbookCd: _textbookCd,
	//대단원
	denouement: "",
	//중단원
	intermediate: "",
	//교과서이름
	bookName: _bookName,
	//교과
	subject: _subject,
	blCodelistId: _blCodelistId,
	periodId: _periodId,
	onload: true,
	unit1: _unit1,
	unit2: _unit2,
	textbookCds: [
		{textbookCd: 106177, textbookNm: "국어-가", grade: 1, semester: 1, type: 'A'},
		{textbookCd: 106185, textbookNm: "국어-가", grade: 1, semester: 2, type: 'A'},
		{textbookCd: 106178, textbookNm: "국어-나", grade: 1, semester: 1, type: 'A'},
		{textbookCd: 106186, textbookNm: "국어-나", grade: 1, semester: 2, type: 'A'},
		{textbookCd: 106179, textbookNm: "국어-가", grade: 2, semester: 1, type: 'A'},
		{textbookCd: 106187, textbookNm: "국어-가", grade: 2, semester: 2, type: 'A'},
		{textbookCd: 106180, textbookNm: "국어-나", grade: 2, semester: 1, type: 'A'},
		{textbookCd: 106188, textbookNm: "국어-나", grade: 2, semester: 2, type: 'A'},
		{textbookCd: 106249, textbookNm: "국어-가", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106259, textbookNm: "국어-가", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106250, textbookNm: "국어-나", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106260, textbookNm: "국어-나", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106251, textbookNm: "국어-가", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106261, textbookNm: "국어-가", grade: 4, semester: 2, type: 'A'},
		{textbookCd: 106252, textbookNm: "국어-나", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106262, textbookNm: "국어-나", grade: 4, semester: 2, type: 'A'},
		{textbookCd: 106322, textbookNm: "국어-가", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106324, textbookNm: "국어-가", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106323, textbookNm: "국어-나", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106325, textbookNm: "국어-나", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106326, textbookNm: "국어-가", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106328, textbookNm: "국어-가", grade: 6, semester: 2, type: 'A'},
		{textbookCd: 106327, textbookNm: "국어-나", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106329, textbookNm: "국어-나", grade: 6, semester: 2, type: 'A'},

		{textbookCd: 106181, textbookNm: "수학", grade: 1, semester: 1, type: 'A'},
		{textbookCd: 106183, textbookNm: "수학", grade: 1, semester: 2, type: 'A'},
		{textbookCd: 106182, textbookNm: "수학", grade: 2, semester: 1, type: 'A'},
		{textbookCd: 106184, textbookNm: "수학", grade: 2, semester: 2, type: 'A'},
		{textbookCd: 106253, textbookNm: "수학", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106343, textbookNm: "수학(신항균)", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106355, textbookNm: "수학(신항균)", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106263, textbookNm: "수학", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106344, textbookNm: "수학(신항균)", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106356, textbookNm: "수학(신항균)", grade: 4, semester: 2, type: 'A'},
		{textbookCd: 106254, textbookNm: "수학", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106264, textbookNm: "수학", grade: 4, semester: 2, type: 'A'},

		{textbookCd: 106363, textbookNm: "수학(신항균)", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106371, textbookNm: "수학(신항균)", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106297, textbookNm: "수학", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106306, textbookNm: "수학", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106364, textbookNm: "수학(신항균)", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106372, textbookNm: "수학(신항균)", grade: 6, semester: 2, type: 'A'},
		{textbookCd: 106298, textbookNm: "수학", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106307, textbookNm: "수학", grade: 6, semester: 2, type: 'A'},

		{textbookCd: 106347, textbookNm: "사회(설규주)", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106345, textbookNm: "사회(김현섭)", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106359, textbookNm: "사회(설규주)", grade: 3, semester: 2, type: 'B'},
		{textbookCd: 106357, textbookNm: "사회(김현섭)", grade: 3, semester: 2, type: 'B'},
		{textbookCd: 106255, textbookNm: "사회", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106265, textbookNm: "사회", grade: 3, semester: 2, type: 'B'},
		{textbookCd: 106348, textbookNm: "사회(설규주)", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106360, textbookNm: "사회(설규주)", grade: 4, semester: 2, type: 'B'},
		{textbookCd: 106346, textbookNm: "사회(김현섭)", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106358, textbookNm: "사회(김현섭)", grade: 4, semester: 2, type: 'B'},
		{textbookCd: 106256, textbookNm: "사회", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106266, textbookNm: "사회", grade: 4, semester: 2, type: 'B'},

		{textbookCd: 106367, textbookNm: "사회(설규주)", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106365, textbookNm: "사회(김현섭)", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106375, textbookNm: "사회(설규주)", grade: 5, semester: 2, type: 'B'},
		{textbookCd: 106373, textbookNm: "사회(김현섭)", grade: 5, semester: 2, type: 'B'},
		{textbookCd: 106299, textbookNm: "사회", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106308, textbookNm: "사회", grade: 5, semester: 2, type: 'B'},
		{textbookCd: 106368, textbookNm: "사회(설규주)", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106366, textbookNm: "사회(김현섭)", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106376, textbookNm: "사회(설규주)", grade: 6, semester: 2, type: 'B'},
		{textbookCd: 106374, textbookNm: "사회(김현섭)", grade: 6, semester: 2, type: 'B'},
		{textbookCd: 106300, textbookNm: "사회", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106309, textbookNm: "사회", grade: 6, semester: 2, type: 'B'},

		{textbookCd: 106349, textbookNm: "과학(조정호)", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106361, textbookNm: "과학(조정호)", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106257, textbookNm: "과학", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106267, textbookNm: "과학", grade: 3, semester: 2, type: 'A'},
		{textbookCd: 106350, textbookNm: "과학(조정호)", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106362, textbookNm: "과학(조정호)", grade: 4, semester: 2, type: 'A'},
		{textbookCd: 106258, textbookNm: "과학", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106268, textbookNm: "과학", grade: 4, semester: 2, type: 'A'},
		{textbookCd: 106301, textbookNm: "과학", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106310, textbookNm: "과학", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106302, textbookNm: "과학", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106311, textbookNm: "과학", grade: 6, semester: 2, type: 'A'},

		{textbookCd: 106369, textbookNm: "과학(이수환)", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106377, textbookNm: "과학(이수환)", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106301, textbookNm: "과학", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106310, textbookNm: "과학", grade: 5, semester: 2, type: 'A'},
		{textbookCd: 106370, textbookNm: "과학(이수환)", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106378, textbookNm: "과학(이수환)", grade: 6, semester: 2, type: 'A'},
		{textbookCd: 106302, textbookNm: "과학", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106311, textbookNm: "과학", grade: 6, semester: 2, type: 'A'},

		{textbookCd: 106332, textbookNm: "도덕", grade: 3, semester: 1, type: 'A'},
		{textbookCd: 106333, textbookNm: "도덕", grade: 4, semester: 1, type: 'A'},
		{textbookCd: 106336, textbookNm: "도덕", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106337, textbookNm: "도덕", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106189, textbookNm: "음악", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106190, textbookNm: "음악", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106269, textbookNm: "음악", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106270, textbookNm: "음악", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106191, textbookNm: "미술", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106192, textbookNm: "미술", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106320, textbookNm: "미술", grade: 5, semester: 1, type: 'A'},
		{textbookCd: 106321, textbookNm: "미술", grade: 6, semester: 1, type: 'A'},
		{textbookCd: 106193, textbookNm: "체육", grade: 3, semester: 1, type: 'B'},
		{textbookCd: 106194, textbookNm: "체육", grade: 4, semester: 1, type: 'B'},
		{textbookCd: 106271, textbookNm: "체육", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106272, textbookNm: "체육", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106273, textbookNm: "실과", grade: 5, semester: 1, type: 'B'},
		{textbookCd: 106274, textbookNm: "실과", grade: 6, semester: 1, type: 'B'},
		{textbookCd: 106351, textbookNm: "봄", grade: 1, semester: 1, type: 'A'},
		{textbookCd: 106352, textbookNm: "봄", grade: 2, semester: 1, type: 'A'},
		{textbookCd: 106353, textbookNm: "여름", grade: 1, semester: 1, type: 'A'},
		{textbookCd: 106354, textbookNm: "여름", grade: 2, semester: 1, type: 'A'},
		{textbookCd: 106338, textbookNm: "가을", grade: 1, semester: 2, type: 'A'},
		{textbookCd: 106339, textbookNm: "가을", grade: 2, semester: 2, type: 'A'},
		{textbookCd: 106340, textbookNm: "겨울", grade: 1, semester: 2, type: 'A'},
		{textbookCd: 106341, textbookNm: "겨울", grade: 2, semester: 2, type: 'A'}
	],
	grades: [
		{num: 1, name: "1학년"},
		{num: 2, name: "2학년"},
		{num: 3, name: "3학년"},
		{num: 4, name: "4학년"},
		{num: 5, name: "5학년"},
		{num: 6, name: "6학년"}
	],
	semesters: [
		{num: 1, name: "1학기"},
		{num: 2, name: "2학기"}
	],
	tempGrade: [
		{
			num: 1,
			name: "1학년",
			book: {
				/*  A : 대단원맵핑 , B : 중단원맵핑 */
				one: [
					{textbookCd: 106177, textbookNm: "국어-가", grade: 1, semester: 1, type: 'A'},
					{textbookCd: 106178, textbookNm: "국어-나", grade: 1, semester: 1, type: 'A'},
					{textbookCd: 106181, textbookNm: "수학", grade: 1, semester: 1, type: 'A'},
					{textbookCd: 106351, textbookNm: "봄", grade: 1, semester: 1, type: 'A'},
					{textbookCd: 106353, textbookNm: "여름", grade: 1, semester: 1, type: 'A'}
				],
				two : [
					{textbookCd: 106185, textbookNm: "국어-가", grade: 1, semester: 2, type: 'A'},
					{textbookCd: 106186, textbookNm: "국어-나", grade: 1, semester: 2, type: 'A'},
					{textbookCd: 106183, textbookNm: "수학", grade: 1, semester: 2, type: 'A'},
					{textbookCd: 106338, textbookNm: "가을", grade: 1, semester: 2, type: 'A'},
					{textbookCd: 106340, textbookNm: "겨울", grade: 1, semester: 2, type: 'A'}
				]
			},
		},
		{
			num: 2,
			name: "2학년",
			book: {
				/*  A : 대단원맵핑 , B : 중단원맵핑 */
				one: [
					{textbookCd: 106179, textbookNm: "국어-가", grade: 2, semester: 1, type: 'A'},
					{textbookCd: 106180, textbookNm: "국어-나", grade: 2, semester: 1, type: 'A'},
					{textbookCd: 106182, textbookNm: "수학", grade: 2, semester: 1, type: 'A'},
					{textbookCd: 106352, textbookNm: "봄", grade: 2, semester: 1, type: 'A'},
					{textbookCd: 106354, textbookNm: "여름", grade: 2, semester: 1, type: 'A'}
				],
				two : [
					{textbookCd: 106187, textbookNm: "국어-가", grade: 2, semester: 2, type: 'A'},
					{textbookCd: 106188, textbookNm: "국어-나", grade: 2, semester: 2, type: 'A'},
					{textbookCd: 106184, textbookNm: "수학", grade: 2, semester: 2, type: 'A'},
					{textbookCd: 106339, textbookNm: "가을", grade: 2, semester: 2, type: 'A'},
					{textbookCd: 106341, textbookNm: "겨울", grade: 2, semester: 2, type: 'A'}

				]
			},
		},
		{
			num: 3,
			name: "3학년",
			book: {
				/*  A : 대단원맵핑 , B : 중단원맵핑 */
				one: [
					{textbookCd: 106249, textbookNm: "국어-가", grade: 3, semester: 1, type: 'A'},
					{textbookCd: 106250, textbookNm: "국어-나", grade: 3, semester: 1, type: 'A'},
					// {textbookCd: 106253, textbookNm: "수학", grade: 3, semester: 1, type: 'A'},
					{textbookCd: 106343, textbookNm: "수학(신항균)", grade: 3, semester: 1, type: 'A'},
					// {textbookCd: 106255, textbookNm: "사회", grade: 3, semester: 1, type: 'B'},
					{textbookCd: 106347, textbookNm: "사회(설규주)", grade: 3, semester: 1, type: 'B'},
					{textbookCd: 106345, textbookNm: "사회(김현섭)", grade: 3, semester: 1, type: 'B'},
					// {textbookCd: 106257, textbookNm: "과학", grade: 3, semester: 1, type: 'A'},
					{textbookCd: 106349, textbookNm: "과학(조정호)", grade: 3, semester: 1, type: 'A'},
					{textbookCd: 106332, textbookNm: "도덕", grade: 3, semester: 1, type: 'A'},
					{textbookCd: 106189, textbookNm: "음악", grade: 3, semester: 1, type: 'B'},
					{textbookCd: 106191, textbookNm: "미술", grade: 3, semester: 1, type: 'B'},
					{textbookCd: 106193, textbookNm: "체육", grade: 3, semester: 1, type: 'B'}
				],
				two : [
					{textbookCd: 106259, textbookNm: "국어-가", grade: 3, semester: 2, type: 'A'},
					{textbookCd: 106260, textbookNm: "국어-나", grade: 3, semester: 2, type: 'A'},
					// {textbookCd: 106263, textbookNm: "수학", grade: 3, semester: 2, type: 'A'},
					{textbookCd: 106355, textbookNm: "수학(신항균)", grade: 3, semester: 2, type: 'A'},
					// {textbookCd: 106265, textbookNm: "사회", grade: 3, semester: 2, type: 'B'},
					{textbookCd: 106359, textbookNm: "사회(설규주)", grade: 3, semester: 2, type: 'B'},
					{textbookCd: 106357, textbookNm: "사회(김현섭)", grade: 3, semester: 2, type: 'B'},
					// {textbookCd: 106267, textbookNm: "과학", grade: 3, semester: 2, type: 'A'},
					{textbookCd: 106361, textbookNm: "과학(조정호)", grade: 3, semester: 2, type: 'A'},
					{textbookCd: 106332, textbookNm: "도덕", grade: 3, semester: 2, type: 'A'},
					{textbookCd: 106189, textbookNm: "음악", grade: 3, semester: 2, type: 'B'},
					{textbookCd: 106191, textbookNm: "미술", grade: 3, semester: 2, type: 'B'},
					{textbookCd: 106193, textbookNm: "체육", grade: 3, semester: 2, type: 'B'}
				]
			}
		},
		{
			num: 4,
			name: "4학년",
			book: {
				one: [
					{textbookCd: 106251, textbookNm: "국어-가", grade: 4, semester: 1,type: 'A'},
					{textbookCd: 106252, textbookNm: "국어-나", grade: 4, semester: 1,type: 'A'},
					// {textbookCd: 106254, textbookNm: "수학", grade: 4, semester: 1, type: 'A'},
					{textbookCd: 106344, textbookNm: "수학(신항균)", grade: 4, semester: 1, type: 'A'},
					// {textbookCd: 106256, textbookNm: "사회", grade: 4, semester: 1, type: 'B'},
					{textbookCd: 106348, textbookNm: "사회(설규주)", grade: 4, semester: 1, type: 'B'},
					{textbookCd: 106346, textbookNm: "사회(김현섭)", grade: 4, semester: 1, type: 'B'},
					// {textbookCd: 106258, textbookNm: "과학", grade: 4, semester: 1, type: 'A'},
					{textbookCd: 106350, textbookNm: "과학(조정호)", grade: 4, semester: 1, type: 'A'},
					{textbookCd: 106333, textbookNm: "도덕", grade: 4, semester: 1 ,type: 'A'},
					{textbookCd: 106190, textbookNm: "음악", grade: 4, semester: 1, type: 'B'},
					{textbookCd: 106192, textbookNm: "미술", grade: 4, semester: 1, type: 'B'},
					{textbookCd: 106194, textbookNm: "체육", grade: 4, semester: 1, type: 'B'}
				],
				two: [
					{textbookCd: 106261, textbookNm: "국어-가", grade: 4, semester: 2, type: 'A'},
					{textbookCd: 106262, textbookNm: "국어-나", grade: 4, semester: 2, type: 'A'},
					// {textbookCd: 106264, textbookNm: "수학", grade: 4, semester: 2, type: 'A'},
					{textbookCd: 106356, textbookNm: "수학(신항균)", grade: 4, semester: 2, type: 'A'},
					// {textbookCd: 106266, textbookNm: "사회", grade: 4, semester: 2, type: 'B'},
					{textbookCd: 106360, textbookNm: "사회(설규주)", grade: 4, semester: 2, type: 'B'},
					{textbookCd: 106358, textbookNm: "사회(김현섭)", grade: 4, semester: 2, type: 'B'},
					// {textbookCd: 106268, textbookNm: "과학", grade: 4, semester: 2, type: 'A'},
					{textbookCd: 106362, textbookNm: "과학(조정호)", grade: 4, semester: 2, type: 'A'},
					{textbookCd: 106333, textbookNm: "도덕", grade: 4, semester: 2 ,type: 'A'},
					{textbookCd: 106190, textbookNm: "음악", grade: 4, semester: 2, type: 'B'},
					{textbookCd: 106192, textbookNm: "미술", grade: 4, semester: 2, type: 'B'},
					{textbookCd: 106194, textbookNm: "체육", grade: 4, semester: 2, type: 'B'}
				]
			},
		},
		{
			num: 5,
			name: "5학년",
			book: {
				one: [
					{textbookCd: 106322, textbookNm: "국어-가", grade: 5, semester: 1, type: 'A'},
					{textbookCd: 106323, textbookNm: "국어-나", grade: 5, semester: 1, type: 'A'},
					// {textbookCd: 106297, textbookNm: "수학", grade: 5, semester: 1, type: 'A'},
					{textbookCd: 106363, textbookNm: "수학(신항균)", grade: 5, semester: 1, type: 'A'},
					// {textbookCd: 106299, textbookNm: "사회", grade: 5, semester: 1, type: 'B'},
					{textbookCd: 106367, textbookNm: "사회(설규주)", grade: 5, semester: 1, type: 'B'},
					{textbookCd: 106365, textbookNm: "사회(김현섭)", grade: 5, semester: 1, type: 'B'},
					// {textbookCd: 106301, textbookNm: "과학", grade: 5, semester: 1, type: 'A'},
					{textbookCd: 106369, textbookNm: "과학(이수환)", grade: 5, semester: 1, type: 'A'},
					{textbookCd: 106336, textbookNm: "도덕", grade: 5, semester: 1, type: 'A'},
					{textbookCd: 106269, textbookNm: "음악", grade: 5, semester: 1, type: 'B'},
					{textbookCd: 106320, textbookNm: "미술", grade: 5, semester: 1, type: 'B'},
					{textbookCd: 106271, textbookNm: "체육", grade: 5, semester: 1, type: 'B'},
					{textbookCd: 106273, textbookNm: "실과", grade: 5, semester: 1, type: 'B'}
				],
				two: [
					{textbookCd: 106324, textbookNm: "국어-가", grade: 5, semester: 2, type: 'A'},
					{textbookCd: 106325, textbookNm: "국어-나", grade: 5, semester: 2, type: 'A'},
					// {textbookCd: 106306, textbookNm: "수학", grade: 5, semester: 2, type: 'A'},
					{textbookCd: 106371, textbookNm: "수학(신항균)", grade: 5, semester: 2, type: 'A'},
					// {textbookCd: 106308, textbookNm: "사회", grade: 5, semester: 2, type: 'B'},
					{textbookCd: 106375, textbookNm: "사회(설규주)", grade: 5, semester: 2, type: 'B'},
					{textbookCd: 106373, textbookNm: "사회(김현섭)", grade: 5, semester: 2, type: 'B'},
					// {textbookCd: 106310, textbookNm: "과학", grade: 5, semester: 2, type: 'A'},
					{textbookCd: 106377, textbookNm: "과학(이수환)", grade: 5, semester: 2, type: 'A'},
					{textbookCd: 106336, textbookNm: "도덕", grade: 5, semester: 2, type: 'A'},
					{textbookCd: 106269, textbookNm: "음악", grade: 5, semester: 2, type: 'B'},
					{textbookCd: 106320, textbookNm: "미술", grade: 5, semester: 2, type: 'B'},
					{textbookCd: 106271, textbookNm: "체육", grade: 5, semester: 2, type: 'B'},
					{textbookCd: 106273, textbookNm: "실과", grade: 5, semester: 2, type: 'B'}
				]
			},
		},
		{
			num: 6,
			name: "6학년",
			book: {
				one: [
					{textbookCd: 106326, textbookNm: "국어-가", grade: 6, semester: 1, type: 'A'},
					{textbookCd: 106327, textbookNm: "국어-나", grade: 6, semester: 1, type: 'A'},
					// {textbookCd: 106298, textbookNm: "수학", grade: 6, semester: 1, type: 'A'},
					{textbookCd: 106364, textbookNm: "수학(신항균)", grade: 6, semester: 1, type: 'A'},
					// {textbookCd: 106300, textbookNm: "사회", grade: 6, semester: 1, type: 'B'},
					{textbookCd: 106368, textbookNm: "사회(설규주)", grade: 6, semester: 1, type: 'B'},
					{textbookCd: 106366, textbookNm: "사회(김현섭)", grade: 6, semester: 1, type: 'B'},
					// {textbookCd: 106302, textbookNm: "과학", grade: 6, semester: 1, type: 'A'},
					{textbookCd: 106370, textbookNm: "과학(이수환)", grade: 6, semester: 1, type: 'A'},
					{textbookCd: 106337, textbookNm: "도덕", grade: 6, semester: 1, type: 'A'},
					{textbookCd: 106270, textbookNm: "음악", grade: 6, semester: 1, type: 'B'},
					{textbookCd: 106321, textbookNm: "미술", grade: 6, semester: 1, type: 'B'},
					{textbookCd: 106272, textbookNm: "체육", grade: 6, semester: 1, type: 'B'},
					{textbookCd: 106274, textbookNm: "실과", grade: 6, semester: 1, type: 'B'}
				],
				two: [
					{textbookCd: 106328, textbookNm: "국어-가", grade: 6, semester: 2, type: 'A'},
					{textbookCd: 106329, textbookNm: "국어-나", grade: 6, semester: 2, type: 'A'},
					// {textbookCd: 106307, textbookNm: "수학", grade: 6, semester: 2, type: 'A'},
					{textbookCd: 106372, textbookNm: "수학(신항균)", grade: 6, semester: 2, type: 'A'},
					// {textbookCd: 106309, textbookNm: "사회", grade: 6, semester: 2, type: 'B'},
					{textbookCd: 106376, textbookNm: "사회(설규주)", grade: 6, semester: 2, type: 'B'},
					{textbookCd: 106374, textbookNm: "사회(김현섭)", grade: 6, semester: 2, type: 'B'},
					// {textbookCd: 106311, textbookNm: "과학", grade: 6, semester: 2, type: 'A'},
					{textbookCd: 106378, textbookNm: "과학(이수환)", grade: 6, semester: 2, type: 'A'},
					{textbookCd: 106337, textbookNm: "도덕", grade: 6, semester: 2, type: 'A'},
					{textbookCd: 106270, textbookNm: "음악", grade: 6, semester: 2, type: 'B'},
					{textbookCd: 106321, textbookNm: "미술", grade: 6, semester: 2, type: 'B'},
					{textbookCd: 106272, textbookNm: "체육", grade: 6, semester: 2, type: 'B'},
					{textbookCd: 106274, textbookNm: "실과", grade: 6, semester: 2, type: 'B'}
				]
			},
		}
	],
	init: function () {
		// this.changePeriodList(this.blCodelistId);
	},
	/* 학년학기 선택 */
	getTextbookList: function (basic) {

		var html = "";

		var grade = Period.grade;
		if (grade == "") {
			grade = Period.bookName;
		}

		// 학년을 클릭해서 디폴트 상태 일때
		if (basic == 'default') {

			var textbookCd = "";

			this.tempGrade.forEach(function (value, index, array) {
				if (value.name.replace(/[^0-9]/g, '') == grade.replace(/[^0-9]/g, '')) {
					value.book.one.forEach(function (inV, inI, inA) { // todo: 학기 변경 시 변경필요함. (개선필요...)
						var classOn = "";
						if (inI == 0) {
							classOn = "class='on'";
							textbookCd = inV.textbookCd;
						}
						html += "<a " + classOn + " href='#' onclick=\"Period.changeTextbook('" + inV.textbookCd + "', '', this)\">" + inV.textbookNm + "</a>";
					});

				}
			});

			$('#textbookDepth').html(html);

			this.changeTextbook(textbookCd, '', $('#textbookDepth').find('a').eq(0), basic);

		} else {

			this.tempGrade.forEach(function (value, index, array) {
				// 학년 이름과 현재 학년이름을 비교한다.
				if (value.name.replace(/[^0-9]/g, '') == grade.replace(/[^0-9]/g, '')) {
					if (Period.semester == "1학기") {
						value.book.one.forEach(function (inV, inI, inA) {
							var classOn = "";
							if (Period.textbookCd == inV.textbookCd) {
								classOn = "class='on'";
							}
							html += "<a " + classOn + "href='#' onclick=\"Period.changeTextbook('" + inV.textbookCd + "', '', this)\">" + inV.textbookNm + "</a>";
						});
					} else {
						value.book.two.forEach(function (inV, inI, inA) {
							if (Period.textbookCd == inV.textbookCd) {
								html += "<a class='on' href='#' onclick=\"Period.changeTextbook('" + inV.textbookCd + "', '', this)\">" + inV.textbookNm + "</a>";
							} else {
								html += "<a href='#' onclick=\"Period.changeTextbook('" + inV.textbookCd + "', '', this)\">" + inV.textbookNm + "</a>";
							}
						});
					}
				}
			});

			$('#textbookDepth').html(html);
		}
		/*
						$('#deDepth').html("");
						$('#periodDepth').html("");*/

	},
	/* 학년생성 */
	createGrade: function () {

		var html = "";

		this.grades.forEach(function (value, index, array) {

			var classOn = "";
			var grade = Period.grade;

			if (grade == "") {
				grade = Period.bookName;
			}

			if (grade.replace(/[^0-9]/g, '') == value.name.replace(/[^0-9]/g, '')) {
				classOn = "class='on'";
			}

			html += "<a " + classOn + "href='#' onclick=\"Period.changeGrade('" + value.name + "',this)\">" + value.name + "</a>";
		});

		$('#gradeDepth').html(html);
	},
	/* 학년변경 */
	changeGrade: function (grade, obj) {

		this.grade = grade;

		// 클래스를 지운다.
		$(obj).siblings('a').each(function () {
			$(this).removeClass("on");
		});

		// 다시 클래스르 넣어준다.
		$(obj).attr("class", 'on');

		// 다 없어지게 만들어줌
		$('#semesterDepth').html("");
		$('#textbookDepth').html("");
		$('#deDepth').html("");
		$('#periodDepth').html("");

		this.createSemester('default');
	},
	/* 학기생성 */
	createSemester: function (basic) {

		var textBook = Period.textbookCds.filter(function (value) {
			return value.textbookCd == Period.textbookCd;
		});

		if(textBook.length > 0){
			if (textBook[0].semester == 2){
				this.semester = "2학기";
			}else{
				this.semester = "1학기";
			}
		}else{
			this.semester = "1학기";
		}

		var grade = this.grade;

		var html = "";

		if (basic == 'default') {

			var name = "";

			this.semesters.forEach(function (value, index, array) {

				if (index == 0) {
					html += "<a data-id='FIRST'";
					if (Period.semester == value.name) {
						html += " class='on'";
					}
					html +=	" href='#' onclick=\"Period.changeSemester('" + value.name + "',this)\">" + value.name + "</a>";
					name = value.name;
				} else {
					html += "<a href='#'";
					if (Period.semester == value.name) {
						html += " class='on'";
					}
					html +=	" onclick=\"Period.changeSemester('" + value.name + "',this)\">" + value.name + "</a>";
				}
			});

			$('#semesterDepth').html(html);
			//1학기 2학기는 여기를 바꿔주면 됨
			this.changeSemester(name, $('#semesterDepth').find('a').eq(0), 'default');

		} else {
			var name = "";

			this.semesters.forEach(function (value, index, array) {

				if (Period.semester == value.name) {
					html += "<a class='on' href='#' onclick=\"Period.changeSemester('" + value.name + "',this)\">" + value.name + "</a>";
					name = value.name;
				} else {
					html += "<a href='#' onclick=\"Period.changeSemester('" + value.name + "',this)\">" + value.name + "</a>";
				}

			});

			$('#semesterDepth').html(html);

			/* 어짜피 새로 만들어야 해서 걍 이렇게 만들어 둠 */
			if(name == '1학기'){
				this.changeSemester(name, $('#semesterDepth').find('a').eq(0));
			}else{
				this.changeSemester(name, $('#semesterDepth').find('a').eq(1));
			}


		}
	},
	/* 학기변경 */
	changeSemester: function (semester, obj, basic) {

		this.semester = semester;

		//클래스를 지운다.
		$(obj).siblings('a').each(function () {
			$(this).removeClass("on");
		});

		//다시 클래스르 넣어준다.
		$(obj).attr("class", 'on');

		this.getTextbookList(basic);
	},
	/* 과목변경 */
	changeTextbook: function (textbookCd, type, obj, basic) {

		this.textbookCd = textbookCd;

		//클래스를 지운다.
		$(obj).siblings('a').each(function () {
			$(this).removeClass("on");
		});

		//다시 클래스르 넣어준다.
		$(obj).attr("class", 'on');

		if (!type) {
			type = 'A';
		}

		var onload = Period.onload;

		// 대단원 목록
		Ajax.execute({
			type: "POST",
			url: "/period/cources.json",
			cache: false,
			async: false,
			dataType: "json",
			data: JSON.stringify({textbookCd: textbookCd, type: type}),
			contentType: 'application/json',
			success: function (data) {

				var list = data.result;
				var html = "";

				var chaciInfo = Period.checkMiddleChaci();

				if (basic == 'default') {

					//중단원이 있는 과목이면
					if (chaciInfo && chaciInfo.type == 'B') {

						var classOn = "";
						var firstCId = "";

						for (var i = 0; i < list.length; i++) {

							if (i == 0) {
								classOn = "class='on'";
								firstCId = list[i].C_ID;
							}

							html += "<div class='midwrap'>";

							if (Period.unit1 == list[i].C_ID) {
								html += "<a href='#' class='mid on' data-id='FIRST' onclick=\"Period.changeIntermediate('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
							} else {
								html += "<a href='#' class='mid' onclick=\"Period.changeIntermediate('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
							}

							html += "</div>";
						}

						$('#deDepth').html(html);

					} else { // 중단원 없는 과목이면

						var firstCId = "";

						for (var i = 0; i < list.length; i++) {
							if (i == 0) {
								html += "<a class='on' href='#' onclick=\"Period.changePeriodList('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "</a>";
								firstCId = list[i].C_ID;
							} else {
								html += "<a href='#' onclick=\"Period.changePeriodList('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "</a>";
							}
						}
						$('#deDepth').html(html);
						Period.changePeriodList(firstCId, $('#deDepth').find('a').eq(0));
					}
				} else {

					for (var i = 0; i < list.length; i++) {

						if (chaciInfo && chaciInfo.type == 'B') {

							var midVal = "";
							html += "<div class='midwrap'>";

							if (Period.unit1 == list[i].C_ID) {
								html += "<a href='#' class='mid on' data-id='FIRST' onclick=\"Period.changeIntermediate('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
							} else {
								html += "<a href='#' class='mid' onclick=\"Period.changeIntermediate('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
							}

							html += "</div>";

							$('#deDepth').html(html);

						} else {
							if (Period.blCodelistId == list[i].C_ID) {
								html += "<a class='on' href='#' onclick=\"Period.changePeriodList('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
								$('#imName').html(list[i].C_NM);
							} else {
								html += "<a href='#' onclick=\"Period.changePeriodList('" + list[i].C_ID + "',this)\">" + list[i].C_NM + "<i></i></a>";
							}

							$('#deDepth').html(html);
						}
					}

					app.navAcc();

					if (!onload) {
						$('#periodDepth').html('');
					}
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
			},
			complete: function (xhr, textStatus) {
			}
		});
	},
	/* 중단원 변경 */
	changeIntermediate: function (blCodelistId, obj, basic) {

		this.intermediate = blCodelistId;

		if ($(obj).siblings(".mid_wrap").length == 0) {

			// 중단원
			Ajax.execute({
				type: "POST",
				url: "/period/cources.json",
				dataType: "json",
				cache: false,
				async: false,
				data: JSON.stringify({blCodelistId: blCodelistId, type: 'B'}),
				contentType: 'application/json',
				success: function (data) {

					var list = data.result;

					if (basic == 'default') {
						var html = "";
						var firstId = "";
						var classOn = "class='on'";
						html += "<div class=\"mid_wrap\">"

						for (var i = 0; i < list.length; i++) {

							html += "<a href='#' data-id='" + list[i].C_ID + "' " + (i == 0 ? classOn : '')
								+ " onclick='Period.changePeriodList(" + list[i].C_ID + ", this)'>" + list[i].C_NM + "</a>";

							if (i == 0) {
								firstId = list[i].C_ID;
							}
						}

						html += "</div>";

						$(obj).parent().append(html);
						var div = $(obj).siblings('div')[0];
						Period.changePeriodList(firstId, $(div).find('a').eq(0));

					} else {

						var html = "";
						var classOn = "class='on'";
						html += "<div class=\"mid_wrap\">"

						for (var i = 0; i < list.length; i++) {

							html += "<a href='#' data-id='" + list[i].C_ID + "' " + (Period.unit2 == list[i].C_ID ? classOn : '')
								+ " onclick='Period.changePeriodList(" + list[i].C_ID + ", this)'>" + list[i].C_NM + "</a>";
						}

						html += "</div>";

						$(obj).parent().append(html);
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {

				},
				complete: function (xhr, textStatus) {

				}
			});
		}

	},
	/* 차시목록을 가져온다. */
	changePeriodList: function (blCodelistId, obj) {


		//검인정 수학(신항균) 3-1
		// if(blCodelistId >= 20102245 && blCodelistId < 20102248){
		// 	alert("준비 중입니다.");
		// 	return false;
		//
		// }else if(blCodelistId >= 20102249 && blCodelistId < 20102253){
		// 	alert("준비 중입니다.");
		// 	return false;
		// }
		/*
		if(blCodelistId >= 20204166 && blCodelistId < 20204175){
			alert("준비 중입니다.");
			return false;
		//검인정(김현섭) 사회 3-1
		}else if(blCodelistId >= 20204142 && blCodelistId < 20204152){
			alert("준비 중입니다.");
			return false;
		//검인정(과학) 과학 3-1
		}else if(blCodelistId >= 20102273 && blCodelistId < 20102275){
			alert("준비 중입니다.");
			return false;
		//검인정(과학) 과학 3-1
		}else if(blCodelistId >= 20102276 && blCodelistId < 20102278){
			alert("준비 중입니다.");
			return false;

		//검인정 수학(신항균) 4-1
		}else if(blCodelistId >= 20102253 && blCodelistId < 20102255){
			alert("준비 중입니다.");
			return false;
		}else if(blCodelistId >= 20102256 && blCodelistId < 20102261){
			alert("준비 중입니다.");
			return false;

		//검인정 사회(설규주) 4-1
		}else if(blCodelistId >= 20204177 && blCodelistId < 20204186){
			alert("준비 중입니다.");
			return false;

		//검인정 사회(김현섭) 4-1
		}else if(blCodelistId >= 20204154 && blCodelistId < 20204164){
			alert("준비 중입니다.");
			return false;

		//검인정 과학(조정호) 4-1
		}else if(blCodelistId >= 20102278 && blCodelistId < 20102281) {
			alert("준비 중입니다.");
			return false;

		}else if(blCodelistId == 20102282){
				alert("준비 중입니다.");
				return false;
		}*/

		// songth 23년도 1학기 신규오픈
		// - 사회 5-1, 6-1(설규주)(김현섭)각 교과서 1차 1단원 오픈
		// - 수학5-1, 6-1(신항균) 1차 1~3단원오픈
		// if(blCodelistId >= 20102331 && blCodelistId <= 20102333){ //수학 5-1(신항균)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId === '20102335'){ //수학 5-1(신항균) > 신나는 수학
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId >= 20204274 && blCodelistId <= 20204279){ //사회 5-1(설규주)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId >= 20204253 && blCodelistId <= 20204257){ //사회 5-1(김현섭)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId >= 20102339 && blCodelistId <= 20102341){ //수학 6-1(신항균)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId === '20102343'){ //수학 5-1(신항균) > 신나는 수학
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId >= 20204286 && blCodelistId <= 20204291){ //사회 6-1(설규주)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }
		// if(blCodelistId >= 20204263 && blCodelistId <= 20204267){ //사회 6-1(김현섭)
		// 	alert("2월 중 오픈됩니다.");
		// 	return false;
		// }



		this.blCodelistId = blCodelistId;

		// 클래스를 지운다.
		if (obj) {
			$(obj).siblings('a').each(function () {
				$(this).removeClass("on");
			});
			$('.mid_wrap').find('a').removeClass("on");
			//다시 클래스르 넣어준다.
			$(obj).attr("class", 'on');
		}

		Ajax.execute({
			type: "POST",
			url: "/period.json",
			dataType: "json",
			cache: false,
			async: false,
			data: JSON.stringify({blCodelistId: blCodelistId}),
			contentType: 'application/json',
			success: function (data) {

				var list = data.result;
				var html = "";
				var textbookCd = "";

				/*
				* TODO: 56사회2단원막음 232 신규교과오픈 시 사회56학년 2학기-2단원은 차시클릭 시 별도 문구처리
				* */
				// if (Period.intermediate === '20102383' || Period.intermediate === '20102379'
				// 	|| Period.intermediate === '20102385' || Period.intermediate === '20102381') {
				// 	html += "<p class='nodata'>8.12일에 업데이트 예정입니다.</p>";
				// } else {
					if(list.length > 0) {
						for (var i = 0; i < list.length; i++) {

							var classOn = "";

							if (Period.periodId == list[i].PERIOD_ID) {
								classOn = "class='on'";
								textbookCd = Period.textbookCd;
							}

							html += "<a " + classOn + "href='/period/" + (_isViewer ? "total" : "package") + ".popup?periodId="
								+ list[i].PERIOD_ID + "&lnbCode=" + _lnbCode + "&contentId=" + list[i].CONTENT_ID + "&contentGubun=" + list[i].CONTENT_GUBUN + "'>";
							html += list[i].PERIOD_NAME + "</a>";
						}
					} else {
						html += "<p class='nodata'>이 단원에는 차시 자료가 없습니다.</p>";
					}
				// }

				$('#periodDepth').html(html);

				//처음로드할때만 사용
				if (Period.onload) {

					//과목변경
					Period.changeTextbook(textbookCd);
					//중단원이면
					/*var chaciInfo = Period.checkMiddleChaci();

					if (chaciInfo && chaciInfo.type == 'B') {

						$(".midwrap > a").each(function (idx, obj) {

							if ($(obj).attr("data-id") == 'FIRST') {
								Period.changeIntermediate(Period.unit1, obj);
								$(obj).addClass("on");
							}
						});
					}*/

					Period.getTextbookList();
					Period.createGrade();
					Period.createSemester();

					Period.onload = false;
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {

			},
			complete: function (xhr, textStatus) {

			}
		});
	},
	checkMiddleChaci: function () {

		for (var i = 0; i < this.textbookCds.length; i++) {
			if (this.textbookCd == this.textbookCds[i].textbookCd) {
				return this.textbookCds[i];
			}
		}
	}
};
var app = {
	navAcc: function () {

		//$(".mid.on").siblings(".mid_wrap").css("display", "block");
		$(".mid.on").click();

		$('.mid').click(function () {
			if ($(this).hasClass('on')) {
				$(this).siblings("div").hide();
				$(this).removeClass('on');
			} else if (!$(this).hasClass('on')) {
				$(this).siblings("div").show();
				$(this).addClass('on');
			}
		});
	}
};

// 내 저장 차시 불러오기
function callMySavedPeriodList(param, cb) {
	$("#searchCourse").load("/period/member", param, cb);
}

// 내 저장 차시에서 저장 차시 삭제
function delMyPeriod(e, pId) {

	e.stopPropagation();

	if (confirm("내 저장 차시에서 삭제하시겠습니까?")) {

		Ajax.execute({
			type: "POST",
			url: "/period/member/delete",
			dataType: "json",
			contentType: 'application/json',
			cache: false,
			async: false,
			data: JSON.stringify({periodId: pId}),
			success: function (data) {
				callMySavedPeriodList();
			},
			error: function (xhr, ajaxOptions, thrownError) {
			},
			complete: function (xhr, textStatus) {
			}
		});
	}
}

// 내 저장 차시 필터 변경 시 검색
function searchMyPeriod(type, value) {

	var textbookSelectBox = $("#textbookSel");
	var unit1SelectBox = $("#unit1Sel");

	// 교과선택 변경시 대단원 세팅
	if (type == "textbook") {

		var duplCheckArr = [];

		unit1SelectBox.empty().append("<option value=''>대단원 선택</option>");

		$.each(_allMyPeriod, function (index, data) {
			if ((value == null || value == "") || data.textbook == value) {
				duplCheckArr.push(data.unit1);
			}
		});

		const uniqueArr = duplCheckArr.filter(function (element, index) {
			return duplCheckArr.indexOf(element) === index;
		});

		$.each(uniqueArr, function (index, v) {

			for (var i = 0; i < _allMyPeriod.length; i++) {
				if (v == _allMyPeriod[i].unit1) {
					unit1SelectBox.append("<option value='" + _filterData[i].unit1 + "'>" + _filterData[i].cnm + "</option>");
					break;
				}
			}
		})
	}

	var param = {
		sort: $("input[name=sort]:checked").val(),
		textbookCd: textbookSelectBox.val(),
		unit1: unit1SelectBox.val()
	}

	callMySavedPeriodList(param, function () {

	});
}

// 차시 링크 이동
function goPeriod(e, pId, cid, gubun) {
	e.stopPropagation();

	console.log(_isViewer)

	if(_isViewer) {
		location.href = "/period/total.popup?periodId="+ pId
			+ "&contentId=" + cid
			+ "&contentGubun=" + gubun
			+ "&lnbCode=" + _lnbCode
			+ "&my=true";
	} else {
		location.href = "/period/package.popup?periodId="+ pId
			+ "&lnbCode=" + _lnbCode
			+ "&my=true";
	}
}

// 연계 채널
function goLinkChannelPage(val, type) {

	if (type === "A" && val.indexOf("problem") < 0) {

		var params = getUrlVars(val);

		Ajax.execute({
			type: "GET",
			url: "/problem/detail/course2.json",
			dataType: "json",
			contentType: 'application/json',
			cache: false,
			async: false,
			data: {course2Code: params["api_SUBJECT_ID"], course2: params["course2"]},
			success: function (data) {
				var queryStringObj = {
					course2Code: params["api_SUBJECT_ID"],
					course: data.response.course,
					course2: params["course2"],
					course2Year: params["school_year"]
				}
				var path = "/problem/wizard?" + $.param(queryStringObj);

				/*Popup.openWindow({
					name: "문제은행",
					url: "//" + location.host + path,
					fullscreen: true
				});*/
				var downWindow = window.open("//" + location.host + path);
				downWindow.focus();
			},
			error: function (xhr, ajaxOptions, thrownError) {
			},
			complete: function (xhr, textStatus) {
			}
		});
	} else {
		if(type === 'A' || type === 'B') {
			var url = "//" + (type === "B" ? globals.config.siteDomainSamquiz : location.host) + val;
			if(type == 'B'){
				gtag('event', '샘퀴즈', {
					'event_category' : '차시창',
					'event_label' : '샘퀴즈 바로가기',
					'value': 1
				});

			}
			window.open(decodeURIComponent(url), '_blank');
		} else {
			Popup.openWindow({
				name: type === "C" ? "수학디지털교구" : (type === "D" ? "지역화자료실" : (type === "E" ? "과학 가상실험실" : (type === "F" ? "VR 역사답사" : (type === "G" ? "비바샘 미술관" : (type === "H" ? "신재생에너지 체험관" : ""))))),
				url: "//" + (type === "C" || type === "F" || type === "G" || type === "H" ? globals.config.siteDomainMiddleHigh : location.host) + val,
				fullscreen: true
			});
			/*var url = "//" + (type === "C" || type === "F" || type === "G" || type === "H" ? globals.config.siteDomainMiddleHigh : location.host) + val;
			window.open(decodeURIComponent(url), '_blank');*/
		}
	}
}

function getUrlVars(url) {
	var vars = [], hash;
	var hashes = url.slice(url.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}


// 내 저장 차시 불러오기
function callMyProgressPeriodList(param, cb) {
	$("#searchCourseProgress").load("/period/progress", param, cb);
}