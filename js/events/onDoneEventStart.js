/**
 * Created by cedriclalonde on 15-12-05.
 */

function OnDoneEventStart(){
    var that = this;
    api.onDoneEventStart = this;

    var module;

    this.onDone = function(root){
        console.log('onDone : Event');

        $(root).attr('done', true);

        $(root).find('.quiz-instructions').css({
            backgroundColor: '#93CA89'
        });

        api.progressions.adjustScore();

        if(that.checkIfAllQuestionsDone(root)){
            var title = $(root).closest('.content').find('h1');
            $(title).css({ color: 'green', fontWeight: 'bolder'});
            //$(title).prepend('<span class="glyphicon glyphicon-ok-sign" style="font-size: 23px;"></span> ');

            var page = $(root).closest('.content');
            $(page).data('done', true);

            that.checkIfModuleDone(root);

            var thePageNum = $(root).closest('.content').data('num');
            console.log('THE PAGE NUM - on done event start: ');

            var smallIcon = $('.navBtnPage').get(thePageNum-2);
            $(smallIcon).find('.smallIcon').css({
                color: 'green'
            });

        } else{
            //console.log('not all Good!');
        };

        //*******
        //CUSTOM ON DONE
        var fnstring = $(root).attr('onDone');
        var fnparams = $(root).attr('onDoneParams');
        var _fnparams = Array(fnparams);

        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, _fnparams);
    };


    this.checkIfAllQuestionsDone = function(root){
        var nQuiz = $(root).closest('.content').find('.cite-radio-quiz');
        //console.log('nQuiz : '+nQuiz.length);

        var numQuestions = nQuiz.length;
        var numQuestionsDone = 0;
        var good = false;

        $.each($(nQuiz), function(index, value){
            var done = $(value).attr('done');
            if(done){
                //console.log('quiz done: '+index);
                numQuestionsDone++;
            } else{
                //console.log('quiz not done: '+index);
            }
        });


        var thePageNum = $(root).closest('.content').data('num');
        var smallIcon = $('.navBtnPage').get(thePageNum-2);
        $(smallIcon).find('.smallIcon').css({
            color: 'green'
        });


        //console.log('LE MODULE: '+);

        //var module = $(root).closest('.content').data('module');
        //console.log('quiz done: '+numQuestionsDone+"/"+numQuestions);
        //var percent = (numQuestionsDone / numQuestions) * 100;
        //$('.progression-module'+module).css({
        //    width: percent+'%'
        //});

        if(numQuestions == numQuestionsDone){
            good = true;
        } else{
            good = false;
        }

        return good;
    };

    that.checkIfModuleDone = function(root){
        var pageRoot = $(root).closest('.content');
        module = $(pageRoot).data('module');

        var questionnaire = $('.questionnaire-page').get((module-1));
        var numPageDone = 0;

        $.each($('.module'+module), function(index, value){
            var pageDone = $(value).data('done');

            console.log(pageDone);
            if(pageDone){
                //console.log('page done');
                numPageDone++;
            } else{
                //console.log('page not done');
            }
        });


        var module = $(root).closest('.content').data('module');
        var percent = (numPageDone / $('.module'+module).length) * 100;

        console.log('NUMPAGEDONE: '+numPageDone);
        console.log('MODULE: '+module);
        console.log('module done: '+numPageDone+"/"+$('.module'+module).length);

        $('.progression-module'+module).css({ width: percent+'%'});
        $('.progression-module'+module).html(Math.round(percent)+"% Complété ("+numPageDone+"/"+$('.module'+module).length+")");

        if(percent == 100){
            $('.progression-module'+module).removeClass('progress-bar-info');
            $('.progression-module'+module).addClass('progress-bar-success');
        }



        if($('.module'+module).length != 0){
            if(numPageDone === $('.module'+module).length){
                console.log('MODULE DONE');

                //$('.content').hide();
                //$(questionnaire).fadeIn();

                console.log('*** onDoneEventSart - unlockQuestionnaire: '+module-1);
                that.unlockQuestionnaire((module-1));

                console.log('set the currentSreen after questionnaire done: '+Number($(questionnaire).index() - 2));
                //api.navigation.setCurrentScreen(Number($(questionnaire).index() - 2));
            }
        } else{
            console.log('QUESTIONNAIRE TERMINER! onDoneEventStart');

            var index = $(pageRoot).attr('data-index');
            console.log(pageRoot);
            console.log('MODULE OF PAGE ROOT: '+index);
            $(pageRoot).data('done', true);

            console.log("badges unlock: "+parseInt(index));
            api.badges.activateQuestionnaire(parseInt(index));

            that.checkIfQuestionnaireAllDone();
        }

    };

    this.unlockQuestionnaire = function(num){
        var questionnaire = $('.questionnaire-page').get(num);
        //console.log(questionnaire);
        //$(questionnaire).fadeIn();
        $(questionnaire).data('done', true);

        var navBtnQuestionnaire = $('.questionnaire').get(num);
        $(navBtnQuestionnaire).attr('data-nav-disabled', 'enabled');
        $(navBtnQuestionnaire).removeClass('disabled');



        console.log(num);
        if(num == 4){
            $('.nextBtn').removeClass('disabled');
        }


        if(num == $('.questionnaire-page').length-1){

            //**************************************************
            console.log('YES IT IS THE LAST QUESTIONNAIRE!!');

            $('.nextBtn').off().on(browser, api.navigation.gotoNextScreen);

            var currentNavMax = api.navigation.getMaxScreen();
            currentNavMax+=1;
            api.navigation.setMaxScreen(currentNavMax);
            //$('.nextBtn').addClass('disabled');
        } else{
            //api.navigation.gotoNextScreen({preventDefault: function(){}});
        }
    };

    this.checkIfQuestionnaireAllDone = function(e){
        var numQuestionnaireDone = 0;

        $.each($('.questionnaire-page'), function(index, value){
            if($(value).data('done')){
                numQuestionnaireDone++;
            };
        });

        //console.log('questionnaire-page done: '+ numQuestionnaireDone+ "/"+ $('.questionnaire-page').length);
        //if(numQuestionnaireDone === $('.questionnaire-page').length){
        //
        //    if($('.progress-video').length >=100){
        //        console.log('UNLOCK EXAMEN!');
        //
        //        $('#myModal_1').modal('show');
        //        $('.modal-title').html("Accès à l'examen");
        //        $('.modal-body').html('<p>Tu peux maintenant faire ton examen en cliquant sur ce lien.</p>' +
        //        '<a href="/d2l/common/dialogs/quickLink/quickLink.d2l?ou=136002&amp;type=quiz&amp;rcode=LCc-783309" target="_blank">Examen</a>');
        //
        //        api.progressions.unlockExam();
        //    }
        //
        //};

    };
}
