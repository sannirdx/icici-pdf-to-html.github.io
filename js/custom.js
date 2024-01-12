$(document).ready(function(){
    collectMapSvg();
    var cn = 0;
    var win = $(this);
    $('.ham-icon').click(function(){
        if(cn == 0){
            var st = "hidden";
            cn = 1;
            $('#header').addClass('bluebg');
            $('.cross-btn2').show();
        }else{
            var st = "unset";
            cn = 0;
            $('#header').removeClass('bluebg');
            $('.cross-btn2').hide();
        }
        $("body").css("overflow", st);
        $(".my-sidenav1").slideToggle("slow");
    });
    $(".my-sidenav").accordion();
});


$('.ham-icon1').click(function(){
  $('.my-sidenav').css('max-width', '380px');
});

$('.cross-btn1').click(function(){
  $('.my-sidenav').css('max-width', '0px');
}); 

$(window).on("scroll", function() {

  // Sticky nev Effect
  if($(this).scrollTop() > 50) {
     $('#header').addClass("sticky"); 
 } 
 else {
     $('#header').removeClass("sticky");
 } 
});



$('.panel-collapse').on('shown.bs.collapse', function (e) {
 var $panel = $(this).closest('.panel');
 $('html,body').animate({
   scrollTop: $panel.offset().top-80
}, 500); 
});


     /*
 * Replace all SVG images with inline SVG
 */
function collectMapSvg() {
    $('img.mapsvg').each(function(){
  //$('.'+cls).css({ fill: "#ff0000" });
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

  });
}

