function makeControllers(){
    let selectors = L.control({position: 'bottomleft'});

    selectors.onAdd = function (map) {

        var div = L.DomUtil.create('select', 'selectpicker')
            div.innerHTML += '\
            <option>Mustard</option>\
            <option>Ketchup</option>\
            <option>Relish</option>'

        return div;
    };

    return selectors;
}
