$(function () {
	console.log("init");
	$('.experienceList li').on('click', function () {
		console.log($(this));
		location.href = $(this).children('a').prop('href');
	});
});