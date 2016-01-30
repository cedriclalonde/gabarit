/**
 * Created by cedriclalonde on 15-11-23.
 */

var ua = navigator.userAgent;
browser = (ua.match(/ipad/i)) ? "touchstart" : "click";


function Main() {
    var that = this;
    api.main = this;


    this.init = function () {
//        $('a').on(browser, function (e) {
            //            e.preventDefault();
            //            return true;
            //        });
        $('[data-toggle="tooltip"]').tooltip();

        $('.image img').addClass('rounded-corners');

        var quiz = new Quiz();
        quiz.init();

        var video = new Video();
        video.init();

        var progression = new Progressions();
        progression.init();

        var navigation = new Navigation();
        navigation.init();

        var choixReponse = new ChoixReponse();
        choixReponse.init();

        var choixMultiple = new ChoixMultiple();
        choixMultiple.init();

        var reorderItem = new ReorderItem();
        reorderItem.init();

        var toggle = new Toggle();
        toggle.init();

        var popover = new Popover();
        popover.init();

        var dragDrop1 = new DragDrop1();
        dragDrop1.init();

        var dragDrop2 = new DragDrop2();
        dragDrop2.init();

        var dragDrop3 = new DragDrop3();
        dragDrop3.init();

        var dragDrop4 = new DragDrop4();
        dragDrop4.init();

        var dropdown = new Dropdown();
        dropdown.init();

        var badges = new Badges();
        badges.init();

        //        var imageMultipleChoice = new ImageMultipleChoice();
        //        imageMultipleChoice.init();

        //new OnDoneEventStart();

        //var onStart = new OnStart();
        //onStart.init();

        api.quiz.applyRandomPositionAllQuestions();


    };

    this.triggerApi = function () {
        $('.toggle-trigger-btn').off().on(browser, function (e) {
            var content_id = $(e.target).attr('data-toggle-content-id');
            console.log('content_id: ' + content_id);
            $("#" + content_id).toggle('blind', {}, 500);
        });
    };


};



$(function () {
    api = {
        onStart: undefined,
        main: undefined,
        badges: undefined,
        progressions: undefined,
        navigation: undefined,
        choixReponse: undefined,
        choixMultiple: undefined,
        reorder: undefined,
        onDoneEvent: undefined,
        onDoneEventStart: undefined,
        dropdown: undefined,
        toggle: undefined,
        dragDrop1: undefined,
        dragDrop2: undefined,
        dragDrop3: undefined,
        dragDrop4: undefined,
        video: undefined,
        quiz: undefined
    };

    var main = new Main();
    main.init();
});


(function ($) {
    $.randomArray = function (number) {
        var temp = [];
        var myArray = [];

        for (var i = 0; i < number; i++) {
            temp.push(i);
        }
        while (temp.length > 0) {
            var r = Math.floor(Math.random() * temp.length);
            myArray.push(temp[r]);
            temp.splice(r, 1);
        }
        return myArray;
    };
})(jQuery);


$.fn.scrollTo = function (target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) {
        callback = options;
        options = target;
    }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function () {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({
            scrollTop: scrollY
        }, parseInt(settings.duration), settings.easing, function () {
            if (typeof callback == 'function') {
                callback.call(this);
            }
        });
    });
};
