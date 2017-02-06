'use strict';

/**
 * Basic image crossfader
 */
class CrossFade {
  constructor(element) {
    this.$element = $(element);
    this.$slides = this.$element.children('div, p, img');
    this.$currentSlide = null;
    this.interval = null;

    this.fadeSpeed = this.$element.data('fadespeed');
    this.fadeSpeed = (this.fadeSpeed !== undefined) ? this.fadeSpeed : 1000;

    this.nextSpeed = this.$element.data('nextspeed');
    this.nextSpeed = (this.nextSpeed !== undefined) ? this.nextSpeed : 4000;

    this.fixedHeight = !!this.$element.data('fixed-height');

    this.pauseOnHover = this.$element.data('pause') == 'onHover';

    if (!this.$slides.length) {
      return;
    }

    this.$currentSlide = $(this.$slides[0]);
    this.$currentSlide.fadeIn(this.fadeSpeed);
    this.$element.css({opacity: 1});

    this.calculateHeight();
    this.bind();

    if (this.$slides.length > 1) {
      this.startTimer();
    }
  }

  /**
   * Resize the tweet height when the window is resized
   */
  bind() {
    $(window).resize(this.calculateHeight.bind(this));

    this.$element.find('img, iframe')
      .on('load', this.calculateHeight.bind(this));

    if (this.$slides.length > 1 && this.pauseOnHover) {
      this.$element
        .mouseenter(this.stopTimer.bind(this))
        .mouseleave(this.startTimer.bind(this));
    }
  }

  /**
   * Set the height of the twitter module to the height of the largest tweet.
   * Using height of largest rather than setting per-tweet for performance, and so there's
   * no juddering on the sidebar and/or on mobile.
   */
  calculateHeight() {
    if (this.fixedHeight) {
      return;
    }

    const maxHeight = this.$slides.toArray().reduce((max, element) => {
      const $image = $(element);
      const previousCss = $image.attr("style");

      $image.css({
        opacity: 0,
        display: 'block'
      });

      const height = $image.outerHeight();

      $image.attr("style", previousCss ? previousCss : "");

      return (height > max) ? height : max;
    }, 0);

    // there are no `p` tags on a twitget error, so don't set the height
    if (maxHeight) {
      this.$element.height(maxHeight);
    }
  }

  /**
   * Start the interval timer
   */
  startTimer() {
    this.stopTimer();

    if (this.$slides.length <= 1) {
      return;
    }

    this.$slides.not(this.$currentSlide).hide();
    this.$currentSlide.show();

    this.interval = setInterval(() => {
      const next = (this.$currentSlide.index() + 1) % this.$slides.length;
      const $nextSlide = $(this.$slides[next]);
      this.$currentSlide.fadeOut(this.fadeSpeed);
      this.$currentSlide = $nextSlide.fadeIn(this.fadeSpeed);
    }, this.nextSpeed);
  }

  /**
   * Stop the next transition and clear the timer
   */
  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }
}

$(document).ready(() => {
  $('.crossfade').each((index, element) => {
    return new CrossFade(element);
  });
});
