var field2Quantity = {
    'Parked' : 'parked_cars',
    'Charging' : 'homeCharging',
    'Residents' : 'pop'
}

var quantity2Field = {}
for(k in field2Quantity){
    quantity2Field[field2Quantity[k]] = k
};

function showData(hexs){
    let h = parseInt($('#hours').val());
    let m = parseInt($('#min').val()) / 20 ;
    let tLayer = h * 3 + m;
    let quantity = field2Quantity[$('#layers').val()]
    //console.log("show data", hexs, quantity)
    if(quantity == "pop"){
        hexs.showData(quantity)
    } else{
        hexs.showTemporalData(quantity, tLayer)
    }
    //console.log(h,m, tLayer);
}

function makeControllers(map, hexs){
    let selectors = L.control({position: 'bottomleft'});

    selectors.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info')

            div.innerHTML += "<div class ='h2'> Layers: </div"

            div.innerHTML += '\
            <select class="selectpicker" id="layers">\
            <option>Parked</option>\
            <option>Charging</option>\
            <option>Residents</option>\
            </select> <br>'


            div.innerHTML += "<div class ='h4'> hours: </div"

            let stringHours = ""
            stringHours += '<select class="selectpicker" data-width="fit" data-style="btn-primary" id="hours">'
            //div.innerHTML += '<option>01</option>'
            let times = _.range(0,24)
            times.forEach((t, i)=>{
                stringHours += "<option>"+t.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"</option>"
            });
            stringHours += '</select>:'
            div.innerHTML += stringHours;
            div.innerHTML += '\
            <select class="selectpicker" data-width="fit" data-style="btn-primary" id="min">\
            <option>00</option>\
            <option>20</option>\
            <option>40</option>\
            </select> <br>'
        return div;
    };
    selectors.addTo(map)
    // Disable dragging when user's cursor enters the element
    selectors.getContainer().addEventListener('mouseover', function () {
        map.dragging.disable();
        map.scrollWheelZoom.disable()
    });

    // Re-enable dragging when user's cursor leaves the element
    selectors.getContainer().addEventListener('mouseout', function () {
        map.dragging.enable();
        map.scrollWheelZoom.enable()
    });

    console.log("make controller", hexs)

    $('#layers').change(function (e) {
        showData(hexs);
    });

    $('#hours').change(function (e) {
        showData(hexs);
    });
    $('#min').change(function (e) {
        showData(hexs);
    });

    return selectors;
}
