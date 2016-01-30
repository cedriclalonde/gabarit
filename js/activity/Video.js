/**
 * Created by cedriclalonde on 15-12-06.
 */

function Video(){
    var that = this;
    api.video = this;

    this.init = function(){
        $('.btn-video-done').on(browser, that.onDone);
    };

    this.onVideoEnded = function(id){

        console.log('video ended: '+id);
        switch(id){
            case 'video1':

            break;
        }



    };

}
