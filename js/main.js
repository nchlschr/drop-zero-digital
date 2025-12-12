$stateMobile = jQuery(window).width() < 768;
$stateTablet = jQuery(window).width() >= 768 && jQuery(window).width() < 1025;
$stateDesktop = jQuery(window).width() >= 1025;
$stateLargeDesktop = jQuery(window).width() >= 2020;
$stateNotphone = jQuery(window).width() >= 768;
$stateNotdesktop = jQuery(window).width() < 1025;



jQuery(document).ready(function ($) {
  cursorfollow();
  scrollLink();
  rellax();
  activeonScroll();
  countup();
  problemsolving();
  videoPlayClick();
  milestones();
  owlcarousel();
  phoneButtonScroll();
  });
jQuery('.scroll-down').on('click', function(e) {
    
});

function cursorfollow(){
  $(function () {
    const $f = $('.cursor-follow');
    const maxOffset = 50; // px in each direction

    $(document).on('mousemove', function (e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      // normalized from -1 to 1 based on distance from center
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;

      const offsetX = nx * maxOffset;
      const offsetY = ny * maxOffset;

      // move the INNER div only
      $f.css('transform', `translate(${offsetX}px, ${offsetY}px)`);
    });
  });
}

function scrollLink() {
  var $ = jQuery;

  $(document).on('click', '.scroll-link', function (e) {
    e.preventDefault();

    var targetTop = $(window).scrollTop() + $(window).height(); // current scroll + 100vh

    $('html, body')
      .stop(true)
      .animate(
        { scrollTop: targetTop },
        600,          // duration
        'swing'       // easing
      );
  });
}
function rellax(){
  var rellax = new Rellax('.rellax', {
    center:true
  }); 
}
function owlcarousel(){
  jQuery('.owl-carousel').owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      autoplay: false
    });
}
function phoneButtonScroll() {
  var $ = jQuery;

  $('.homepage-problemsolving-container .phone-only').on('click', function (e) {
    e.preventDefault();

    // container of this button
    var $container = $(this).closest('.homepage-problemsolving-container');
    // the answer inside that container (or just $('.answer').first() if global)
    var $target    = $container.find('.answer');

    if (!$target.length) return;

    // top position of .answer
    var elementTop = $target.offset().top;
    // we want it to end 100px from top
    var targetTop  = elementTop - 100;

    // native smooth scroll (no jQuery effects needed)
    $('html, body')
      .stop(true)
      .animate(
        { scrollTop: targetTop },
        600,          // duration
        'swing'       // easing
      );
  });
}


jQuery(function () {
  phoneButtonScroll();
});


jQuery(function () {
  phoneButtonScroll();
});

function videoPlayClick() {
  var $ = jQuery;

  $('.video-play').on('click', function () {
    var $overlay   = $(this);
    var $container = $overlay.closest('.homepage-video-container');
    var video      = $container.find('video').get(0);

    if (!video) return;

    // restart from beginning
    video.currentTime = 0;

    // show native controls
    video.controls = true;

    // unmute + play
    video.muted = false;
    video.play().catch(function () {
      // autoplay might fail if browser blocks it
    });

    // add class to parent .homepage-block
    var $block = $container.closest('.homepage-block');
    $block.addClass('video-active');

    // find the video container we want to center
    var $videoContainer = $block.find('.video-container').first();
    if ($videoContainer.length) {
      var elementTop    = $videoContainer.offset().top;
      var elementHeight = $videoContainer.outerHeight();
      var viewportH     = $(window).height();

      // scroll so the element's center matches viewport center
      var targetScrollTop = elementTop - (viewportH / 2) + (elementHeight / 2);

      $('html, body').animate(
        { scrollTop: targetScrollTop },
        600 // duration in ms
      );
    }

    // optional: hide overlay once clicked
    $overlay.addClass('is-hidden');
  });
}

jQuery(function () {
  videoPlayClick();
});


jQuery(function () {
  videoPlayClick();
});

function activeonScroll() {
  var $ = jQuery;

  function checkBlocksInView() {
    var windowHeight = window.innerHeight;

    $('.homepage-block').each(function () {
      var $block = $(this);
      var rect = this.getBoundingClientRect();

      var isNowInView = rect.top <= windowHeight * 0.8 && rect.bottom >= 0;
      var wasInView   = $block.data('was-in-view') === true;

      if (isNowInView) {
        $block.addClass('in-view');

        // If this block contains the .count-up element and just entered view → animate
        if (!wasInView && $block.find('.count-up').length) {
          countup(); // only animates the single .count-up
        }

        $block.data('was-in-view', true);
      } else {
        $block.removeClass('in-view');
        $block.data('was-in-view', false);
      }
    });
  }

  // Run on scroll, resize, and initial load
  $(window).on('scroll resize', checkBlocksInView);
  checkBlocksInView();
}
function problemsolving(){
  jQuery(".homepage-problemsolving-container .button").on('click', function () {
    
    const $btn = jQuery(this);
    const $block = $btn.closest('.homepage-block');

    // Toggle "answered" class on parent block
    const isAnswered = $block.toggleClass("answered").hasClass("answered");

    // Change HTML/text based on state
    if (isAnswered) {
      $btn.html("Problem solved! :)");  // or whatever text you want
    } else {
      $btn.html("How did we solve this?");  // back to original text
    }
  });
}
function countup() {
  var $ = jQuery;
  var $el = $('.count-up'); // single counter element

  if (!$el.length) return; // nothing to do

  var start    = parseInt($el.data('start'))  || 10;
  var target   = parseInt($el.data('target')) || 0;
  var duration = 1500; // ms

  // reset and stop any previous animation
  $el.stop(true, true).text(start);

  $({ value: start }).animate({ value: target }, {
    duration: duration,
    easing: 'swing',
    step: function () {
      $el.text(Math.floor(this.value));
    },
    complete: function () {
      $el.text(target);
    }
  });
}

function milestones(){

  jQuery(function($) {
    const $items = $('.milestone');

    $(window).on('scroll', function() {

      if($stateDesktop){
      $items.each(function(index) {
        const $current = $(this);
        const $next = $items.eq(index + 1);

        if ($next.length) {
          const currentRect = $current[0].getBoundingClientRect();
          const nextRect = $next[0].getBoundingClientRect();
          const offset = nextRect.top;

          const fadeStart = 0; // start fading when next hits top
          const fadeEnd = currentRect.height; // end fading when next is one full height away

          // Fade only when the next item is within the range
          if (offset >= fadeStart && offset <= fadeEnd) {
            const fadeAmount = (offset - fadeStart) / (fadeEnd - fadeStart);
            $current.find(".milestone-info").css('opacity', fadeAmount);
          } else if (offset < fadeStart) {
            $current.find(".milestone-info").css('opacity', 0);
          } else {
            $current.find(".milestone-info").css('opacity', 1);
          }
        }
      });
    }
    });

    // Trigger once on load
    $(window).trigger('scroll');
  });
}
