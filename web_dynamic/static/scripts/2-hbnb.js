function vacantRoom () {
    const apiURL = 'http://0.0.0.0:5001/api/v1/status/';
    $.getJSON(apiURL, (data) => {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  }

$('document').ready(function () {
  const amenities = {};
  $('input[type="checkbox]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('id')] = $(this).attr('name');
    } else {
      delete amenities[$(this).attr('id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  vacantRoom();
});