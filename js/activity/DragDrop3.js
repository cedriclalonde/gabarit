/**
 * Created by cedriclalonde on 16-01-22.
 */


function DragDrop3(){
    var that = this;
    api.dragDrop3 = this;

    this.init = function(){
        $('.stackDrop').addClass('rounded-corners');
        $('._choiceContainer').addClass('rounded-corners');
        $('.dragdrop3 .drag-item').addClass('addShadow');

        var draggable = $('.dragDrop3').find('.drag-item');

        $(draggable).draggable({
            revert: 'invalid',
            cancel: '.off',
            start: function(e, ui){
                var container = $(ui.helper).parent();
                var question = $(ui.helper).closest('.cite-quiz');
                var stackDrops = $(question).find('.stackDrop');

                $(stackDrops).css({ zIndex: 10 });
                $(container).css({ zIndex: 100 });
                $(question).find('._choiceContainer').css({ zIndex: 500 });
            }
        });

         $(".stackDrop").droppable({
            tolerance: "intersect",
            accept: ".drag-item",
            drop: function(e, ui) {
                $(e.target).append($(ui.draggable));
                $(ui.helper).css({ left: "0px", top: "0px", border: '1px solid' });

                var question = $(e.target).closest('.cite-question');
                that.checkIfAllElementsPlaced(question);

                var answer_column_number = $(e.target).attr('data-column');
                console.log(answer_column_number);

                $(ui.helper).data('user-answer', answer_column_number);
            }
        });
    };

    this.putInRandomPosition = function(question){
        var radios = $(question).find('.drag-item');
        var theForm = $(question).find('._choiceContainer');

        $.each(radios, function(index, input){
            randomArray = [];
            var randomArray = $.randomArray($(radios).length);

            for (i = 0; i < randomArray.length; i++) {
                var radio = $(radios).get(randomArray[i]);
                $(radio).appendTo(theForm);
            };
        });
    };

    this.validation = function(question){
        if(that.checkIfAllElementsPlaced(question) == 0){
            var dragItems = $(question).find('.drag-item');
            $.each($(dragItems), function(index, dragItem){
                var userAnswer = $(dragItem).data('user-answer');
                var answer = $(dragItem).attr('data-answer-column');

                if(userAnswer == answer){
                    console.log('bonne reponse');
                    $(dragItem).addClass('dragdrop3-good');
                    $(dragItem).addClass('off');
                } else{
                    console.log('bad answer');
                    $(dragItem).addClass('dragdrop3-bad');

                    var choiceContainer = $(question).find('._choiceContainer');

                    setTimeout(function(){
                        $(dragItem).appendTo(choiceContainer);
                        $(dragItem).removeClass('dragdrop3-bad');
                    }, 1500);
                }
            });

            setTimeout(function(){
                 that.checkIfAllGood(question);
            }, 2000);

        } else{
            console.log('not placed');
        }
    };

    this.checkIfAnswered = function(question){
        var choiceContainer = $(question).find('._choiceContainer .drag-item');
        var length = $(choiceContainer).length;

        if(length === 0){
            return true;
        } else{
            return false;
        }
    };

    this.restart = function(question){
        console.log('restart column');
        var dragItems = $(question).find('.drag-item');
        console.log(dragItems);

        $(dragItems).removeClass('off');
        $(dragItems).removeClass('dragdrop3-good');
        $(dragItems).removeClass('dragdrop3-bad');

        var choiceContainer = $(question).find('._choiceContainer');
        $.each($(dragItems), function(index, dragItem){
            $(dragItem).appendTo(choiceContainer);
        });

        var instruction = $(question).find('.question-instructions');
        $(instruction).removeClass('question-instructions-done');

        $(question).find('.retroaction').hide();
        $(question).data('done', false);
    };

    this.showAnswer = function(question){
        var dragItems = $(question).find('.drag-item');
        var stackDrops = $(question).find('.stackDrop');

        $.each($(stackDrops), function(index, stackDrop){
            var index_increment = index+1;
            var good_col = $(question).find('[data-answer-column="'+index_increment+'"]');
            var col = $(question).find('[data-column="'+index_increment+'"]');

            $(good_col).appendTo($(col));
            $(good_col).addClass('off');
            $(good_col).addClass('dragdrop3-good');
        });
    };

    this.checkIfAllElementsPlaced = function(question){
        var choiceContainer = $(question).find('._choiceContainer .drag-item');
        var length = $(choiceContainer).length;
        return length;
    };

    this.checkIfAllGood = function(question){
        if(that.checkIfAllElementsPlaced(question) == 0){
            $(question).find('.retroaction').fadeIn();

            var instruction = $(question).find('.question-instructions');
            $(instruction).addClass('question-instructions-done');

            $(question).data('done', true);

        } else{
//            console.log('reste des repsonses a trouver.')
        }

        api.quiz.checkIfQuizDone(question);
        api.quiz.onDone_question(question);
    };


};
