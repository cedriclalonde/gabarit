/**
 * Created by cedriclalonde on 15-12-02.
 */



function Toggle() {
    var that = this;
    api.toggle = this;

    this.init = function () {
        $(".toggle-trigger-btn").hide();

        $('.cite-radio-quiz textArea').on('keyup', that.textAreaChanged);
        $('.toggle-multiple').on('keyup', that.textAreaChangedMultiple);


        $(".toggle-trigger-btn").off().on(browser, that.toggleIt);
        $('.toggle-trigger-btn-multiple').on(browser, that.toggleMultiple);
    };

    this.checkIfAnswered = function (question) {
        var userInput = $(question).find('textarea').val();
        var questionsInstructions = $(question).find('.question-instructions');

        if (userInput !== "") {
            return true;
        } else {
            return false;
        }
    };

    this.validation = function (question) {
        var userInput = $(question).find('textarea').val();
        console.log('userInput: ' + userInput);

        $(question).data('done', true);

        that.showAnswer(question);
        api.quiz.checkIfQuizDone(question);
        api.quiz.onDone_question(question);
    };

    this.showAnswer = function (question) {
        $(question).find('.retroaction').show();
        var content = $(question).find('.toggle-trigger-content');
        var hidden = $(content).is(":hidden");
        console.log(hidden);

        if (hidden) {
            $(content).toggle('blind', {}, 500);
        };
    };

    this.restart = function (question) {
        var content = $(question).find('.toggle-trigger-content');
        var hidden = $(content).is(":hidden");

        if (!hidden) {
            $(content).toggle('blind', {}, 500);
        };

        $(question).data('done', false);
    };

    //    this.onDone = function(root){
    //        $(root).attr('done', true);
    //
    //        if(that.checkIfAllQuestionsDone(root)){
    //            var title = $(root).closest('.content').find('h1');
    //            $(title).css({
    //                color: 'green',
    //                fonteight: 'bolder'
    //            });
    //
    //            $(title).prepend('<span class="glyphicon glyphicon-ok-sign" style="font-size: 23px;"></span> ');
    //            $('#myModal_1').modal('show');
    //            window.scrollTo(0,0);
    //        } else{
    //            console.log('not all Good!');
    //        };
    //
    //        //*******
    //        //CUSTOM ON DONE
    //        var fnstring = $(root).attr('onDone');
    //        var fnparams = $(root).attr('onDoneParams');
    //        var _fnparams = Array(fnparams);
    //
    //        var fn = window[fnstring];
    //
    //        if (typeof fn === "function") fn.apply(null, _fnparams);
    //    };
};
