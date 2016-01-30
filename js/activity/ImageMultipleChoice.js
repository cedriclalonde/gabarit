/**
 * Created by cedriclalonde on 15-12-02.
 */



function ImageMultipleChoice(){
    var that = this;
//    api.toggle = this;

    this.init = function(){
        $(".imageMultipleChoice img").off().on(browser, that.toggleChoice);
        $(".imageMultipleChoice .btn-checkAnswer").on(browser, that.checkAnswer);
        $(".imageMultipleChoice .btn-restart").on(browser, that.restart);

        var choices = $(".imageMultipleChoice").find('img');

        $(".imageMultipleChoice .tryText").html("Bonne réponse(s): "+0+"/"+choices.length);

    };

    this.toggleChoice = function(e){
        console.log('toggleit');

        var root = $(e.target).closest('.imageMultipleChoice');
        $(root).find('.btn-checkAnswer').fadeIn();

        $(e.target).toggleClass('imageChoosed');
        $(e.target).toggleClass('rounded-corners');


    };

    this.checkAnswer = function(e){
        var root = $(e.target).closest('.imageMultipleChoice');
        var userGoodAnswer = 0;

        var symbol = $(root).find('i');
        $(symbol).hide();

        $.each($('.imageMultipleChoice img'), function(index, value){
            var answer = $(value).attr('data-answer');
            console.log(answer);

           if($(value).hasClass('imageChoosed')){
               if(answer == "good"){
                   $(value).off(browser, that.toggleChoice);
                   $(value).addClass('goodAnswerImageMultipleChoice');

                   $(value).data('good', true);
                   userGoodAnswer++;

                   var check = $(value).parent().find(".check");
                   $(check).fadeIn();
               } else{
                   var check = $(value).parent().find(".theX");
                   $(check).fadeIn();
               }
           } else{
               if(answer == undefined){
                   $(value).data('good', true);
                   userGoodAnswer++;
               }
           }
        });

        that.checkIfAllGood(root, userGoodAnswer);
    };

    this.checkIfAllGood = function(root, userGoodAnswer){
        var choices = $(root).find('img');



        if(choices.length == userGoodAnswer){
            console.log('all good');

            $(root).find('img').off();

            $(root).find('.btn-checkAnswer').hide();
            $(root).find('.btn-restart').fadeIn();
            $(root).find('.retroaction').fadeIn();

            $(root).find('.quiz-instructions').css({
                backgroundColor: '#CAE6BE'
            });

            var images = $(root).find('img');
            $(images).removeClass('goodAnswerImageMultipleChoice');
        }

        $(root).find('.tryText').html("Bonne réponse(s): "+userGoodAnswer+"/"+choices.length);

    };

    this.restart = function(e){
        console.log('restart');

        var root = $(e.target).closest('.imageMultipleChoice');
        var images = $(root).find('img');

        $(images).removeClass('imageChoosed');
        $(images).removeClass('goodAnswerImageMultipleChoice');
        $(images).removeClass('rounded-corners');

        $(images).off().on(browser, that.toggleChoice);

        $(e.target).hide();
        $(root).find('.btn-checkAnswer').fadeIn();
        $(root).find('.retroaction').hide();

        $(root).find('.quiz-instructions').css({
            backgroundColor: 'rgb(245, 245, 245)',
            color: 'black'
        });

        var tryText = $(root).find('.tryText');
        $(tryText).html("Bonne réponse(s): "+0+"/"+images.length);


        var symbol = $(root).find('i');
        $(symbol).hide();

    };

};
