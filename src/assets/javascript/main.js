'use strict';

function headerParallax() {
  if ($(window).width() < 1024) {
    return;
  }

  const $background = $('.hero.section .background');

  $(window).scroll(event => {
    const scroll = $(document).scrollTop();

    if (scroll > $background.height()) {
      return;
    }

    const y = scroll / 2;
    $background.css('transform', `translate3D(0, ${y}px, 0)`);
  });
}

function smoothScroll() {
  $('a[href*="#"]:not([href="#"])').click(function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        let offset = target.offset().top;

        if (target.hasClass('extremely padded')) {
          offset += 80;
        } else if (target.hasClass('extra padded')) {
          offset += 20;
        } else if (target.hasClass('history section')) {
          offset += 50;
        } else if (!target.hasClass('padded')) {
          offset -= 50;
        }

        if (offset < 0) {
          offset = 0;
        }

        $('html, body').animate({
          scrollTop: offset
        }, 350);

        e.preventDefault();
      }
    }
  });
}

$(document).ready(() => {
  headerParallax();
  smoothScroll();
});
