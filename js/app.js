function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7599, lng: -122.4148},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function getData(){

  // Variable that saves the value of the selected crime type radio button
  var category = document.querySelector('input[name="category"]:checked').value
  console.log(category)

  // Variable that saves the value of the selected day of the week radio button
  var dayOfWeek = document.querySelector('input[name="dayOfWeek"]:checked').value
  console.log(dayOfWeek)


  // AJAX call which passes dayOfWeek and category variables into query
  $.ajax({
  	   	url: "https://data.sfgov.org/resource/gxxq-x39z.json?pddistrict=MISSION&dayofweek=" + dayOfWeek + "&$order=date DESC&$where=date>'2017-01-01T12:00:00'&category=" + category,
  	   	dataType: "json",
  	   	success: function(data) {

        // Return data to see what properties are available for display
        console.log(data)

        // Create new instance of the map to drop markers
      	var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.7599, lng: -122.4148},
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Loop through data array of objects and drop marker for each
        for(i = 0; i < data.length; i++) {

          var myLatLng = {lat: parseFloat(data[i].location.latitude), lng: parseFloat(data[i].location.longitude)};

          console.log(myLatLng);

          var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: data[i].descript
          });
        }
  	  }
    })
  }

//What if we wanted a different neighborhood? 
//A user-picked day of the week?
//Better styling?
//Conver to Angular?
//Convert to React?