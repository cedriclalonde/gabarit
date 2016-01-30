/**
 * Created by cedriclalonde on 15-12-02.
 */

function Navigation(){
    var that = this;
    api.navigation = this;

    var currentScreen = 0;
    var maxScreen = 13;

    this.getCurrentScreen = function(){ return currentScreen; };
    this.setCurrentScreen = function(newVal){
        currentScreen = newVal;
    };

    this.getMaxScreen = function(){ return maxScreen; };
    this.setMaxScreen = function(newVal){
        maxScreen = newVal;
    }

    this.init = function(){
        that.setCurrentScreen(currentScreen);
        var firstPage = $('.content').get(that.getCurrentScreen());
        $(firstPage).fadeIn();

        $('.nextBtn').off().on(browser, that.gotoNextScreen);
        $('.prevBtn').off().on(browser, that.gotoPrevScreen);

        //$('.module-menu').hide();

        that.checkIfNavigationGood();

        $('.last-questionnaire-menu-btn').on(browser, that.lastQuestionnaireMenuBtn);
    };

    this.lastQuestionnaireMenuBtn = function(e){
        $('.nextBtn').removeClass('disabled');
    };

    this.goTo = function(num){
        $('.content').hide();
        that.setCurrentScreen(parseInt(num));
        var page = $('.content').get(that.getCurrentScreen());
        $(page).fadeIn();

        $('.nextBtn').off().on(browser, that.gotoNextScreen);
        $('.prevBtn').off().on(browser, that.gotoPrevScreen);

        $('.navBtnPage').find('a').removeClass('menu-current-item');

        var navBtn = $('.navBtnPage').get(parseInt(num)-2);
        $(navBtn).find('a').addClass('menu-current-item');

        if(that.getCurrentScreen() == 2){
            //console.log('page: '+page);
            $('.nextBtn').removeClass('disabled');
            $('.prevBtn').addClass('disabled');
        } else if(that.getCurrentScreen() == 31){
            $('.nextBtn').addClass('disabled');
            $('.prevBtn').removeClass('disabled');
        } else{
            $('.nextBtn').removeClass('disabled');
            $('.prevBtn').removeClass('disabled');
        }

        api.onStart.saveCurrentPage(num);
    };

    this.checkIfNavigationGood = function(){
        //console.log('.navBtnPage length: '+$('.navBtnPage').length);
        //console.log('.content length: '+);

        if($('.navBtnPage').length === Number($('.content').length -2)){
            console.log('NAVIGATION WITH MENU OK!');
        }
    };

    this.incrementPage = function(num){
        var current = that.getCurrentScreen();
        //console.log('increment: '+current);
        //console.log('increment num: '+num);

        var result = parseInt(current) + parseInt(num);
        console.log("THE RESULT!!!!!! : "+ result);

        if(result == 33){ result = 32; }
        current = result;

        //current += num;
        //parseInt(current) += parseInt(num);
        that.setCurrentScreen(current);

        //console.log('current***: '+current);

        var page = $('.content').get(that.getCurrentScreen());
        $(page).fadeIn();
        //console.log('index: '+$(page).index());

        api.onStart.saveCurrentPage(that.getCurrentScreen());
        console.log('page saved: '+that.getCurrentScreen());
    };

    this.decrementPage = function(num){
        var current = that.getCurrentScreen();
        //console.log('decrement: '+current);
        var result = parseInt(current) - parseInt(num);
        current = result;
        that.setCurrentScreen(current);

        var page = $('.content').get(that.getCurrentScreen());
        $(page).fadeIn();

        api.onStart.saveCurrentPage(that.getCurrentScreen());
    };


    this.checkIfQuestionnaireDone = function(page, increment){
        var questionnaire = $(page).hasClass('questionnaire-page');
        //console.log('cest un questionnaire: '+questionnaire);
        console.log('QUESTIONNAIRE ***: '+questionnaire);

        if(questionnaire){
            var questionnaireDone = $(page).data('done');
            //console.log('questionnaireDone: '+questionnaireDone);
            //console.log("id:  "+$(page).attr('id'));
            //console.log('QUESTIONNAIRE DONE***: '+questionnaireDone);
            if(questionnaireDone){
                console.log('questionnaire done!');

                if(increment){
                    //var page = $('.content').get(that.getCurrentScreen());
                    that.incrementPage(1);
                } else{
                    that.decrementPage(1);
                }
            } else{
                console.log('questionnaire not done!');
                console.log(increment);

                if(increment){
                    //console.log('increment 2');

                    that.incrementPage(2);
                } else{
                    that.decrementPage(2);
                }
            }
        }else {
            if(increment){
                //var page = $('.content').get(that.getCurrentScreen());
                that.incrementPage(1);
            } else{
                that.decrementPage(1);
            }
        }
    };


    this.gotoNextScreen = function(e){
        $('.content').hide();
        window.top.scrollTo(0,0);

        var _current = that.getCurrentScreen();
        //console.log('_current in gotonext: '+_current);

        that.checkIfQuestionnaireDone($('.content').get(parseInt(that.getCurrentScreen())+1), true);

        var currentTab = that.getCurrentScreen()-2;
        $('.navBtnPage a').removeClass('menu-current-item');
        var currentPage = $('.navBtnPage').find('a').get(currentTab);
        $(currentPage).addClass('menu-current-item');

        var min = 1;
        //var max = 30;

        if(that.getCurrentScreen() > that.getMaxScreen()){
            $('.nextBtn').addClass('disabled');

            //$('.nextBtn').off(browser);
            that.setCurrentScreen(api.main.getnPages());
        } else if(that.getCurrentScreen() > min){
            $('.prevBtn').removeClass('disabled');
            $('.prevBtn').off().on(browser, that.gotoPrevScreen);
        };

        if(that.getCurrentScreen() == 3){
            $('#googleMap').css({ left: '138px' });
        }else{
            $('#googleMap').css({ left: '-1000px' });
        }


        //if(that.getCurrentScreen() == 1 || that.getCurrentScreen() == 0){
        //    $('.navBarSecond').hide();
        //} else{
        //    $('.navBarSecond').show();
        //}
    };

    this.disabledIt = function(e){
        e.preventDefault();
    }

    this.gotoPrevScreen = function(e){
        e.preventDefault();
        $('.content').hide();
        window.top.scrollTo(0,0);

        that.checkIfQuestionnaireDone($('.content').get(that.getCurrentScreen()-1), false);


        var currentTab = that.getCurrentScreen()-2;
        $('.navBtnPage a').removeClass('menu-current-item');
        var currentPage = $('.navBtnPage').find('a').get(currentTab);
        $(currentPage).addClass('menu-current-item');

        var min = 1;
        var max = 32;

        if(that.getCurrentScreen() == 3){
            $('#googleMap').css({ left: '138px' });
        }else{
            $('#googleMap').css({ left: '-1000px' });
        }


        if(that.getCurrentScreen() == min){
            //console.log('+ petit que 0');

            that.setCurrentScreen(min);
            $('.prevBtn').addClass('disabled');
            //$('.prevBtn').off(browser);

        } else if(that.getCurrentScreen() <= max){
            $('.nextBtn').removeClass('disabled');
            $('.nextBtn').off().on(browser, that.gotoNextScreen);
        }
    };


};
