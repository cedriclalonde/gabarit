/**
 * Created by cedriclalonde on 15-12-02.
 */

function Popover(){
    var that = this;


    this.init = function(){
        $('.btn-popover').addClass('rounded-corners');

        $('.btn-popover, .popover-background-image').off().on(browser, function(){
            $('.btn-popover').popover('hide');
        });

        that.initPopovers();

    };

    this.initPopovers = function(){
        $.each($('.btn-popover'), function(index, value){
            //var id = $(value).attr('id');
            var pop = $(value).find('.popover');

            $(value).popover({
                title: $(pop).attr('data-title'),
                placement: 'right',
                html: true,
                content: $(pop).html()
            });
        });
    }
}
