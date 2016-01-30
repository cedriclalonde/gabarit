/**
 * Created by cedriclalonde on 15-12-04.
 */

function Dropdown() {
    var that = this;
    api.dropdown = this;

    this.init = function () {
        $('.cite-dropdown a').on(browser, that.choicePressed);
        $('.dropdown-restart').on(browser, that.restartDropdown);
        $('.dropdown-restart').hide();
    };

    this.choicePressed = function (e) {
        console.log('choice pressed');

        var question = $(e.target).closest('.cite-question');

        $(question).data('answered', true);

        var title = $(question).find('.dropdown-toggle');
        $(title).text("Votre réponse : " + $(e.target).html());

        var index = $(e.target).parent().index();
        console.log('index: ' + index);

        $(question).data('user-answer', index);




        //        var answer = $(e.target).attr('data-answer');
        //        if(answer === 'good'){
        //            $(title).prepend('<span class="glyphicon glyphicon-ok" style="font-size: 23px;"></span> ');
        //            $(title).addClass('disabled');
        //
        //            $(root).find('.retroaction').fadeIn();
        //            //api.onDoneEvent.onDone(root);
        //        } else{
        //            console.log('mauvaise reponse');
        //            $(title).prepend('<span class="glyphicon glyphicon-remove" style="display: block; top: 9px;"></span>');
        //        }
    };

    this.putInRandomPosition = function(question){
        var radios = $(question).find('.dropdown-menu li');
        var theForm = $(question).find('.dropdown-menu');

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
        console.log('dropdown validation');

        var choices = $(question).find(".cite-dropdown a");
        var title = $(question).find('.dropdown-toggle');
        console.log(choices.length);


        $.each($(choices), function (index, value) {
            if ($(value).attr('data-answer') == 'good') {
                var userAnswer = $(question).data('user-answer');
                var answer = $(value).parent().index();

                if (userAnswer == answer) {
                    console.log('bonne reponse');

                    $(title).prepend('<span class="glyphicon glyphicon-ok" style="font-size: 17px;"></span> ');
                    $(title).addClass('disabled');

                    $(question).find('.retroaction').fadeIn();
                    //            //api.onDoneEvent.onDone(root);

                    var instruction = $(question).find('.question-instructions');
                    $(instruction).addClass('question-instructions-done');

                    $(question).data('done', true);

                } else {
                    $(title).prepend('<span class="glyphicon glyphicon-remove" style="display: block; top: 9px;"></span>');
                }
            }
        });

        api.quiz.checkIfQuizDone(question);
        api.quiz.onDone_question(question);

//        var good = $(choices).find('[data-answer="good"]');
    };

    this.restart = function (question) {
        $(question).find('.retroaction').hide();
        $(question).find('.dropdown-toggle').removeClass('disabled');
        $(question).find('.glyphicon').remove();
        $(question).find('.dropdown-toggle').html('Choisissez votre réponse');

        var instruction = $(question).find('.question-instructions');
        $(instruction).removeClass('question-instructions-done');

        $(question).data('done', false);
    }

    this.restartDropdown = function (e) {
        var question = $(e.target).closest('.cite-question');
        $(question).find('.retroaction').hide();
        $(question).find('.dropdown-toggle').removeClass('disabled');
        $(question).find('.glyphicon').remove();
        $(question).find('.dropdown-toggle').html('Choisissez votre réponse');
        $(e.target).hide();
    };

    this.checkIfAnswered = function (question) {
        var answered = $(question).data('answered');
        if (answered) {
            return true;
        } else {
            return false;
        }
    };

    this.getTitleHtml = function (root) {
        $.each($(root).find('li'), function (index, value) {
            if ($(value).attr('data-answer')) {
                return $(value).html();
            }
        });
    }

    this.showAnswer = function (question) {
        $(question).find('.glyphicon').remove();

        var title = $(question).find('.dropdown-toggle');
        $(title).prepend('<span class="glyphicon glyphicon-ok" style="font-size: 23px;"></span> ');
        $(title).addClass('disabled');
        $(title).html(that.getTitleHtml());

        $(question).find('.retroaction').fadeIn();
    };

}
