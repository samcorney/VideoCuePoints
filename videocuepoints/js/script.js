jQuery(window).load(function(){
	setupVideo();
});

var VideoText = function(cuePoint, text){
	this.cuePoint = cuePoint;
	this.text = text;
};

function setupVideo(){
	var video = $('#example-video')[0];
	var videoTextHolder = $('#video-text-holder');
	var videoPauseRange = 0.5;
	// Array of cue points for when you would like the video to be paused.
	var videoPauseCuePoints = [4.5];
	// Array of cue points which trigger text changes outside the video.
	var textCuePoints = [new VideoText(4.5, 'The video hit a cue point and has been paused!'), new VideoText(7, 'You can set the video to trigger events that effect elements outside the video. This text has been triggered by the video passing the 7 second mark!')];
	var textFadedIn = false;
	var caughtVideo = false;

	/* 
	When timeupdate is trigggered loop through all the cue points
	to check if the current playback position of the video lies within one.
	If the current playback position of the video lies within a cue point
	respond accordingly by changing some text, pausing the video, etc.
	*/
	$('#example-video').bind('timeupdate', function(){
		$.each(videoPauseCuePoints, function(index, value){
			if(video.currentTime > value && video.currentTime < value + videoPauseRange && !caughtVideo){
				caughtVideo = true;
				video.pause();
			}
		});
		$.each(textCuePoints, function(index, videoText){
			if(video.currentTime > videoText.cuePoint && video.currentTime < videoText.cuePoint + videoPauseRange && !textFadedIn){
				videoTextHolder.html(videoText.text);
				textFadedIn = true;
				waitAndReset();
			}
		});
	});

	$('#play-button').on('click', function(){
		if(video.paused){
			video.play();
			waitAndReset();
		}
	});

	function waitAndReset(){
		if(!video.paused){
			setTimeout(function(){
				caughtVideo = false;
				textFadedIn = false;
			}, videoPauseRange * 1000);
		}
	}
}