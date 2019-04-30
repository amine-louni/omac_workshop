import "../sass/main.scss";
import "jquery";
import "slick-carousel";

import "bootstrap";

import { WOW } from "wowjs";
import mixitup from "mixitup";

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
  $(window).on("load", function() {
    $(".main-loader").fadeOut(500);
  });

  //slick js configuration
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

  // init mixitup
  var mixer = mixitup(".works-wrapper");

  // auto placement active class between filter-btn elements
  $(".filter-btn").on("click", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  //nice scroll
  $("body").niceScroll({
    cursorcolor: "#2286b5", // change cursor color in hex
    cursoropacitymin: 0.3, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
    cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
    cursorwidth: "5px", // cursor width in pixel (you can also write "5px")
    cursorborder: "none", // css definition for cursor border
    cursorborderradius: "3px", // border radius in pixel for cursor
    zindex: "auto" | [number] // change z-index for scrollbar div
  });
});
