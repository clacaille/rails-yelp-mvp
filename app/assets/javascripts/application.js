// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .
$(document).ready(function() {
    var address = $("#address").html();
    console.log(address);
    var myUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;
    console.log(myUrl);
    $.ajax({
      type: "GET",
      url: myUrl,
      success: function(data) {
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        $("#geoloc").empty().append("<h2>" + latitude + "</h2>");
        $("#geoloc").append("<h2>" + longitude + "</h2>");
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: latitude, lng: longitude },
          zoom: 14
        });
        var marker = new google.maps.Marker({
          map: map,
          position: { lat: latitude, lng: longitude }
        });
      },
      error: function(jqXHR) {
        console.log("ERROR");
        console.error(jqXHR.responseText);
      }
    });

});
