$(window).on("load", function() {
  function fade(pageLoad) {
      var windowHeight = $(window).innerHeight();
      var windowTop = $(window).scrollTop(), windowBottom = windowTop + windowHeight;
      var min = -0.8, max = 1, threshold = 0.02;

      $(".fade").each(function() {
          /* Check the location of each desired element */
          var objectHeight = $(this).outerHeight(), objectTop = $(this).offset().top, objectBottom = objectTop + objectHeight;
          var objectCenter = objectTop + objectHeight / 2; // Calculate object's vertical center
          var viewportCenter = windowTop + windowHeight / 2; // Calculate the vertical center of the viewport
          var fadeStart = viewportCenter - objectHeight / 2; // Start fading when object's center aligns with the center of the viewport

          /* Fade element in/out based on its visible percentage */
          if (objectCenter > windowTop && objectCenter < windowBottom) { // Object's center is within the viewport
              $(this).fadeTo(0, max);
          } else if (objectBottom < windowTop || objectTop > windowBottom) { // Object is completely outside the viewport
              $(this).fadeTo(0, min);
          } else { // Object is partially in the viewport
              var distanceToTop = Math.abs(objectTop - windowTop);
              var distanceToBottom = Math.abs(objectBottom - windowBottom);
              var fadeValue = 1 - (distanceToTop < distanceToBottom ? distanceToTop : distanceToBottom) / (windowHeight / 2);
              fadeValue = fadeValue < 0 ? 0 : fadeValue; // Ensure fade value doesn't go negative
              $(this).fadeTo(0, fadeValue);
          }
      });
  }

  fade(true); // Fade elements on page-load
  $(window).scroll(function() { fade(false); }); // Fade elements on scroll
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


    