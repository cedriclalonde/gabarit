/**
 * Created by cedriclalonde on 15-12-02.
 */


function DragDrop2() {
    var that = this;
    api.dragDrop2 = this;
    var numGoodAnswer;
    var numTry;

    var dragItem = '.dragDrop2 .drag-item';
    var dragTarget = '.dragDrop2 .drag-target';



    this.getNumGoodAnswer = function () {
        return numGoodAnswer;
    };
    this.setNumGoodAnswer = function (newVal) {
        numGoodAnswer = newVal;
    };

    this.getNumTry = function () {
        return numTry;
    };
    this.setNumTry = function (newVal) {
        numTry = newVal;
    };


    this.getNumberGoodToGet = function (helper) {
        var root = $(helper).closest('.cite-question');
        var thumb = $(root).find('.thumbnail');
        console.log('len: ' + $(thumb).length);

        var num = 0;

        $.each($(thumb), function (index, value) {
            if ($(value).attr('data-answer') === 'good') {
                num++;
            }
        });

        return num;
    };



    this.init = function () {
        $(dragTarget).draggable();

        $(dragTarget).addClass('rounded-corners');
        $(dragItem).addClass('rounded-corners');

        $(dragItem).draggable({
            revert: 'invalid',
            cancel: '.off',
            start: function (e, ui) {
                var root = $(ui.helper).closest('.cite-question');
                var item = $(root).find('.drag-item');
                var target = $(root).find('.drag-target');

                $(item).css({
                    zIndex: 10
                });
                $(target).css({
                    zIndex: 10
                });

                $(ui.helper).css({
                    zIndex: 99
                });

                var parent = $(ui.helper).parent();
                $(parent).css({
                    zIndex: 99
                });

            }
        });

        $(dragTarget).droppable({
            accept: dragItem,
            drop: function (e, ui) {
                var root = $(ui.helper).closest('.cite-question');
                var answer = $(ui.helper).attr('data-answer');
                var total = $(root).attr('data-total-good-answer');

                var targetNum = parseInt($(e.target).attr('data-target'));
                var itemAnswer = parseInt($(ui.helper).attr('data-target'));

                var itemInTarget = $(e.target).find('.drag-item');


                if ($(e.target).find('.drag-item').length !== 0) {
                    console.log('il y a un item');

                    if ($(itemInTarget).css('backgroundColor') === 'rgb(0, 128, 0)') {
                        console.log(itemInTarget);

                        $(ui.helper).draggable("option", "revert", true);
                    } else {
                        $(itemInTarget).css({
                            position: 'relative',
                            color: 'black',
                            backgroundColor: 'white',
                            margin: '5px',
                            //                            display: 'none'
                        });

                        var choiceContainer = $(root).find('.choiceContainer');

                        $(itemInTarget).fadeIn();
                        $(itemInTarget).appendTo(choiceContainer);

                        $(ui.helper).appendTo($(e.target));
                        $(ui.helper).css({
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            margin: '-2px'
                        });
                    }


                } else {
                    console.log('il na pas ditem');

                    if ($(itemInTarget).css('backgroundColor') === 'rgb(0, 128, 0)') {
                        console.log(itemInTarget);

                        $(ui.helper).draggable("option", "revert", true);
                    } else {
                        $(ui.helper).appendTo($(e.target));
                        $(ui.helper).css({
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            margin: '-2px'
                        });
                    }
                }


                var itemsLeft = $(root).find('.choiceContainer .drag-item');
                //                    console.log(itemsLeft.length);

                if (itemsLeft.length == 0) {

                    console.log('all done');

                    //                        $(root).find('.dragDrop1-restart').fadeIn();
                    $(root).find('.btn-checkAnswer').fadeIn();
                    $(root).find('.btn-checkAnswer').removeClass('disabled');
                    $('.btn-checkAnswer').off().on(browser, that.checkAnswer);
                    var done = $(root).attr('done');



                    if (done !== 'true') {

                        console.log('not done');

//                         api.quiz.checkIfQuizDone(root);
//                         api.onDoneEvent.onDone(root);
                    } else {
                        console.log('already done!');

                    }
                }
            }
        });
    };

     this.putInRandomPosition = function(question){
        var radios = $(question).find('.drag-item');
        var theForm = $(question).find('.choiceContainer');

        $.each(radios, function(index, input){
            randomArray = [];
            var randomArray = $.randomArray($(radios).length);

            for (i = 0; i < randomArray.length; i++) {
                var radio = $(radios).get(randomArray[i]);
                $(radio).appendTo(theForm);
            };
        });
    };

    this.checkIfAnswered = function (question) {
        var choiceContainer = $(question).find('.choiceContainer .drag-item');
        var length = $(choiceContainer).length;

        console.log('dragdrop2 length: ' + length);

        if (length === 0) {
            console.log('oui');
            return true;
        } else {
            console.log('non');
            return false;
        }
    };

    this.validation = function (question) {
        var targets = $(question).find('.drag-target');
        var choiceContainer = $(question).find('.choiceContainer');

        $.each(targets, function (index, target) {
            var item = $(target).find('.drag-item');

            var target_dataTarget = $(target).attr('data-target');
            var item_dataTarget = $(item).attr('data-target');

            if (target_dataTarget === item_dataTarget) {
                console.log('good answer!');

                $(item).addClass('dragdrop2-good');
                $(item).addClass('off');

            } else {
                console.log('bad answer!');
                $(item).addClass('dragdrop2-bad');

                setTimeout(function () {
                    $(item).removeClass('off');
                    $(item).css({
                        position: 'relative',
                        color: 'black',
                        backgroundColor: 'white !important',
                        margin: '5px',
                        cursor: 'pointer'
                    });

                    $(item).removeClass('dragdrop2-bad');

                    $(choiceContainer).append(item);
                }, 1000);
            };
        });

        setTimeout(function(){
            var itemsLeft = $(question).find('.choiceContainer .drag-item');
            console.log("NOMBRES ITEMS RESTANT DANS LA ZONE: "+itemsLeft.length);

            if (itemsLeft.length == 0) {
                console.log('QUESTION DONE!');
                $(question).data('done', true);
            } else {
                console.log('not done');
            }

            api.quiz.checkIfQuizDone(question);
            api.quiz.onDone_question(question);
        }, 1500);
    };


    this.checkAnswer = function (e) {
        $(e.target).addClass('disabled');
        $('.btn-checkAnswer').off(browser, that.checkAnswer);

        var root = $(e.target).closest('.cite-question');
        var targets = $(root).find('.drag-target');
        var choiceContainer = $(root).find('.choiceContainer');

        $.each(targets, function (index, value) {
            var item = $(value).find('.drag-item');

            var target_dataTarget = $(value).attr('data-target');
            var item_dataTarget = $(item).attr('data-target');

            if (target_dataTarget === item_dataTarget) {
                console.log('good answer!');

                $(item).css({
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    margin: '0px',
                    color: 'white',
                    backgroundColor: 'green',
                    cursor: 'default'
                });
                $(item).addClass('off');

            } else {
                console.log('bad answer!');
                $(item).removeClass('off');
                $(item).css({
                    position: 'relative',
                    color: 'black',
                    backgroundColor: 'white',
                    margin: '5px',
                    cursor: 'pointer'
                });

                $(choiceContainer).append(item);
            };
        });


        var itemsLeft = $(root).find('.choiceContainer .item');
        //        console.log(itemsLeft.length);

        if (itemsLeft.length == 0) {
            console.log('all done!!!');
            $(e.target).hide();
            $(root).find('.dragDrop1-restart').fadeIn();
        } else {
            var numTry = that.getNumTry();
            that.setNumTry(numTry - 1);

            var tryText = $(root).find('.tryText');
            $(tryText).html("Nombre d'essais restants: " + that.getNumTry());

            console.log(that.getNumTry());
            if (that.getNumTry() == 0) {
                console.log('terminer il faut montrer les reponses');

                that.showAnswer(root);
                $(e.target).hide();

                that.customOnDone(root);

            } else {
                console.log('continuer');
            }

        }



    };

    this.customOnDone = function (root) {
        console.log('customOnDone');

        //*******
        //CUSTOM ON DONE
        var fnstring = $(root).attr('onDone');
        var fnparams = $(root).attr('onDoneParams');
        var _fnparams = Array(fnparams);

        var fn = window[fnstring];

        if (typeof fn === "function") fn.apply(null, _fnparams);
    };


    this.showAnswer = function (question) {
        console.log('in showAnswer');

        var items = $(question).find('.drag-item');
        var targets = $(question).find('.drag-target');

        $.each(items, function (index, item) {
            var item_dataTarget = $(item).attr('data-target');

            $.each(targets, function (_index, target) {
                var target_dataTarget = $(target).attr('data-target');

                if (item_dataTarget === target_dataTarget) {
                    $(target).append(item);
                    $(item).css({
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        margin: '-2px',
                        color: 'white',
                        backgroundColor: 'green',
                        cursor: 'default'
                    });
                    $(item).addClass('off');
                }
            });
        });

        $(question).find('.dragDrop1-restart').fadeIn();
    };

    that.restart = function (question) {
        console.log('restart');


        var targets = $(question).find('.drag-target');
        var choiceContainer = $(question).find('.choiceContainer');

        $.each(targets, function (index, target) {
            var item = $(target).find('.drag-item');
            $(item).removeClass('off');
            $(item).removeClass('dragdrop2-good');

            $(item).css({
                position: 'relative',
                color: 'black',
                backgroundColor: 'white',
                margin: '5px',
                cursor: 'pointer'
            });

            $(choiceContainer).append(item);
        });

        $(question).data('done', false);

    };
};
