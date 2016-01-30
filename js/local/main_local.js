/**
 * Created by cedriclalonde on 2015-08-12.
 */



$(function(){

   createMenu();

   function createMenu(){
       $('<div/>', { id: 'menu' }).appendTo('body');

       //var nPages = 10;

       for(i=1; i<=nPages; i++){
           var newNum;
           if(i<nPages && i<10){
               newNum = '0'+i
           } else{
               newNum = i
           }

           var obj = $('<div/>', { id: 'myLinks'+newNum, class: "myLinks", text: 'Pages_'+newNum }).appendTo('#menu');

           $(obj).data({
               num: newNum
           });
       }

       $('.myLinks').on('click', openInFrame);
       $('#myLinks01').css('backgroundColor', '#DCDCDC');
   }

   function openInFrame(e){
       var num = $(e.target).data('num');

       $('.myLinks').css('backgroundColor', 'white');
       $(e.target).css('backgroundColor', '#DCDCDC');

       $('#displayPagesFrame').attr('src', 'page_'+num+'.html');
   }


});
