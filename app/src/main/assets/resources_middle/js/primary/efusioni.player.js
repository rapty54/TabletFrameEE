	var efusioniPlayerId = 0;
	
	function EFusionIPlayer(ip) {
		/*private member*/
		var PLAYING_ON = 0;
		var PLAYING_PAUSED = 1;
		var PLAYING_STOPPED = 2;
		var PLAYING_DONE = 3;
		
		var mode;
		var source;
		var frame;
		var currentFrame = 0;
		var timer;
		var self = this;
		var status = PLAYING_STOPPED;
		var bRotate = false;
		var images;
		var length;
		var bLoaded = false;
		var bReverse = false;
		
		/*init parameter*/
		mode = (ip.mode == null) ? "frame" : ip.mode;
		if (mode == "serial") {
			source = ip.source;
			length = ip.length;
		}
		else frame = ip.frame;
		
		var step = ip.step;
		var width = ip.width;
		var height = ip.height;
		var duration = ip.duration;
		var container = ip.container;
		var mouseControll = ip.mouseControll;
		var mouseDirection = ip.mouseDirection;
		var loadCompleteCallback = ip.loadCompleteCallback;
		var frameAtCallback = ip.frameAtCallback;
		var playDoneCallback = ip.playDoneCallback;
		var debugContainer = ip.debugContainer;

		/*Optional Value Settings*/
		if (step == null) step = 1;
		if (duration == null) duration = 1000;
		if (mouseControll == null) mouseControll = false;
		if (mouseControll) {
			if (mouseDirection == null) mouseDirection = "normal";
		}

		$(container).data("player", this);
		
		efusioniPlayerId++;
		
		var bDragging = false;
		var initX = 0;
		var stopFrame = 0;
		
		if (mouseControll) {
			$(container).mousedown(function(e) {
				e.preventDefault();
				initX = e.pageX - $(container).offset().left
				stopFrame = currentFrame;
				
				$(document).mousemove(function(e) {
					e.preventDefault();
					var x = e.pageX - $(container).offset().left;
					x = x - initX;
					
					var frame = 0;
					if (mouseDirection == "reverse") {
						frame = length - parseInt(x / width * length);
					}
					else {
						frame = parseInt(x / width * length);
					}
					
					frame = self._mod(stopFrame + frame);
					self.drawFrame(frame);
				});
				
				$(document).mouseup(function() {
					$(document).unbind("mousemove");
				});
			});
			
			
		}
		
		this._mod = function(n) {
			if (n >=0) {
				return n % length;
			}
			else {
				return (n + 1) % length + length - 1;
			}
		}
		
		this._play = function() {
			//self.debug(currentFrame + "th frame, status=" + status);
			
			if (status == PLAYING_ON) {
				self.drawFrame(currentFrame);
				
				if (bReverse) {
					if (currentFrame == 0) {
						if (bRotate) {
							currentFrame = length - 1;
						}
						else {
							self.debug("play end.");
							status = PLAYING_DONE;
					
							if (playDoneCallback != null) playDoneCallback(self);
							clearTimeout(timer);
							return;
						}
					}
					else {
						currentFrame--;
					}
				}
				else {
					if (currentFrame == length - 1) {
						if (bRotate) {
							currentFrame = 0;
						}
						else {
							self.debug("play end.");
							status = PLAYING_DONE;
					
							if (playDoneCallback != null) playDoneCallback(self);
							clearTimeout(timer);
							return;
						}
					}
					else {
						currentFrame++;
					}
				}
			}
			else if (status == PLAYING_STOPPED) {
				clearTimeout(timer);
				return;
			}
			
			setTimeout(self._play, duration);
		}
		
		this.drawFrame = function(frm) {
			if (mode == "serial") {
				var margin = frm * width;
				$("img", container).css("margin-left", "-" + margin + "px");
			}
			else {
				$("img", container).attr("src", images[frm].src);
			}
			currentFrame = frm;
			if (frameAtCallback != null) {
				frameAtCallback(self, currentFrame);
			}
		}
		
		this._preload = function() {
			if (mode == "frame") {
				images = new Array(parseInt(frame.length / step));
				for (var i=0; i<images.length; i++) {
					images[i] = new Image();
					images[i].src = frame[i * step];
					self.debug(images[i].src + " preloaded");
				}
				length = images.length;

			}
		}
		
		this.size = function() {
			return length;
		}
		
		this.getImage = function(frameIdx) {
			return images[frameIdx].src;
		}
		this.setImage = function(frameIdx, frameSrc) {
			images[frameIdx].src = frameSrc;
		}
		
		this.isLoaded = function() {
			return bLoaded;
		}
		
		this.isReverse = function() {
			return bReverse;
		}
		
		this.setReverse = function(b) {
			bReverse = b;
		}
		
		this.isPlaying = function() {
			return (status == PLAYING_ON);
		}
		
		this.isStopped = function() {
			return (status == PLAYING_STOPPED);
		}
		
		this.isPaused = function() {
			return (status == PLAYING_PAUSED);
		}
		
		this.isDone = function() {
			return (status == PLAYING_DONE);
		}
		
		this.setDuration = function(d) {
			duration = d;
		}
		
		this.getContainer = function() {
			return container;
		}
		
		this.play = function() {
			if (bLoaded) {
				self.debug("play start.");
				
				status = PLAYING_ON;
				bRotate = false;
				
				currentFrame = 0;
				var times = length;
				
				timer = setTimeout(self._play, duration);
			}
			else alert("Not Initialized");
		}
		
		this.rotate = function() {
			if (bLoaded) {
				self.debug("rotate start.");
				
				status = PLAYING_ON;
				bRotate = true;
				
				currentFrame = 0;
				var times = length;
				
				timer = setTimeout(self._play, duration);
			}
			else alert("Not Initialized");
		}
		
		this.pause = function() {
			status = PLAYING_PAUSED;
			self.debug("paused.");
		}
		
		this.resume = function() {
			status = PLAYING_ON;
			self.debug("resumed.");
		}
		
		this.stop = function() {
			status = PLAYING_STOPPED;
			
			currentFrame = 0;
			self.drawFrame(0);
			self.debug("stopped.");
		}
		
		this.debug = function(message) {
			if (debugContainer != null) {
				$(debugContainer).prepend(message + "<br>");
			}
		}

		/*init process start*/
		if (mode == "serial") {
			$(container).html("<div style=' width:" + width + "px; height:" + height + "px; overflow:hidden;'><img src='" + source + "' width='" + (width * length) + "' height='" + height + "' id='efusioniPlayer" + efusioniPlayerId + "' style='margin-left:0px'></div>");
		}
		else {
			$(container).html("<img src='" + frame[0] + "' width='" + width + "' height='" + height + "' id='efusioniPlayer" + efusioniPlayerId + "'>");
		}
		this._preload();
				
		bLoaded = true;
		if (loadCompleteCallback != null) loadCompleteCallback(this);
		self.debug("Load Complete.");
		/*init process end*/
		
	};
