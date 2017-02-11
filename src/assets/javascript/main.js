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

try {
  headerParallax();
} catch (e) {
  console.error(e);
}
