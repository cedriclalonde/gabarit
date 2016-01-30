/**
 * Created by cedriclalonde on 15-12-05.
 */

function OnDoneEvent(){
    var that = this;
    api.onDoneEvent = this;

    var module;

    var examLink =




    this.onDone = function(root){
        //******************************
        console.log('QUESTION TERMINÉ');

        $(root).attr('done', true);

        var page = $(root).closest('.content');

        var id = "#"+$(root).attr('id');
        console.log('le id de la page: '+id);
        api.onStart.addQuestion(id);


        api.progressions.adjustScore();
        $(root).find('.quiz-instructions').css({
            backgroundColor: '#93CA89'
        });


        if(that.checkIfAllQuestionsDone(root)){
            //****************************
            console.log('PAGE TERMINER!');

            var title = $(root).closest('.content').find('h1');
            $(title).css({ color: 'green', fontWeight: 'bolder' });

            //$(title).prepend('<span class="glyphicon glyphicon-ok-sign" style="font-size: 23px;"></span> ');

            window.top.scrollTo(0,0);
            $(page).data('done', true);
            that.checkIfModuleDone(root);

            var thePageNum = $(root).closest('.content').data('num');
            var smallIcon = $('.navBtnPage').get(thePageNum-2);
            $(smallIcon).find('.smallIcon').css({
                color: 'green'
            });

            //var btnPage = $('.navBtnPage').get(0)
            //$(btnPage).hide();

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
        //console.log('nQuiz: '+nQuiz.length);

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

        console.log('module done: '+numPageDone+"/"+$('.module'+module).length);


        api.progressions.show();

        setTimeout(function(){
            var module = $(root).closest('.content').data('module');
            var percent = (numPageDone / $('.module'+module).length) * 100;

            $('.progression-module'+module).css({ width: percent+'%'});
            $('.progression-module'+module).html(Math.round(percent)+"% Complété ("+numPageDone+"/"+$('.module'+module).length+")");

            if(percent == 100){
                $('.progression-module'+module).removeClass('progress-bar-info');
                $('.progression-module'+module).addClass('progress-bar-success');
            }
        }, 500);



        if($('.module'+module).length != 0){
            if(numPageDone === $('.module'+module).length){

                //****************************
                console.log('MODULE DONE - UNLOCK QUESTIONNAIRE');

                //$('.content').hide();
                //$(questionnaire).fadeIn();
                console.log('*** unlockQuestionnaire: '+module-1);
                that.unlockQuestionnaire((module-1));

                console.log('set the currentSreen after questionnaire done: '+Number($(questionnaire).index() - 2));
                //api.navigation.setCurrentScreen(Number($(questionnaire).index() - 2));
            }
        } else{

            //*************************************
            console.log('QUESTIONNAIRE TERMINER!');

            var index = $(pageRoot).attr('data-index');
            console.log(pageRoot);
            console.log('MODULE OF PAGE ROOT: '+index);
            api.badges.show(index);


            console.log('questionnaire terminer: onDoneEvent');
            api.onStart.saveQuestionnaire(index);


            //api.onStart.addQuestionnaire("#"+$(pageRoot).attr('id'));

            that.checkIfQuestionnaireAllDone();
        }

    };

    this.setQuestionnaireDone = function(id){
        var index = $(pageRoot).attr('data-index');
        console.log(pageRoot);
        console.log('MODULE OF PAGE ROOT: '+index);

        api.badges.show(index);

        that.checkIfQuestionnaireAllDone();
    }

    this.unlockQuestionnaire = function(num){
        // message - fin module
        // var message = "Bravo! Tu as complété le module "+module+". Tu peux maintenant accéder au questionnaire par l'entremise du menu.";
        var message = "Bravo ! Vous avez maintenant terminé votre exploration de l’Allemagne. Prenez le temps de tout revoir avant de continuer vers votre discussion et votre questionnaire de la semaine.";

        //var questionnaire = $(e.currentTarget)

        $('#myModal_1').modal('show');
//        $('.modal-title').html('Module '+module);
        $('.modal-title').html('Allemagne');
        //$('.modal-body').html(message[(module-1)]);
        $('.modal-body').html(message);

        //$('.content').hide();
        var questionnaire = $('.questionnaire-page').get(num);
        $(questionnaire).data('done', true);

        var navBtnQuestionnaire = $('.questionnaire').get(num);
        $(navBtnQuestionnaire).attr('data-nav-disabled', 'enabled');
        $(navBtnQuestionnaire).removeClass('disabled');

        //#469D46


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

    this.checkIfQuestionnaireAllDone = function(){
        var numQuestionnaireDone = 0;
        var numVideoDone = 0;

        $.each($('.questionnaire-page'), function(index, value){
            if($(value).data('done')){
                numQuestionnaireDone++;
            };
        });

        $.each($('.video'), function(index, value){
            if($(value).data('done')){
                numVideoDone++;
            };
        });

        console.log('questionnaire-page done: '+ numQuestionnaireDone+ "/"+ $('.questionnaire-page').length);
        console.log('video-done: '+numVideoDone+ "/"+ ($('.video').length-2));



        if(numVideoDone == 14){
            console.log('OUI, VIDEO TERMINER!');
        }

        if(numQuestionnaireDone == 5){
            console.log('OUI, ACTIVITE TERMINER!');
        }

        if(numVideoDone == 14 && numQuestionnaireDone == 5){
            that.unlockExamen();
            api.onStart.saveExamAccess();
        }
    };

    this.unlockExamen = function(){
        console.log('UNLOCK EXAMEN!');

        $('#myModal_1').modal('show');
        $('.modal-title').html("Examen final");


        $('.modal-body').html($('#examText').html());
        $('.exam-message').show();

        api.progressions.unlockExam();
        api.onStart.saveExamAccess();
    }
}
