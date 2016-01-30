/**
 * Created by cedriclalonde on 15-12-02.
 */

function ReorderItem() {
    var that = this;
    api.reorder = this;
    var root;
    var randomArray;

    this.setRoot = function (newVal) {
        root = newVal;
    };
    this.getRoot = function () {
        return root;
    };

    this.setRandomArray = function (newVal) {
        randomArray = $.randomArray(newVal);
    };
    this.getRandomArray = function () {
        return randomArray;
    };


    this.init = function () {
        $.each($('.sortable'), function (index, value) {
            $(value).sortable({
                tolerance: "pointer",
                stop: function (e) {
                    that.setRoot($(e.target).parent().parent());
                },
                create: function (e) {
                    var question = $(e.target).closest('.cite-question');
                    that.setRoot($(e.target).parent().parent());
                    that.assignData();
                    that.putIndesorder(question);
                },
                cancel: ".disabled",
                stop: function (e) {
                    that.setRoot($(e.target).parent().parent());
                    var sortable = $(that.getRoot()).find('.sortable');
                    $(sortable).sortable("refreshPositions");

                    var items = $(that.getRoot()).find('.sortable li');
                    for (i = 0; i < items.length; i++) {
                        var item = $(items).get(i);
                        console.log($(item).find('span').attr('id'));
                        $(item).find('.rt').html(' ' + (i + 1) + ". ");
                    };
                }
            });
        });

        $('.reoder-items-verifier').off().on(browser, that.reorderItemsVerifierPressed);
        $('.reorderItems-restart').off().on(browser, that.restartPressed);
        //        $('.reorderItems-restart').hide();
    };

    this.assignData = function () {
        var root = that.getRoot();
        var item = $(root).find('.sortable li');

        $.each($(item), function (index, value) {
            $(value).data('answer', index);

        });

        for (i = 0; i <= $(item).length - 1; i++) {
            var _item = $(item).get(i);
            $(_item).addClass('goodOrder' + i);
        }
    };

    this.validation = function (question) {
        //        var root = $(e.target).parent().parent();
        var item = $(question).find('.sortable li');
        var nGood = 0;

        //        that.customOnDone(root);

        $.each($(item), function (index, value) {
            var answer = $(value).data('answer');

            if (answer == index) {
                nGood++;
                //console.log('bonne reponse');
                $(value).css('color', 'green');

                if (nGood == $(item).length) {
                    $(item).addClass('disabled');
                    $(root).find('.retroaction').fadeIn();

                    var instruction = $(question).find('.question-instructions');
                    $(instruction).addClass('question-instructions-done');

                    var retroaction = $(question).find('.retroaction');
                    $(retroaction).fadeIn();

                    $(question).data('done', true);
                }
            } else {
                //console.log('mauvaise reponse');
                $(value).css('color', 'red');
            }
        });

        api.quiz.checkIfQuizDone(question);
        api.quiz.onDone_question(question);

//        setTimeout(function () {}, 1000);
    };


    this.checkIfAnswered = function (question) {
        console.log('checkIfAnswered');
        return true;
    };

    this.putIndesorder = function (question) {
        //        console.log(that.getRoot());

        var sortable = $(question).find('.sortable');
        var items = $(question).find('.sortable li');
        console.log(items.length);

        randomArray = [];
        var randomArray = $.randomArray($(items).length);
        console.log(randomArray.length);

        for (i = 0; i < randomArray.length; i++) {

            var item = $(items).get(randomArray[i]);
            $(item).appendTo(sortable);
            $(item).find('.rt').html(' ' + (i + 1) + ". ").show();

        };

        //        console.log('THE LENGTH: ' + $(sortable).length);

    };

    this.restart = function (question) {
        that.putIndesorder(question);

        var items = $(question).find('.sortable li');
        $(items).css('color', 'black');
        $(items).removeClass('disabled');

        var retro = $(question).find('.retroaction');
        $(retro).hide();

        $(question).data('done', false);
    };


    this.reorderItemsVerifierPressed = function (e) {
        var root = $(e.target).parent().parent();
        var item = $(root).find('.sortable li');
        var nGood = 0;

        $.each($(item), function (index, value) {
            var answer = $(value).data('answer');

            if (answer == index) {
                nGood++;
                //console.log('bonne reponse');
                $(value).css('color', 'green');

                if (nGood == $(item).length) {
                    $(item).addClass('disabled');
                    $(root).find('.retroaction').fadeIn();

                    //                    api.onDoneEvent.onDone(root);
                    $(e.target).hide();
                }
            } else {
                //console.log('mauvaise reponse');
                $(value).css('color', 'red');
            }
        });

        setTimeout(function () {}, 1000);
    };

    this.restartPressed = function (e) {
        var root = $(e.target).parent().parent();
        that.setRoot(root);

        that.putIndesorder();

        var items = $(that.getRoot()).find('.sortable li');
        $(items).css('color', 'black');
        $(items).removeClass('disabled');

        var retro = $(that.getRoot()).find('.retroaction');
        $(retro).hide();
    };

    this.showAnswer = function (root) {
        var sortable = $(root).find('.sortable');
        var items = $(root).find('.sortable li');

        for (i = 0; i <= $(items).length - 1; i++) {
            var item = $(sortable).find('.goodOrder' + i);
            $(item).appendTo(sortable);
            $(item).css('color', 'green');
            $(item).addClass('disabled');
        };

        $(root).find('.retroaction').show();
        $(root).find('.reoder-items-verifier').hide();
        $(root).find('.rt').hide();

        //$(sortable).sortable("refreshPositions");
        //var items = $(that.getRoot()).find('.sortable li');
        //
        //for(i=0; i<items.length; i++){
        //    var item = $(items).get(i);
        //    $(item).find('.rt').hide();

        //console.log($(item).find('span').attr('id'));
        //$(item).find('.rt').html(' '+(i+1)+". ");
        //};
    };

};
