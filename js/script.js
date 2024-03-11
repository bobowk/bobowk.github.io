$(window).on("load", function() {
  if ($(window).width() > 850) {
      function fade(pageLoad) {
          var windowTop = $(window).scrollTop(), windowBottom = windowTop + $(window).innerHeight();
          var min = -0.8, max = 1, threshold = 0.02;

          $(".fade").each(function() {
              /* Check the location of each desired element */
              var objectHeight = $(this).outerHeight(), objectTop = $(this).offset().top, objectBottom = $(this).offset().top + objectHeight;

              /* Fade element in/out based on its visible percentage */
              if (objectTop < windowTop) {
                  if (objectBottom > windowTop) { $(this).fadeTo(0, min + ((max - min) * ((objectBottom - windowTop) / objectHeight))); }
                  else if ($(this).css("opacity") >= min + threshold || pageLoad) { $(this).fadeTo(0, min); }
              } else if (objectBottom > windowBottom) {
                  if (objectTop < windowBottom) { $(this).fadeTo(0, min + ((max - min) * ((windowBottom - objectTop) / objectHeight))); }
                  else if ($(this).css("opacity") >= min + threshold || pageLoad) { $(this).fadeTo(0, min); }
              } else if ($(this).css("opacity") <= max - threshold || pageLoad) { $(this).fadeTo(0, max); }
          });
      }
      fade(true); //fade elements on page-load
      $(window).scroll(function() { fade(false); }); //fade elements on scroll
  }
});
var items = $(".panel");
var animating = false;

$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    if (!animating) {
        $.data(this, 'scrollTimer', setTimeout(function() {
          var count = 0;
          items.each(function(key, value) {
            /** Adjust the 200 value to make scroll larger than 200px before and after the top of the item **/
           /** You can even make the value dynamic depending on screen by getting the viewport height and apply a percentage to it. ie: $( window ).height() * .8 ; **/
            if (($(window).scrollTop() > ($(value).offset().top - $( window ).height() * .5 )
            && ($(window).scrollTop() - $(value).offset().top) < $( window ).height() * .5 )
            || ($(window).scrollTop() > ($(value).offset().top + $( window ).height() * .5 )
            && ($(window).scrollTop() - $(value).offset().top) < $( window ).height() * .5 )) {
              animating = true;
              $('html, body').animate( { scrollTop: $(value).offset().top }, 50);
              setTimeout(function() { animating = false; }, 50);
              return false;
            }
          });
        }, 50));
    }
});
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.getElementById("start-container").style.setProperty('--vh', `${vh}px`);

  $(document).ready(function($){
    var sectionPosition = [];
    $('.section').each(function() {
      sectionPosition.push($(this).offset().top);
    });
  
    $('a').click(function(){
      $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
    });
  
    $('#nav ul li a').click(function () {
      $('#nav ul li a').removeClass('active');
      $(this).addClass('active');
    }); 
  
    $(document).scroll(function(){
      var position = $(document).scrollTop(),
          index; 
      for (var i=0; i<sectionPosition.length; i++) {
        if (position <= sectionPosition[i]) {
          index = i;
          break;
        }
      }
      $('#nav ul li a').removeClass('active');
      $('#nav ul li a:eq('+index+')').addClass('active');
    });
  
    $('#nav ul li a').click(function () {
      $('#nav ul li a').removeClass('active');
      $(this).addClass('active');
    });   
  });

  $(document).ready(function(){ 
    function _slider(id){
        var slidewidth = $('.slider ul li').width();
        var slideheight = $('.slider ul li').outerHeight();

        $('.slider').css({'height':slideheight,'width':slidewidth});
        $('.slider ul li:not(.active)').css({'left':slidewidth});
  if($('.slider ul li:nth-child(1)').hasClass('active')){
    $('.slider ul li:last-child').css({left: - slidewidth}, -200).prependTo('.slider ul');
  }
        function moveright(){
            var slideheight = $('.slider ul li.active').next().height();
            var slidewidth = $('.slider ul li.active').next().width();
            $('.slider').animate({height:slideheight,width:slidewidth},200);
            
            if ($('.slider ul li:nth-last-child(2)').hasClass('active')) {
                 $('.slider ul li:first-child').css({left: slidewidth}, -200).appendTo('.slider ul');
                 $('.slider ul li.active').css({left: -slidewidth}, -200).removeClass('active').next().addClass('active').css({left: 0}, -200);
            } else {
                $('.slider ul li.active').css({left: -slidewidth}, -200).removeClass('active').next().addClass('active').css({left: 0}, -200);
            }
        }
        function moveleft(){
            var slideheight = $('.slider ul li.active').prev().height();
            var slidewidth = $('.slider ul li.active').prev().width();
            $('.slider').animate({height:slideheight,width:slidewidth},200);


            if ($('.slider ul li:nth-child(2)').hasClass('active')) {
                 $('.slider ul li:last-child').css({left: - slidewidth}, -200).prependTo('.slider ul');
                 $('.slider ul li.active').removeClass('active').css({left: slidewidth}, -200).prev().addClass('active').css({left: 0}, -200);
            } else {
                $('.slider ul li.active').removeClass('active').css({left: slidewidth}, -200).prev().addClass('active').css({left: 0}, -200);
            }	
        } 

        $('.control_next').on('click', function(){ 
            moveright();
        });
        $('.control_prev').on('click', function(){ 
            moveleft();
        });
    } 
    _slider('slider_');
});	    


    