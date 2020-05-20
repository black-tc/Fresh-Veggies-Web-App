// $('nav li').data('clicked', false);

// var mq = window.matchMedia("(min-width: 700px)");
// if (mq.matches) { // only if screen is larger than @768px
//     $(window).scroll(function () { //on scroll change navbar background color and nav links colors
//         let scroll = $(window).scrollTop();
//         let sections = $('section');
//         let sectionsArray = Array.from(sections);
//         let id;

//         for (let i = 0; i < sectionsArray.length; i++) {
//             id = sectionsArray[i].id;
//             /**
//              * when reach top offset of about section
//              * change navbar background to dark
//              * else change navbar background to transparent
//              */
//             if (scroll > ($(`#${sectionsArray[1].id}`).offset().top) - 50) {
//                 $('nav').css('backgroundColor', '#000');
//             } else {
//                 $('nav').css('backgroundColor', 'transparent');
//             }



//             /**
//              * when reach top offset of any section
//              * if scroll exceeded it
//              * add active class to the nav link corrosponding to that section
//              * and remove the same class from its siblings
//              */
//             if (scroll > ($(`#${id}`).offset().top) - 250) {

//                 if ($('nav li').data('clicked') == false) { // ensure that this scroll not driven by clicking a nav item
//                     $(`nav a[href='#${id}']`).parent().addClass('active');
//                     $(`nav a[href='#${id}']`).parent().siblings().removeClass('active');
//                 }
//             }

//         }
//     });
// } else { // hide the collapsable nav menu on clicking any nav item because its mobile mode now
//     $('nav li').click(function () {
//         $('.navbar-collapse').collapse('hide');
//     });
// }


$(window).on('load', function() {
  setTimeout(function(){
    $('#subscribeModal').modal('show');
  }, 5000);
  setTimeout(function(){
    $('.subscribeModal-lg').modal('show');
  }, 10000);
});
$('#Reloadpage').click(function() {
   location.reload();
});
