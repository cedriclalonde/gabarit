/**
 * Created by cedriclalonde on 15-12-06.
 */

function Badges(){
    var that = this;
    api.badges = this;


    this.init = function(){
        $('.theBadges').addClass('rounded-corners');
        //$('.theBadges').addClass('addShadow');

        $('.theBadges .closeButton').on(browser, that.closeIt);
        $('#pop1').off().on(browser, that.openIt);

        //that.activateQuestionnaire(3);
        //that.activateQuestionnaire(1);
        //
        //that.activateVideo(0);
        //that.activateVideo(2);

        $('.videoBadge').on(browser, that.openVideoPage);
    };

    this.openVideoPage = function(e){
        var page = $(e.currentTarget).attr('data-open-page');
        api.navigation.goTo(parseInt(page));

        var index = $(e.currentTarget).index();
        console.log(index);

        $(window.top.document).find('body').scrollTo('#video'+(index-1));
        $('.theBadges').fadeToggle('slow');

        $('.customPopover').removeClass('nav-btn-active');
        $('.navBarSecond').show();
    };

    this.openIt = function(e){
        $('.menu-tooltip-popup').hide();
        $('.theBadges').fadeToggle('slow');
        $('.customPopover').removeClass('nav-btn-active');
        $('#btn-ecussons').addClass('nav-btn-active');
    };

    this.closeIt = function(e){
        //$('.menu-tooltip-popup').hide();
        $('.theBadges').fadeToggle('slow');
        $('.customPopover').removeClass('nav-btn-active');
    };

    this.activateQuestionnaire = function(num){
        console.log('THIS IS THE NUM: '+num);

        var questionnaire = $('page-questionnaire').get(num);
        var title = $(questionnaire).find('h1');
        $(title).css({
            color: "green",
            fontWeight: "bolder"
        });

        var actBadge = $('.activityBadge').get(num);

        var opacity = $(actBadge).css('opacity');
        console.log(opacity);
        if(opacity == 1){
            console.log('already done!');
        } else{
            console.log('in else');
            $(actBadge).css({opacity: 1});
            //$(actBadge).append('<i class="fa fa-check-square theCheck"></i>');
        }
    };

    this.activateVideo = function(num){
        var actBadge = $('.videoBadge img').get(num);

        var opacity = $(actBadge).css('opacity');
        console.log(opacity);
        if(opacity == 1){
            console.log('already done!');
        } else{
            $(actBadge).css({opacity: 1});
        }
    };

    this.show = function(index){
        $('.theBadges').fadeToggle();
        $('.theBadges .closeButton').hide();


        setTimeout(function(){
            api.badges.activateQuestionnaire(parseInt(index));
        }, 500);

        setTimeout(function(){
            $('.theBadges').fadeToggle();


            if(index == $('.questionnaire-page').length-1){
                console.log('YES IT IS THE LAST QUESTIONNAIRE!!')
                //var currentNavMax = api.navigation.getMaxScreen();
                //currentNavMax+=1;
                //api.navigation.setMaxScreen(currentNavMax);
            } else{
                //api.navigation.gotoNextScreen({preventDefault: function(){}});
            }



            setTimeout(function(){
                $('.theBadges .closeButton').show();
            }, 1000);
        }, 2500);
    }

};
