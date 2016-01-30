/**
 * Created by cedriclalonde on 15-12-02.
 */

function ChoixMultiple() {
    var that = this;
    api.choixMultiple = this;
    //    var nGood;

    this.init = function () {
        $('.choix-multiple-restart').off().on(browser, that.choixMultipleRestartPressed);
        $('.choix-multiple-verifier').off().on(browser, that.choixMultipleVerifierPressed);

        $('.choix-multiple-restart').hide();
    };


    this.putInRandomPosition = function(question){
        var radios = $(question).find('.checkbox');
        var theForm = $(question).find('.container');

        $.each(radios, function(index, input){
            randomArray = [];
            var randomArray = $.randomArray($(radios).length);

            for (i = 0; i < randomArray.length; i++) {
                var radio = $(radios).get(randomArray[i]);
                $(radio).appendTo(theForm);
            };
        });
    };


    this.validation = function (question) {
        console.log('checkbox validation');

        $(question).data('numGood', 0);

        var glyphicon = $(question).find(".glyphicon");
        $(glyphicon).remove();

        var checkbox = $(question).find('input');

        $.each($(checkbox), function (index, value) {

            if ($(value).is(':checked') && $(value).attr('data-answer') == 'good' ||
                $(value).is(':checked') == false && $(value).attr('data-answer') == undefined) {
                $(value).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');

                var increment = $(question).data('numGood') + 1;
                $(question).data('numGood', increment);
                var numGood = $(question).data('numGood');

                console.log(numGood, $(checkbox).length);


                //                console.log('nGood: '+_nGood);
                if (numGood == $(checkbox).length) {
                    console.log('QUESTION DONE!');
                    $(checkbox).attr("disabled", true);
                    $(question).find('.retroaction').fadeIn();
                    //api.onDoneEvent.onDone(root);

                    //                    $(e.target).fadeOut();

                    var instruction = $(question).find('.question-instructions');
                    $(instruction).addClass('question-instructions-done');

                    $(question).data('done', true);
                    api.quiz.onDone_question(question);
                }
            } else {
                $(value).parent().prepend('<span class="glyphicon glyphicon-remove"></span>');
            }

            $(question).find(".glyphicon").show();
        });

        api.quiz.checkIfQuizDone(question);
    };

    this.checkIfAnswered = function (question) {
        console.log('choix-multiple checkifanswered');

        var choices = $(question).find('input');
        var answered = 0;

        $.each($(choices), function (index, choice) {
            console.log('this check');
            console.log($(choice).is(':checked'));

            if ($(choice).is(':checked')) {
                answered++;
            } else {

            }

        });

        if (answered > 0) {
            return true;
        } else {
            return false;
        }


    };

    this.choixMultipleVerifierPressed = function (e) {
        var root = $(e.target).closest('.cite-question');
        var checkbox = $(root).find('input:checkbox');
        var nGood = 0;

        $(root).find('.glyphicon').remove();

        $.each($(checkbox), function (index, value) {
            if ($(value).is(':checked') && $(value).attr('data-answer') == 'good' ||
                $(value).is(':checked') == false && $(value).attr('data-answer') == undefined) {
                $(value).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');
                nGood++;

                $(checkbox).attr("disabled", true);

                if (nGood == $(checkbox).length) {
                    console.log('question done!');

                    $(root).find('.retroaction').fadeIn();
                    //api.onDoneEvent.onDone(root);

                    $(e.target).fadeOut();
                }
            } else {
                $(value).parent().prepend('<span class="glyphicon glyphicon-remove"></span>');
            }

            $(root).find(".glyphicon").show();
        });
    };

    this.checkIfAllGood = function () {

    };

    this.choixMultipleRestartPressed = function (e) {
        var root = $(e.target).closest('.cite-question');
        var checkbox = $(root).find('input:checkbox');

        $(checkbox).attr("disabled", false);
        $(checkbox).attr('checked', false);
        $(root).find('.glyphicon').remove();
        $(root).find('.retroaction').hide();
    };

    this.restart = function (question) {
        var checkbox = $(question).find('input:checkbox');

        $(checkbox).attr("disabled", false);
        $(checkbox).attr('checked', false);

        $(question).find('.glyphicon').remove();
        $(question).find('.retroaction').hide();

        var instruction = $(question).find('.question-instructions');
        $(instruction).removeClass('question-instructions-done');

        $(question).data('done', false);
    };

    this.showAnswer = function (question) {
        var checkbox = $(question).find('input:checkbox');
        var nGood = 0;

        $(question).find('.glyphicon').remove();

        $(checkbox).attr("disabled", true);
        $(question).find('.retroaction').fadeIn();
        $(checkbox).attr('disabled', true);
        $(checkbox).parent().prepend('<span class="glyphicon glyphicon-ok"></span>');

        $.each($(checkbox), function (index, value) {
            if ($(value).attr('data-answer') == 'good') {
                $(value).prop('checked', true);
            } else if ($(value).attr('data-answer') == undefined) {
                $(value).prop('checked', false);
            }
        });

        $(question).find(".glyphicon").show();
        $(question).find('.retroaction').show();
        $(question).find('.choix-multiple-verifier').hide();

    };
};
