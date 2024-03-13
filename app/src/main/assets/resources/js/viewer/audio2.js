//음원
//var src1 = window.globals.config.cdnDomain + masterContent.filePath + masterContent.saveFileName;
//var src2 = window.globals.config.cdnDomain + masterContent.filePath + masterContent.saveFileName;
var src1 = "https://dn.vivasam.com/VS/MS/MUS/106205/audio/contents/[비상교육] 중등_음악 ①_1_11p_도레미 송(반주).mp3";
var src2 = "https://dn.vivasam.com/VS/NES/KOR/106185/audio/contents/[비상교육] 초등_국어 1-2_4단원-5~6차시_104p_넌 할 수 있어라고 말해 주세요(노래 음원).mp3";
//console.log("src1 >> "+src1);
let allMusic = [
	{
		name : "도레미 송(반주)_11p",
		artist : "비상교육",
		img : "",
		audio : src1
	},
	{
		name : "넌 할 수 있어라고 말해 주세요(노래 음원)_104p",
		artist : "비상교육",
		img : "",
		audio : src2
	}
];
let musicIndex = 1;

var AudioPlayer = {
	musicImg : "",
	musicName : "",
	musicArtist : "",
	musicAudio : "",
	musicPlay : "",
	musicListAll : "",
	init: function () {
		const musicWrap = $(".wrapviewer");
		this.musicImg = $(".wrapviewer").children(".music__img img");
		this.musicName = $(".view_header h3");
		this.musicArtist = $(".view_header p");
		this.musicAudio = new Audio();
		this.musicPlay = $("#btn-play");
		const musicPrevBtn = $("#btn-prev");
		const musicNextBtn = $("#btn-next");
		const musicProgress = $(".music__progress");
		const musicProgressBar = $(".music__progress").children(".bar");
		const musicProgressCurrent = $("#play-time");
		const musicProgressDuration = $("#play-time-end");
		const musicRepeat = $("#control-repeat");
		const musicList = $(".music__list");
		const MusicListBtn = $("#control-list");
		const MusicListClose = $(".music__list").children(".close");
		const musicListUl = $(".music__list").children(".list ul");
		this.musicListAll = $(".music__list").children(".list ul li");

		// 뮤직 시간
		this.musicAudio.addEventListener("loadeddata", () => {
			let audioDuration = this.musicAudio.duration;
			let totalMin = Math.floor(audioDuration / 60);
			let totalSec = Math.floor(audioDuration % 60);
			if (totalSec < 10) totalSec = "0"+totalSec;
			musicProgressDuration.text(totalMin+":"+totalSec);
		});

		// 뮤직 진행바
		this.musicAudio.addEventListener("timeupdate", (e) => {
			const currentTime = e.target.currentTime;
			const duration = e.target.duration;
			let progressWidth = (currentTime / duration) * 100;
			musicProgressBar.css("width", progressWidth + '%');

			let currentMin = Math.floor(currentTime / 60);
			let currentSec = Math.floor(currentTime % 60);
			if (currentSec < 10) currentSec = "0"+currentSec;
			musicProgressCurrent.text(currentMin+":"+currentSec);
		});
		// 진행 버튼
		musicProgress.bind("click", function(e){
			let progressWidth = musicProgress.clientWidth;
			let clickedOffsetX = e.offsetX;
			let songDuration = this.musicAudio.duration;

			this.musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
			this.playMusic();
		});

		// 재생/일시정지
		this.musicPlay.bind("click", function(){
			//const isMusicPaused = musicWrap.classList.contains("paused");
			const isMusicPaused = $("#btn-play").attr("class").indexOf("pause") > -1;
			isMusicPaused ? AudioPlayer.pauseMusic() : AudioPlayer.playMusic();
		});

		musicPrevBtn.bind("click", function(){
			AudioPlayer.prevMusic();
		});
		musicNextBtn.bind("click", function (){
			AudioPlayer.nextMusic();
		});

		// 반복 버튼
		musicRepeat.bind("click", function (){
			let getText = musicRepeat.innerText;

			switch (getText) {
				case "repeat" :
					musicRepeat.innerText = "repeat_one";
					musicRepeat.setAttribute("title", "한곡 반복")
					break;

				case "repeat_one" :
					musicRepeat.innerText = "shuffle";
					musicRepeat.setAttribute("title", "랜덤 반복")
					break;

				case "shuffle" :
					musicRepeat.innerText = "repeat";
					musicRepeat.setAttribute("title", "전체 반복")
					this.playListMusic();
					break;
			}
		});

		// 오디오가 끝나고
		this.musicAudio.addEventListener("ended", () => {
			let getText = musicRepeat.innerText;
			switch (getText) {
				case "repeat" :
					this.nextMusic();
					break;

				case "repeat_one" :
					this.loadMusic(musicIndex);
					this.playMusic();
					break;

				case "shuffle" :
					let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
					do {
						randIndex = Math.floor((Math.random() * allMusic.length) + 1);
					} while (musicIndex == randIndex);
					musicIndex = randIndex;
					this.loadMusic(musicIndex);
					this.playMusic();
					break;
				default :
					this.nextMusic();
					break;
			}
		});

		// 뮤직 리스트 버튼
		MusicListBtn.bind("click", function (){
			musicList.classList.add("show");
		});

		// 뮤직 리스트 닫기 버튼
		MusicListClose.bind("click", function (){
			musicList.classList.remove("show");
		});

		// 뮤직 리스트 구현하기
		/*
		for (let i = 0; i < allMusic.length; i++) {
			let li = `
					<li data-index="${i + 1}">
						<div>
							<em>${allMusic[i].name}</em>
							<p>${allMusic[i].artist}</p>
						</div>
						<audio class="${allMusic[i].audio}" src="${allMusic[i].audio}"></audio>
						<span id="${allMusic[i].audio}" class="audio-duration">3:36</span>
					</li>
				`;
			//musicListUl.insertAdjacentHTML("beforeend", li);

			let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);
			let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);

			liAudio.addEventListener("loadeddata", () => {
				let audioDuration = liAudio.duration;
				let totalMin = Math.floor(audioDuration / 60);
				let totalSec = Math.floor(audioDuration % 60);
				if (totalSec < 10) totalSec = `0${totalSec}`;

				liAudioDuration.innerText = `${totalMin}:${totalSec}`;
				liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
			});
		}
		*/
		// 창이 열리면 노래 시작
		window.addEventListener("load", ()=>{
			this.loadMusic(musicIndex);
			this.playListMusic();
		});
	},
	// 음악 재생
	loadMusic: function(num){
		this.musicImg.src = allMusic[num - 1].img;
		this.musicImg.alt = allMusic[num - 1].img;
		this.musicName.text(allMusic[num - 1].name);
		this.musicArtist.text("출처 : "+allMusic[num - 1].artist);
		this.musicAudio.src = allMusic[num - 1].audio;
	},
	// 플레이 버튼
	playMusic: function(){
		$("#btn-play").removeClass("btn-play");
		$("#btn-play").addClass("btn-pause");
		//musicWrap.classList.add("paused");
		//musicPlay.innerText = "pause";
		//this.musicPlay.setAttribute("title", "일시정지")
		this.musicAudio.play();
	},
	// 일시정지 버튼
	pauseMusic: function(){
		$("#btn-play").removeClass("btn-pause");
		$("#btn-play").addClass("btn-play");
		//musicWrap.classList.remove("paused");
		//musicPlay.innerText = "play_arrow";
		//AudioPlayer.musicPlay.setAttribute("title", "재생")
		this.musicAudio.pause();
	},
	// 이전 곡 듣기 버튼
	prevMusic: function(){
		musicIndex--;
		musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
		this.loadMusic(musicIndex);
		this.playMusic();
		this.playListMusic();
	},
	// 다음 곡 듣기 버튼
	nextMusic: function(){
		musicIndex++;
		musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
		this.loadMusic(musicIndex);
		this.playMusic();
		this.playListMusic();
	},
	playListMusic: function(){
		for(let j=0; j<this.musicListAll.length; j++){
			let audioTag = this.musicListAll[j].querySelector(".audio-duration");
			let adDuration = audioTag.getAttribute("data-duration");
			/*
			if(this.musicListAll[j].classList.contains("playing")){
				this.musicListAll[j].classList.remove("playing");
				audioTag.innerText = adDuration;
			}

			if(this.musicListAll[j].getAttribute("data-index") == musicIndex){
				this.musicListAll[j].classList.add("playing");
				audioTag.innerText = "재생중";
			}
			*/
			this.musicListAll[j].attr("onclick", "clicked(this)");
		}
	}
};

function clicked(el){
	let getLiIndex = el.getAttribute("data-index");

	musicIndex = getLiIndex;
	AudioPlayer.loadMusic(musicIndex);
	AudioPlayer.playMusic();
	AudioPlayer.playListMusic();
}

$(function() {
	AudioPlayer.init();
});