/**
 * Created by cedriclalonde on 15-12-07.
 */


function OnStart(){
    var that = this;
    api.onStart = this;



    this.init = function(){
        console.log('GLOBAL DATA ON START ***: ');
        console.log(globalData);

        that.attachData();

        $('.insertion').hide();

        //globalData.currentPage = 9;
        api.navigation.goTo(globalData.currentPage);

        //globalData.questionDone = ["#p2_q1", "#p2_q2", "#p2_q3", "#p2_q4", "#p2_q5"];
        $.each(globalData.questionDone, function(index, value){
            that.getQuestionType(value);
        });

        //$.each(globalData.questionnaireDone, function(index, value){
        //    that.setQuestionnaireDone($(value), value);
        //});
        //
        //$.each(globalData.videoDone, function(index, value){
        //    api.video.done($(value));
        //});

        //if(globalData.examAccess){
        //    api.onDoneEvent.unlockExamen();
        //}

        //api.onDoneEvent.checkIfQuestionnaireAllDone();

        $('#delete-data-btn').on(browser, that.delete);

        //console.log('Avatar on start: '+globalData.avatar);
        //api.avatar.placeAvatar(globalData.avatar);

        that.setUpOnglet(globalData.currentPage);


        api.progressions.adjustScore();

    };

    this.attachData = function(){
        for(i=0; i<=$('.content').length; i++){
            var content = $('.content').get(i);
            $(content).data('num', i);
        }
    };

    this.setUpOnglet = function(page){


        if(page == 1){
            console.log("im here");
            $('.prevBtn').addClass('disabled');
            //$('.navBarSecond').hide();
        }else if(page == 2){
            //console.log('page: '+page);
            $('.nextBtn').removeClass('disabled');
            $('.prevBtn').addClass('disabled');
        } else if(page == 31){
            $('.nextBtn').addClass('disabled');
            $('.prevBtn').removeClass('disabled');
        } else{
            $('.nextBtn').removeClass('disabled');
            $('.prevBtn').removeClass('disabled');
        }
    };

    this.saveExamAccess = function(){
        globalData.examAccess = true;

        setTimeout(function(){
            $('#scorm').data('save')(globalData);
        }, 1000);
    };

    this.saveCurrentPage = function(page){
        console.log('save current page: '+page);

        globalData.currentPage = page;

        setTimeout(function(){
            $('#scorm').data('save')(globalData);
        }, 1000);
    };

    this.saveQuestionnaire = function(num){
        var exist = that.checkIfExist(globalData.questionnaireDone, num);
        if(!exist){
            //console.log('existe pas');
            globalData.questionnaireDone.push(num);

            setTimeout(function(){
                $('#scorm').data('save')(globalData);
            }, 1000);

            //console.log("SAUVEGARDE PAGE: "+globalData.questionnaireDone);

        } else{
            console.log('existe dejas');
        }
    };

    this.saveAvatar = function(name){
        globalData.avatar = name;

        console.log("globalData save avatar: ");
        console.log(globalData);

        setTimeout(function(){
            $('#scorm').data('save')(globalData);
        }, 1000);

    };

    this.addQuestion = function(id){
        var exist = that.checkIfExist(globalData.questionDone, id);
        if(!exist){
            //console.log('existe pas');
            globalData.questionDone.push(id);

            setTimeout(function(){
                $('#scorm').data('save')(globalData);
            }, 1000);

            //console.log("SAUVEGARDE PAGE: "+globalData.questionDone);

        } else{
            console.log('existe dejas');
        }
    };

    this.addVideo = function(id){
        //console.log('IN ADD VIDEO!!!');

        var exist = that.checkIfExist(globalData.videoDone, id);
        if(!exist){
            //console.log('existe pas');
            globalData.videoDone.push(id);

            setTimeout(function(){
                $('#scorm').data('save')(globalData);
            }, 1000);


            console.log("SAUVEGARDE PAGE: "+globalData.videoDone);

        } else{
            //console.log('existe dejas');
        }
    };

    this.checkIfExist = function(array, id){
        var exist = false;
        $.each(array, function(index, value){
            if(value === id){
                exist = true;
            }
        });

        return exist;
    }

    this.delete = function(e){
        window.top.location.reload();
        $('#scorm').data('delete')();
        window.top.scrollTo(0,0);
    };

    this.save = function(){
        $('#scorm').data('save')();
    };

    this.setQuestionnaireDone = function(id, value){
        console.log('setQuestionnaireDone:onStart');
        api.onDoneEventStart.unlockQuestionnaire(value);
        api.badges.activateQuestionnaire(value);

        if(value == 4){
                //console.log('OUI!!!');
                api.navigation.setMaxScreen(31);
        }
    };

    this.getQuestionType = function(id){
        //var id = '#'+id;
        var type = $(id).attr('data-type');
        $(id).data('done', true);

        switch(type){
            case "choix-reponse":
                api.choixReponse.showAnswer(id);
            break;
            case "choix-multiple":
                api.choixMultiple.showAnswer(id);
            break;
            case "reorder-item":
                api.reOrder.showAnswer(id);
                break;
            case "dragdrop":
                api.dragDrop.showAnswer(id);
            break;
            case "dragdrop-thermometre":
                //api.dragDropThermometre.showAnswer(id);
            break;
            case "dragdrop-dropdown":
                api.dropdown.showAnswer(id);
            break;
            case "toggle":
                api.toggle.showAnswer(id);

            break;
            case "dropdown":
                api.dropdown.showAnswer(id);
            break;
        }

        api.onDoneEventStart.onDone(id);
    }
}



