/**
 * Created by cedriclalonde on 15-12-04.
 */

function Dropdown(){
    var that = this;
    api.dropdown = this;

    this.init = function(){
        $('.cite-dropdown a').on(browser, that.choicePressed);
        $('.dropdown-restart').on(browser, that.restart);
        $('.dropdown-restart').hide();

        $('.dropdown-verifier').on(browser, that.checkAnswer);
    };

    this.choicePressed = function(e){
        var root = $(e.target).closest('.cite-question');

        var text = $(e.target).html();
        console.log(text);
        var title = $(e.target).closest('.dropdown').find('button');
        $(title).text("Votre réponse : " +text);

        var answer = $(e.target).attr('data-answer');
        $(title).data('answer', answer);

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

    this.checkAnswer = function(e){
        var root = $(e.target).closest('.cite-question');
        var dropdown = $(root).find('button');
        var dropdownMenu = $(root).find('.dropdown-menu');

         var numGood = 0;

        $.each($(dropdown), function(index, value){
            var answer = $(value).data('answer');

            if(answer === 'good'){
                $(value).prepend('<span class="glyphicon glyphicon-ok" style="font-size: 23px;"></span> ');
                $(value).addClass('disabled');

                $(root).find('.retroaction').fadeIn();
                //api.onDoneEvent.onDone(root);

                numGood++;
            } else{
                console.log('mauvaise reponse');
                $(value).prepend('<span class="glyphicon glyphicon-remove" style="display: block; top: 9px;"></span>');
            }

        });

        if(numGood === $(dropdownMenu).length){
            console.log('bravo! All Good!');
        } else {
            console.log('not good!');
        }
    };

    this.restart = function(e){
        var root = $(e.target).closest('.cite-question');
        $(root).find('.retroaction').hide();
        $(root).find('.dropdown-toggle').removeClass('disabled');
        $(root).find('.glyphicon').remove();

        $(root).find('.dropdown-toggle').html('Choisissez votre réponse');
        $(e.target).hide();
    };

    this.getTitleHtml= function(root){
        $.each($(root).find('li'), function(index, value){
            if($(value).attr('data-answer')){
                return $(value).html();
            }
        });
    }

    this.showAnswer = function(root){
        var title = $(root).find('.dropdown-toggle');
        $(title).prepend('<span class="glyphicon glyphicon-ok" style="font-size: 23px;"></span> ');
        $(title).addClass('disabled');
        $(title).html(that.getTitleHtml());

        $(root).find('.retroaction').fadeIn();
    };

}
