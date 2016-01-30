/**
 * Created by cedriclalonde on 15-12-02.
 */


function ChoixReponse() {
    var that = this;
    api.choixReponse = this;

    this.init = function () {
        $('.choix-reponse-restart').hide();

        //        $('.cite-question .quiz-scoreboard').hide();


        $("input:radio").off().on('change', that.radioButtonChanged);
        $('.choix-reponse-restart').off().on(browser, that.choixReponseRestartPressed);


        var pointage = $('[data-type="choix-reponse"]').attr('data-pointage');
        console.log(pointage);

        var quiz = $('[data-type="choix-reponse"]').closest('.cite-quiz');
        console.log(quiz);

    };

    this.putInRandomPosition = function(question){
//        var random = $('[data-type="choix-reponse"]').attr('data-random');
//        console.log('CHOIX REPONSE RANDOM: '+random);

        var radios = $(question).find('.radio');
        var theForm = $(question).find('.theForm');

        $.each(radios, function(index, input){
            randomArray = [];
            var randomArray = $.randomArray($(radios).length);

            console.log('RANDOM ARRAY CHOIX REPONSE: '+randomArray);

            for (i = 0; i < randomArray.length; i++) {
                var radio = $(radios).get(randomArray[i]);
                $(radio).appendTo(theForm);
            };
        });

    };

    this.checkIfAnswered = function (question) {
        console.log('choix-reponse checkifanswered');

        var choices = $(question).find('input');
        var answered = 0;

        $.each($(choices), function (index, choice) {
            console.log('this check');
            console.log($(choice).is(':checked'));

            if ($(choice).is(':checked')) {
                answered++;
            }
        });

        if (answered > 0) {
            return true;
        } else {
            return false;
        }
    };

    this.radioButtonChanged = function (e) {
        var answer = $(e.target).attr('data-answer');
        var root = $(e.target).closest('.cite-question');

        if ($(root).attr('data-validation') == 'auto') {

            var input = $(root).find(".glyphicon");
            $(input).remove();

            if (answer == 'good') {
                var input = $(root).find("input:radio");
                $(input).attr('disabled', true);

                $(e.target).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');
                var gly = $(e.target).closest().find(".glyphicon");
                $(gly).show();

                $(root).find('.retroaction').fadeIn();

                //api.onDoneEvent.onDone(root);

            } else {
                $(e.target).parent().append('<span class="glyphicon glyphicon-remove"></span>');
                $(root).find(".glyphicon").show();
            }

        } else {
            console.log('non');
        }

    };

    this.validation = function (question) {
        var choices = $(question).find('input');

        var glyphicon = $(question).find(".glyphicon");
        $(glyphicon).remove();

        $.each($(choices), function (index, value) {
            //            console.log($(value).is(':checked'));
            if ($(value).is(':checked')) {
                if ($(value).attr('data-answer') == 'good') {
                    console.log('bonne reponse');

                    var input = $(question).find("input:radio");
                    $(input).attr('disabled', true);

                    $(value).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');
                    var gly = $(value).closest().find(".glyphicon");
                    $(gly).show();
                    $(question).find('.retroaction').fadeIn();

                    var instruction = $(question).find('.question-instructions');
                    $(instruction).addClass('question-instructions-done');

                    $(question).data('done', true);

                    api.quiz.onDone_question(question);

                } else {
                    console.log('mauvaise reponse');
                    $(value).parent().append('<span class="glyphicon glyphicon-remove"></span>');
                    $(question).find(".glyphicon").show();
                }
            }
        });

        api.quiz.checkIfQuizDone(question);

        var isRetroAlways = $(question).attr('data-retroaction');
        console.log("isRetroAlways: "+isRetroAlways);

        if(isRetroAlways == 'always'){
            $(question).find('.retroaction').fadeIn();
        };
    };



    this.checkAnswer = function (e) {
        var root = $(e.target).closest('.cite-question');

        var input = $(root).find(".glyphicon");
        $(input).remove();

        if (answer == 'good') {
            var input = $(root).find("input:radio");
            $(input).attr('disabled', true);

            $(e.target).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');
            var gly = $(e.target).closest().find(".glyphicon");
            $(gly).show();
            //$(root).find('.choix-reponse-restart').show();

            $(root).find('.retroaction').fadeIn();


            //api.onDoneEvent.onDone(root);


        } else {
            $(e.target).parent().append('<span class="glyphicon glyphicon-remove"></span>');
            $(root).find(".glyphicon").show();
        }
    };

//    this.choixReponseRestartPressed = function (e) {
//        $(e.target).hide();
//        var root = $(e.target).closest('.cite-question');
//        $(root).find('.glyphicon').remove();
//        $(root).find('.retroaction').hide();
//        $(root).find('input:radio').attr('disabled', false);
//        $(root).find('input:radio').prop('checked', false);
//    };

    this.restart = function (question) {
        $(question).find('.glyphicon').remove();
        $(question).find('.retroaction').hide();
        $(question).find('input:radio').attr('disabled', false);
        $(question).find('input:radio').prop('checked', false);

        $(question).find('.question-instructions').removeClass('question-instructions-done');
        $(question).data('done', false);
    };

    this.showAnswer = function (question) {
        var input = $(question).find('input');
        $(question).find('.glyphicon').remove();

        $.each($(input), function (index, value) {
            if ($(value).attr('data-answer') === 'good') {
                $(value).prop('checked', true);

                $(value).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');
                var gly = $(value).parent().find(".glyphicon");
                $(gly).show();
            }
        });

        var input = $(question).find("input:radio");
        $(input).attr('disabled', true);

        $(question).find('.retroaction').show();

        //api.onDoneEvent.onDone(root);
    }
};
