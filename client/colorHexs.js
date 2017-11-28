var colorDefaultList = ['#000000', '#993404', "#f16913", "#fdae6b", '#74c476', '#31a354', '#006d2c', "#6baed6", "#4292c6", "#2171b5", '#08519c', '#f768a1', '#dd3497', '#ae017e', '#49006a'];
const limHigh = 500
const limLow = 1
const numcolor = 9;

var shellDefault = [1,10,20,50,100,200,500, 1000]

var colorD3 = d3.scaleThreshold()
    .domain(shellDefault)
    .range(d3.schemeRdYlBu[numcolor].reverse())







let returnColorFunc = function(shell = shellDefault, colorList = colorDefaultList) {
    return function(val){
        let i = 0;
        //let maxV = 16.;
        for (i = 0; i < shell.length; i++) {
            if (val < shell[i]) break;
        }
        let color = colorList[i];
        return color
    };
};


const styleGeojson = function(colorFunc) {
    return function(feature){
        let val = feature.geometry.properties.value
        console.log(val, feature)
        let opacity = 0.5;
        let color = colorFunc(val);
        if (color ==null) opacity = 0;
        let style = {
            fillColor: color,
            color: '#bababa',
            fill: true,
            fillOpacity: opacity,
            opacity : 0.4,
            weight: 0.5
            //clickable : false
        };
        return style;
    };
};

