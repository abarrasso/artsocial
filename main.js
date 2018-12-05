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
  

   document.getElementById("submit").addEventListener("click", function(){   
	   var city = document.getElementById("city").value;   
	   var classification = document.querySelector("select option:checked").textContent;
	   var date1 = document.getElementById("date1").value;
		var url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName="+classification+"&dates.start.localDate="+date1+"&city="+city+"&apikey=ukOiSJ4btyGOtiXrgU1WzROaKMALf6ha";

			ajax(url, handleData);
	});
	
  });