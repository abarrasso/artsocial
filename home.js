
    
    var apikey = "ukOiSJ4btyGOtiXrgU1WzROaKMALf6ha";
    var googlekey = "AIzaSyCXAEZ5K05R2KgnoZO7o7CxfR_-X9FuGsU";
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            var x = document.getElementById("location");
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        var x = document.getElementById("location");
        x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        
        var latlon = position.coords.latitude + "," + position.coords.longitude;

        $.ajax({
          type:"GET",
          url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&latlong="+latlon,
          async:true,
          dataType: "json",
          success: function(json) {
                      console.log(json);
                      var e = document.getElementById("events");
                      e.innerHTML = json.page.totalElements + " events found.";
                      showEvents(json);
                      initMap(position, json);
                   },
          error: function(xhr, status, err) {
                      console.log(err);
                   }
        });
        
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }
    
    
    function showEvents(json) {
      for(var i=0; i<json.page.size; i++) {
        $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
      }
    }

    
    function initMap(position, json) {
      var mapDiv = document.getElementById('map');
      var map = new google.maps.Map(mapDiv, {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 10
      });
      for(var i=0; i<json.page.size; i++) {
        addMarker(map, json._embedded.events[i]);
      }
    }
    
    function addMarker(map, event) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        map: map
      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      console.log(marker);
    }

    var selectedEvent = {
        eventName: "", 
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        
    };

    //getLocation();
    /////////////////////////////////////////////////////////////////////////////////////



    document.addEventListener("DOMContentLoaded", function(){
      
        var apikey = "ukOiSJ4btyGOtiXrgU1WzROaKMALf6ha";
        //var url = "https://randomuser.me/api/?results=20";
      
        function ajax(url, callback){
            fetch(url)
             .then(res => { 
                 return res.json()
              })
             .then(handleData);
        }
  
        var currentData = null; 
       // const formData = new FormData(document.getElementById(""));
       /*  const request = new Request(url, {
            cache: 'no cache',
            headers: '_headers',
            methd: 'POST',
            body: JSON.stringify(formData) 
        }); */ 
  
       // fetch(request).then().catch();
  
  
        function handleData(data){
            console.log(data);
            var html = "<table>";
            data._embedded.events.forEach(result => {
                let name =result.name;
                let date = result.dates.start.localDate;
                let time = result.dates.start.localTime;
                let url = result.url;
                let imge = result.images[0].url;
                html += "<tr>";
                html += "<td><img src='"+imge+"'></td>";
                html += "<td>"+name+"</td>";
                html += "<td>"+date+"</td>";
                html += "<td>"+time+"</td>";
                html += "<td><a href='"+url+"'>tix</a></td>";
  
              html += "</tr>";
            });
            html += "</table>";
            document.querySelector("output").innerHTML = html;
        }
      
        //ajax(url, handleData);
        // ajax(url, console.log);
      
  
       document.querySelector("button").addEventListener("click", function(){   
           var city = document.querySelector("input").value;   
           var classification = document.querySelector("select option:checked").textContent;
            var url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName="+classification+"&city="+city+"&apikey=ukOiSJ4btyGOtiXrgU1WzROaKMALf6ha";
  
                ajax(url, handleData);
        }); 
        
      });
  