/**
 * Created by cedriclalonde on 15-12-06.
 */

function Progressions(){
    var that = this;
    api.progressions = this;

    this.init = function(){
        $('.theProgressions .closeButton').on(browser, that.closeIt);
        $('#pop2').on(browser, that.openIt);

        $('#btn-lexique').on(browser, that.openLexique);
        $('#btn-examen').on(browser, that.openExam);
    };

    this.unlockExam = function(){
        $('#courseTitle').css({
            fontSize: '17px'
        });

        $('#btn-examen').fadeIn();
        $('.exam-message').show();
    };

    this.openExam = function(e){
        //console.log('open exam');
        //window.open("/d2l/common/dialogs/quickLink/quickLink.d2l?ou=136002&amp;type=quiz&amp;rcode=LCc-783309", '_blank');
        ///d2l/common/dialogs/quickLink/quickLink.d2l?ou=136002&amp;type=quiz&amp;rcode=LCc-783309
    };

    this.openIt = function(e){
        $('.menu-tooltip-popup').hide();
        $('.theProgressions').fadeToggle();

        $('.customPopover').removeClass('nav-btn-active');
        $('#btn-progression').addClass('nav-btn-active');
    };

    this.closeIt = function(e){
        //$('.menu-tooltip-popup').hide();
        //var root = $(e.target).closest(".theProgressions");
        $('.theProgressions').fadeToggle();
        $('.customPopover').removeClass('nav-btn-active');
    };

    this.show = function(){
        $('.theProgressions').fadeToggle();
        $('.theProgressions .closeButton').hide();


        setTimeout(function(){
            $('.theProgressions').fadeToggle();
            setTimeout(function(){
                $('.theProgressions .closeButton').show();
            }, 1000);
        }, 2500);
    };

    this.openLexique = function(e){
        console.log('open lexique');
        $('#myModal_1').modal('show');
        $('.modal-title').html('Lexique');
        $('.modal-body').html($('.lexique').html());
    };


    this.adjustScore = function(root){
        var allQuestions = $('.cite-radio-quiz');
        var pointage = 0;
        var total = 0;

        $.each($('.cite-radio-quiz'), function(index, value){
            var questPointage = parseInt($(value).attr('data-pointage'));
            total += questPointage;

            if($(value).attr('done') == 'true'){

                pointage += questPointage;
            }
        });

        $('.theScore').html(pointage+" / "+total);
    };

}
