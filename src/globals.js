import React from 'react';
import $ from 'jquery';

window.React = React;

// Bootstrap sometimes do not hide backdrop when modals/offcanvas are hiding programmatically
window.backdropFix = function () {
  $('body').css('overflow', 'auto');
  $('.modal-backdrop').remove();
}