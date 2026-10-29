/* Online booking: Dental Intel (Modento) scheduling widget, opened from the site's own Book buttons.
   The widget's floating blue button is hidden; every link to /book/ or /es/book/ opens the scheduler in its modal. */
(function () {
  var FALLBACK = 'https://book.modento.io/c/88c4c0ab4f394d04abe9612c37eb7cdf/Dawson-Dentistry?from_widget=bb1237c3271d4b01b8f33dd185329b64';

  // Widget code as supplied by the practice.
  if (!document.getElementById('diWidgetScript')) {
    var diScript = document.createElement('script');
    diScript.setAttribute('crossorigin', 'anonymous');
    diScript.setAttribute('src', 'https://front-end-assets.azureedge.net/scripts/osWidget.js');
    diScript.setAttribute('defer', 'true');
    diScript.setAttribute('id', 'diWidgetScript');
    // The widget starts itself from window.onload; if the page already finished loading, start it now.
    diScript.addEventListener('load', function () {
      if (document.readyState === 'complete' && !window.diOsWidget && typeof window.onload === 'function') window.onload();
    });
    document.body.appendChild(diScript);
  }
  if (!window.osWidgetsArr) {
    window.osWidgetsArr = [];
  }
  window.osWidgetsArr.push({
    apiUrl: 'https://api.modento.io/api/v1/online-schedule-widgets/bb1237c3271d4b01b8f33dd185329b64'
  });

  var st = document.createElement('style');
  st.textContent = '.di-os-booking-wg .di-os-booking-wg__button{display:none!important}';
  document.head.appendChild(st);

  function bookingHref() {
    try { return window.diOsWidget.osWidgets[0].configuration.cta_button.href || FALLBACK; } catch (e) { return FALLBACK; }
  }
  function openBooking() {
    if (!window.diOsWidget || !document.getElementById('os-widget-iframe')) return false;
    window.diOsWidget.openWidgetInModal(bookingHref());
    return true;
  }
  window.dawsonOpenBooking = openBooking;

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href="/book/"],a[href="/es/book/"],a[data-book]');
    if (a && openBooking()) e.preventDefault();
  });
})();
