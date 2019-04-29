import "../sass/main.scss";
import "jquery";
import "slick-carousel";
import "bootstrap";

import { WOW } from "wowjs";
import mixitup from "mixitup";
// init wow js [webpack require that]
export default {
  init() {
    // JavaScript to be fired on all pages
    const wow = new WOW();

    wow.init();
  }
};
$(function() {
  new WOW().init();
  $(".header__slider").slick({
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    fade: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false
  });
  $(".testi__wrapper").slick({
    dots: true,

    speed: 300,

    slidesToShow: 1
  });
  $(window).on("load", function() {
    $(".main-loader").fadeOut(500);
  });

  // //init mixitup js
  var mixer = mixitup(".works-wrapper");

  // //shifter
  $(".filter-btn").on("click", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
