$(document).ready(function() {
  const ogAmenities = {};

  function vacantRoom () {
    const apiURL = `http://localhost:5001/api/v1/status/`;
    $.get(apiURL, function (data, textStatus) {
      if (textStatus === 'success' && data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  }

  function checkAmenities () {
    // Listen for checkbox input changes
    $('input[type="checkbox"]').change(function () {
    // Retrieve amenityID and amenityName from the checkbox 'ID' attribute
      const amenityID = $(this).data('id');
      const amenityName = $(this).data('name');
    // If checked:
      if (this.checked) {
    // Attach amenityID to its corresponding name
        ogAmenities[amenityID] = amenityName;
      } else {
        delete ogAmenities[amenityID]; // Remove ID from object
      }
    // Add amenityNames that are stored in dict into single string
      const updatedAmenities = Object.values(ogAmenities).join(', ');
    // Updates all h4 elements associated with amenities
      $('.amenities h4').text(updatedAmenities);
    });
  }
  
  function displaySearch(data) {
    $('.places').empty();
    for (const place of data) {
      $('section.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i></br>
            ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
            </br>
            ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
            ${place.number_bathrooms} Bathrooms
          </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
      }
    }

  function searchAmenities() {
    // Attach click event listener to search button
    $('#search').click(function() {
      const amenitiesList = Object.keys(ogAmenities);
      // Make POST request to places_search with list of checked amenities
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: amenitiesList }),
        success: function(data) {
          displaySearch(data);
        }
      });
    });
  }

  function placesData() {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({}),
      success: function (data) {
        displaySearch(data);
      }
    });
  }

  vacantRoom();
  checkAmenities();
  placesData();
  searchAmenities();
});
