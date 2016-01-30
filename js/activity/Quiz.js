/**
 * Created by cedriclalonde on 16-01-18.
 */

function Quiz() {
    var that = this;
    api.quiz = this;


    this.init = function () {
        that.distributeData();
        that.initEvents();

//        that.applyRandomPositionAllQuestions();
        that.applyOneQuestionDesign();
        that.applyNumberedQuestion();
    };


//    ************************************
//    MET LES CHOIX DE REPONSE EN DESORDRE
//    ************************************
    this.applyRandomPositionAllQuestions = function(){
        $.each($('.cite-quiz'), function (index, quiz) {
            var quizLength = $(quiz).find('.cite-question').length;

            var questions = $(quiz).find('.cite-question');
            $.each($(questions), function (index, question) {
                var isRandom = $(question).attr('data-random');
                if(isRandom == "true"){
                    var type = $(question).attr('data-type');
                    that.applyRandomPosition(question, type);
                }
            });
        });
    };

//    ************************************
//    APPLIQUE LA NUMEROTATION AUX BOUTONS
//    ************************************
    this.applyNumberedQuestion = function () {
        $.each($('.cite-quiz'), function (index, quiz) {
            var quizLength = $(quiz).find('.cite-question').length;
            console.log(quizLength);

            var questions = $(quiz).find('.cite-question');
            $.each($(questions), function (index, question) {
                var instruction = $(question).find('.question-instructions');
                $(instruction).prepend(index + 1 + ". ");
            });
        });
    };


//    ************************************
//    CHANGE LE DESIGN POUR MONTRER SEULEMENT UNE QUESTION AU LIEU D'AVOIR UNE QUESTION DANS UN QUIZ
//    ************************************
    this.applyOneQuestionDesign = function () {
        $.each($('[data-single-question]'), function (index, quiz) {
            var quiz_question = $(quiz).find('.quiz-questions');
            $(quiz_question).css({
                padding: '0px',
                margin: '0px'
            });

            var cite_question = $(quiz).find('.cite-question');
            $(cite_question).css({
                paddingBottom: '0px'
            });

            $(quiz).find('.question-area').addClass('one-question');
            $(quiz).find('.question-intructions').hide();

            var question_scoreboard = $(quiz).find('.question-scoreboard');
            var retroaction = $(question_scoreboard).find('.retroaction');

            $(retroaction).css({
               marginBottom: '10px'
            });

            $(quiz).find('.container').css({
               marginLeft: '25px'
            });
        });

    };

    this.initEvents = function () {
        $('.btn-quiz-validation').on('click', that.btnValidationPressed);
        $('.btn-quiz-restart').on('click', that.btnRestartPressed);
        $('.btn-quiz-show-answers').on('click', that.btnShowAnswersPressed);
    }

    this.distributeData = function () {
        $.each($('.cite-quiz'), function (index, quiz) {
            var numTry = parseInt($(quiz).attr('data-number-try'));
            $(quiz).data('data-number-try', numTry);
        });
    }

    this.btnShowAnswersPressed = function (e) {
        var quiz = $(e.target).closest('.cite-quiz');
        $(quiz).find('.quiz-instructions').removeClass('quiz-instructions-done');

        var questions = $(quiz).find('.cite-question');
        $.each(questions, function (index, value) {
            var type = $(value).attr('data-type');
            that.showAnswers($(value), type);
        });

        $(e.target).hide();
        $(quiz).find('.btn-quiz-validation').hide();
        $(quiz).find('.btn-quiz-restart').fadeIn();
    };

    this.btnValidationPressed = function (e) {
        var quiz = $(e.target).closest('.cite-quiz');

        if (that.checkIallQuestionsAnswered(quiz)) {
            console.log('all questions answered');

            var questions = $(quiz).find('.cite-question');
            var numDone = 0;

            $.each(questions, function (index, question) {
                var type = $(question).attr('data-type');
                that.validateAnswers($(question), type);

                 if($(question).data('done')){
                    numDone++;
                }
            });

            if(numDone == $(questions).length){
                console.log('ALL QUESTIONS DONE!!!');

                $(quiz).find('.quiz-instructions').addClass('quiz-instructions-done');
                $(quiz).find('.btn-quiz-restart').fadeIn();
                $(quiz).find('.btn-quiz-validation').hide();

                $(quiz).find('.retroaction').fadeIn();

                that.onDone_question(quiz);

            } else{
                console.log('QUESTIONS NOT ALL DONE!!!');

                console.log('not all done!');
                var decrement = $(quiz).data('data-number-try') - 1;
                $(quiz).data('data-number-try', decrement);

                var numberLeft = $(quiz).data('data-number-try');
                console.log('number-try-left: ' + numberLeft);

                if (!numberLeft) {
                    console.log('no chance left');

                    $(quiz).find('.btn-quiz-show-answers').fadeIn();
                }

            }

        } else {
            console.log('not all answered');
        }

    };

    this.btnRestartPressed = function (e) {
        console.log('validation-pressed');

        $(e.target).hide();

        var quiz = $(e.target).closest('.cite-quiz');
        $(quiz).find('.quiz-instructions').removeClass('quiz-instructions-done');

        var questions = $(quiz).find('.cite-question');
        $(questions).find('.question-instructions').removeClass('question-instructions-done');

        $(questions).data('done', false);


        $.each(questions, function (index, question) {
            var type = $(question).attr('data-type');
            that.restart($(question), type);
        });

        $('.btn-quiz-show-answers').hide();
        $(quiz).find('.btn-quiz-validation').fadeIn();

        var numTry = parseInt($(quiz).attr('data-number-try'));
        $(quiz).data('data-number-try', numTry);
    };

    this.checkIallQuestionsAnswered = function (quiz) {
        var questions = $(quiz).find('.cite-question');
        var length = $(questions).length;
        var numAnswered = 0;

        $.each(questions, function (index, question) {
            var type = $(question).attr('data-type');
            var questionsInstructions = $(question).find('.question-instructions');

            if (type == 'toggle') {
                if (api.toggle.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'choix-reponse') {
                if (api.choixReponse.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'choix-multiple') {
                if (api.choixReponse.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'dragdrop-column') {
                if (api.dragDrop3.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'dragdrop-validation-end') {
                if (api.dragDrop2.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'dropdown') {
                if (api.dropdown.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'reorder-item') {
                if (api.reorder.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            } else if (type == 'dragdrop-texte-trous') {
                if (api.dragDrop4.checkIfAnswered(question)) {
                    numAnswered++;
                    $(questionsInstructions).removeClass('question-not-answered');
                } else $(questionsInstructions).addClass('question-not-answered');
            }


        });

        console.log(numAnswered)
        console.log($(questions).length);

        if (numAnswered == $(questions).length) {
            return true;
        } else {
            if ($(questions).length == 1) {
                console.log('ADD IT!');
                $(quiz).find('.quiz-instructions').addClass('question-not-answered');
            }

            //            modal

            $("#myModal").modal('toggle');


            return false;
        }

    };



      this.checkIfQuizDone2 = function (question) {
        console.log('CHECK IF QUIZ DONE');

//        var instruction = $(question).find('.question-instructions');
//        $(instruction).addClass('question-instructions-done');

        var quiz = $(question).closest('.cite-quiz');
        var questions = $(quiz).find('.cite-question');
        var numDone = 0;

        $.each($(questions), function (index, value) {
            if ($(value).data('done')) {
                numDone++;
            }
        });

//        console.log('*********');
//        console.log('NUMDONE: '+numDone);
//        console.log('QUESTION LENGTH: '+$(questions).length);

        if (numDone == $(questions).length) {
            console.log('all done!');

            $(quiz).find('.quiz-instructions').addClass('quiz-instructions-done');
            $(quiz).find('.btn-quiz-restart').fadeIn();
            $(quiz).find('.btn-quiz-validation').hide();

        } else {
            console.log('not all done!');
            var decrement = $(quiz).data('data-number-try') - 1;
            $(quiz).data('data-number-try', decrement);

            var numberLeft = $(quiz).data('data-number-try');
            console.log('number-try-left: ' + numberLeft);

            if (!numberLeft) {
                console.log('no chance left');

                $(quiz).find('.btn-quiz-show-answers').fadeIn();
            }
        }
    };




    this.checkIfQuizDone = function (question) {
        console.log('CHECK IF QUIZ DONE');


//        var instruction = $(question).find('.question-instructions');
//        $(instruction).addClass('question-instructions-done');
//
//        var quiz = $(question).closest('.cite-quiz');
//        var questions = $(quiz).find('.cite-question');
//        var numDone = 0;
//
//        $.each($(questions), function (index, value) {
//            if ($(value).data('done')) {
//                numDone++;
//            }
//        });
//
//
//        console.log('*********');
//        console.log('NUMDONE: '+numDone);
//        console.log('QUESTION LENGTH: '+$(questions).length);
//
//        if (numDone == $(questions).length) {
//            console.log('all done!');
//
//
//            $(quiz).find('.quiz-instructions').addClass('quiz-instructions-done');
//            $(quiz).find('.btn-quiz-restart').fadeIn();
//            $(quiz).find('.btn-quiz-validation').hide();
//
//        } else {
//            console.log('not all done!');
//            var decrement = $(quiz).data('data-number-try') - 1;
//            $(quiz).data('data-number-try', decrement);
//
//            var numberLeft = $(quiz).data('data-number-try');
//            console.log('number-try-left: ' + numberLeft);
//
//            if (!numberLeft) {
//                console.log('no chance left');
//
//                $(quiz).find('.btn-quiz-show-answers').fadeIn();
//            }
//
//        }
    };





    this.validateAnswers = function (question, type) {
        console.log('IN VALIDATION');

        switch (type) {
        case 'choix-reponse':
            api.choixReponse.validation(question)
            break;
        case 'choix-multiple':
            api.choixMultiple.validation(question);
            break;
        case 'dropdown':
            api.dropdown.validation(question);
            break;
        case 'reorder-item':
            api.reorder.validation(question);
            break;
        case 'dragdrop-column':
            api.dragDrop3.validation(question);
            break;
        case 'toggle':
            $(question).find('.question-instructions').addClass('question-instructions-done');
            api.toggle.validation(question);
            break;
        case 'dragdrop-validation-end':
            api.dragDrop2.validation(question);
            break;

        case 'dragdrop-texte-trous':
            api.dragDrop4.validation(question);
            break;

        }
    };

    this.restart = function (question, type) {
        switch (type) {
        case 'choix-reponse':
            api.choixReponse.restart(question);

            var quiz = $(question).closest('.cite-quiz');
            var length = $(quiz).find('.cite-question').length;
            if (length == 1) {
                var instructions = $(quiz).find('.quiz-instructions');
                $(instructions).removeClass('question-not-answered');
            }

            break;
        case 'choix-multiple':
            api.choixMultiple.restart(question);
            break;
        case 'dropdown':
            api.dropdown.restart(question);
            break;
        case 'reorder-item':
            api.reorder.restart(question);
            break;
        case 'dragdrop-column':
            api.dragDrop3.restart(question);
            break;
        case 'toggle':
            api.toggle.restart(question);
            break;
        case 'dragdrop-validation-end':
            api.dragDrop2.restart(question);
            break;

        case 'dragdrop-texte-trous':
            api.dragDrop4.restart(question);
            break;
        }
    };

    this.showAnswers = function (question, type) {
        switch (type) {
            case 'choix-reponse':
                api.choixReponse.showAnswer(question);
                break;
            case 'choix-multiple':
                api.choixMultiple.showAnswer(question);
                break;
            case 'dropdown':
                api.dropdown.showAnswer(question);
                break;
            case 'reorder-item':
                api.reorder.showAnswer(question);
                break;
            case 'dragdrop-column':
                api.dragDrop3.showAnswer(question);
                break;
            case 'toggle':
                api.toggle.showAnswer(question);
                break;
            case 'dragdrop-validation-end':
                api.dragDrop2.showAnswer(question);
                break;
            case 'dragdrop-texte-trous':
                api.dragDrop4.showAnswer(question);
                break;
        }
    };

     this.applyRandomPosition = function(question, type){
        switch (type) {
            case 'choix-reponse':
                api.choixReponse.putInRandomPosition(question);
                break;
            case 'choix-multiple':
                api.choixMultiple.putInRandomPosition(question);
                break;
            case 'dropdown':
                api.dropdown.putInRandomPosition(question);
                break;
            case 'dragdrop-column':
                api.dragDrop3.putInRandomPosition(question);
                break;
            case 'toggle':
                api.toggle.putInRandomPosition(question);
                break;
            case 'dragdrop-validation-end':
                api.dragDrop2.putInRandomPosition(question);
                break;
            case 'dragdrop-texte-trous':
                api.dragDrop4.putInRandomPosition(question);
                break;
        }
    }

     this.onDone_question = function(question){
        var fnstring = $(question).attr('onDone');
        var fnparams = $(question).attr('onDoneParams');
        var _fnparams = Array(fnparams);

        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, _fnparams);
    }


}
