import '../sass/main.scss';
import 'jquery';
import 'slick-carousel';

import 'bootstrap';

import { WOW } from 'wowjs';
import mixitup from 'mixitup';

// [webpack require this to implemet wow js]
export default {
  init() {
    // JavaScript to be fired on all pages
    const wow = new WOW();
    wow.init();
  }
};
//main function
$(function() {
  new WOW().init();
  // the spinner loader will fade out after the window is fully loaded
  $(window).on('load', function() {
    $('.main-loader').fadeOut(500);
  });

  //slick js configuration
  $('.header__slider').slick({
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    fade: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false
  });
  $('.testi__wrapper').slick({
    dots: true,

    speed: 300,

    slidesToShow: 1
  });
  // init mixitup
  try {
    var mixer = mixitup('.works-wrapper');
  } catch {
    console.log('fail');
  }

  // auto placement active class between filter-btn elements
  $('.filter-btn').on('click', function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
});
