var stringPopUp = function(feat, quantities, times, type = "default"){
	let stringToPass = ""
	quantities.forEach((q,i)=>{
		stringToPass += q + " " + String(feat.properties[q][times[i]]) + "\n";
	})
	stringToPass +=  '<div id="plotPopup"></div>'
	return stringToPass
}

var popupEvent = function(hexs, feat){
	console.log(feat)
        hexs.map.off("popupopen")
        hexs.map.on("popupopen",(e)=>{
        	console.log("popupopen!!")
        	let quantities = ["homeCharging", "parked_cars"]
        	let x = _.range(0,96)
        	
        	var trace1 = {
			  x: x,
			  y: feat.properties[quantities[0]],
			  mode: 'lines',
			  name:"charging in house"
			};

        	var trace2 = {
			  x: x,
			  y: feat.properties[quantities[1]],
			  mode: 'lines',
			  name:"parked"
			};


			var data = [ trace1, trace2 ];

			var layout = {
			  title:'Temporal Line',
  			  autosize: false,
  			  width: 400,
  			  height: 300,
  			  margin: {
			    l: 50,
			    r: 50,
			    b: 100,
			    t: 100,
			    pad: 4
			  },
			  xaxis: {
			  	tickvals:_.range(0,96,4),
			  	ticktext : _.range(0,24)
			  },
			  showlegend: true,
			  legend: {
			    x: 0,
			    y: 1.45
			  }
			}
			Plotly.newPlot('plotPopup', data, layout);
 			//hexs.popup.update();
        });
};

var openPopup = function(hexs, e){
        let feature = e.target.feature
        let lngLat = [e.latlng.lng, e.latlng.lat]
        let pos =  hexs.findClosestPoint(lngLat)[0].pos
        let feat =  hexs.hexs.features[pos]
        let strPopUp = stringPopUp(feat, [hexs.showedQuantity], [hexs.showedTime]);
        popupEvent(hexs, feat);
        hexs.popup.setLatLng(e.latlng)
        .setContent(strPopUp).openOn(hexs.map);

        console.log("click", feature.geometry.properties.value, feat.properties[hexs.showedQuantity][hexs.showedTime])
}