var switchDeg = false;
// document.getElementById('weatherHold').style.visibility = 'hidden';


//call on page load finish
$(document).ready(function(){
  //get current position from navigator object, follow documentation to use it.
  navigator.geolocation.getCurrentPosition(function(position) {
    //call getWeather function and pass it the coordinates
    getWeather(Math.round(position.coords.latitude), Math.round(position.coords.longitude));
  });

  $('#degreesBtn').on('click', function() {

    //switch state of boolean?
    switchDeg = !switchDeg;
    navigator.geolocation.getCurrentPosition(function(position) {
      //call getWeather function and pass it the coordinates
      getWeather(Math.round(position.coords.latitude), Math.round(position.coords.longitude));
    });

  });

});

//function that gets and sets weather info from API
function getWeather(lat,lon){
  //ajax request
  $.ajax({
    //settings
    // url: 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139',
    url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon,
    type: 'GET',
    dataType: 'json',
    //if request is successful then:
    success(response){
      if (switchDeg){
        $('#weatherContent').html('It\'s ' +Math.round(response.main.temp*1.8+32)+ ' degrees fahrenheit');
        // $('#weatherHold').css({'background-color':'red'});
        // document.getElementById('weatherHold').style.backgroundColor = 'red';
      } else {
        $('#weatherContent').html('It\'s ' +Math.round(response.main.temp)+ ' degrees celsius');
      }
      //currenty working on here
      $('#imageHold').css({'background':"no-repeat center/100% url(" + response.weather[0].icon + ")"});
    },
    //if the request failed, then:
    error(jqXHR,status,errorThrown){
      console.log( jqXHR );
    }

  });
};
