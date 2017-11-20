stringPopUp = function(feat, quantities, times, type = "default"){
	let stringToPass = ""
	quantities.forEach((q,i)=>{
		stringToPass += q + " " + String(feat.properties[q][times[i]]) + "\n";
	})
	return stringToPass
}