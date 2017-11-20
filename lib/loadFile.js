/*let charging_vehicles_ts = $.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});

*/
let loadZip = function(nameFile = "hex_points.geojson",  callback = (x)=>{console.log(x)}, dir = "dati/",){ 
new JSZip.external.Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(dir + nameFile + ".zip", function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
	}).then(function (data) {
    return JSZip.loadAsync(data);
	})
	.then((zip)=>{
		//console.log(zip)
		zip.file(nameFile).async("string").then(function (data3){
			//console.log(data3)
			let resultFile = JSON.parse(data3);
			callback(resultFile)

			return resultFile 
		});
	});
};


let loadZips = function(){ 

	let showGeojson = function(geojson){
		console.log(geojson)

		hexs = new geoJsonClass(hexs = geojson, mymap)

		loadZip("parked_vehicles_ts_reduced.json", (geojsonTs)=>{
			console.log(geojsonTs)
			hexs.addData(geojsonTs)
			hexs.console();
			hexs.showTemporalData();
		})


	}

	loadZip("hex_points.geojson", showGeojson)

}