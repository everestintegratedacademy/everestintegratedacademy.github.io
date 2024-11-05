"use strict";
jQuery(window).on("load", function() {
    /* COUNTER */
    // onclick=""
    try {
      var _statistics = jQuery('#counter');
      _statistics.appear(function () {
          var _statistics = jQuery('.counter__stats li h4 span');
          _statistics.countTo({
              formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
              }
          });
      });
    } catch (err) {}
});