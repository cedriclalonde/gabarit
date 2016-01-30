/**
 * Created by cedriclalonde on 15-11-29.
 */

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
//var player2;

var ua = navigator.userAgent;
browser = (ua.match(/ipad/i)) ? "touchstart" : "click";

//<iframe width="640" height="360" src="https://www.youtube.com/embed/OR9-JISpJ9M?rel=0&amp;fs=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

function onYouTubeIframeAPIReady() {
    loadVideo({
        divID: 'player',
        videoID: 'OR9-JISpJ9M'
    });

    loadVideo({
        divID: 'player2',
        videoID: 'YPBurN28khM'
    });
};

function loadVideo(obj){
    player = new YT.Player(obj.divID, {
        height: '390',
        width: '640',
        videoId: obj.videoID,
//        playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0 },
        playerVars: { 'showinfo': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
//   event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    //console.log(event.data);
    //if (event.data == YT.PlayerState.PLAYING && !done) {
    //    setTimeout(stopVideo, 6000);
    //    done = true;
    //}

    if(event.data == YT.PlayerState.ENDED){
        //console.log('video done!');
        $(function(){
            var iframe = event.target.getVideoEmbedCode();
//            console.log('video done: '+$(iframe).attr('data-player-id'));

//            $('#p1_quiz1').fadeIn();


            var id = $(iframe).attr('data-player-id');
            api.video.onVideoEnded(id);

            $('#myModal').modal('toggle');

        });
    }
}
function stopVideo() {
    player.stopVideo();
}
