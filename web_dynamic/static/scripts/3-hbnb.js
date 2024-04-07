function placesData () {
  $.ajax({
    url: `http://0.0.0.0:5001/api/v1/places_search/`,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of Object.values(data)) {
        $('section.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
            </br>
            ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            <I class="fa fa-bed fa-3x" aria-hidden="true"></i>
            </br>
            ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            <I class="fa fa-bath fa-3x" aria-hidden="true"></i>
            </br>
            ${place.number_bathrooms} Bathrooms
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`);
      }
    }
  });
}

function vacantRoom () {
    const apiURL = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(apiURL, function (data, textStatus) {
      if (textStatus === 'success' && data.status === 'OK') {
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
  placesData();
});