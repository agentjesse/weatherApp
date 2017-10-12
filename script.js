var switchDeg = false;
// document.getElementById('weatherHold').style.visibility = 'hidden';


//starting call
window.addEventListener('DOMContentLoaded', init);





function init(){
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

}

//function that gets and sets weather info from API
function getWeather(lat,lon){
  //updated to use old xhr method, maybe fix ios problem
  const xhr = new XMLHttpRequest();
  const url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon;
  xhr.responseType='json';
  xhr.onreadystatechange = function(){
    if (xhr.readyState === XMLHttpRequest.DONE){
      //console.log(xhr.response);
      if (switchDeg){
        $('#weatherContent').html('It\'s ' +Math.round(xhr.response.main.temp*1.8+32)+ ' degrees fahrenheit');
        // $('#weatherHold').css({'background-color':'red'});
        // document.getElementById('weatherHold').style.backgroundColor = 'red';
      } else {
        $('#weatherContent').html('It\'s ' +Math.round(xhr.response.main.temp)+ ' degrees celsius');
      }
      //image
      $('#imageHold').css({'background':"no-repeat center/100% url(" + xhr.response.weather[0].icon + ")"});
    }
  };
  xhr.open('GET',url);
  xhr.send();

  //original ajax request fails ios 10.2
  // $.ajax({
  //   //settings
  //   // url: 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139',
  //   url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon,
  //   type: 'GET',
  //   dataType: 'json',
  //   //if request is successful then:
  //   success(response){
  //     if (switchDeg){
  //       $('#weatherContent').html('It\'s ' +Math.round(response.main.temp*1.8+32)+ ' degrees fahrenheit');
  //       // $('#weatherHold').css({'background-color':'red'});
  //       // document.getElementById('weatherHold').style.backgroundColor = 'red';
  //     } else {
  //       $('#weatherContent').html('It\'s ' +Math.round(response.main.temp)+ ' degrees celsius');
  //     }
  //     //currenty working on here
  //     $('#imageHold').css({'background':"no-repeat center/100% url(" + response.weather[0].icon + ")"});
  //   },
  //   //if the request failed, then:
  //   error(jqXHR,status,errorThrown){
  //     console.log( jqXHR );
  //   }
  //
  // });
};
