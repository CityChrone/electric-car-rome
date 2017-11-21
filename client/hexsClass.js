
class geoJsonClass{
    constructor(){}
    addHexs(hexs = {}, map) {
        this.hexs = hexs; //features collections
        this.map = map;
        hexs.features.forEach((e,i)=>{ //checking if the futures list is ordered by pos
            let pos = e.properties.pos || i;
            if(pos != i){
                this.hexs.features[i].properties.pos = i;
            }
        });
        this.fillPointTree();
        this.geojson = L.geoJson(null, {
        'style' : {},
        'onEachFeature' : function(feature, layer){
            }
        }).addTo(map);
        this.popup = L.popup({maxWidth: 900, minWidth:500, maxHeight:400})
    }
    addData(data, fieldN = undefined){
        let possibleField = ""
        Object.keys(data[0]).forEach((e)=>{
            if(e != "pos") possibleField = e
        })
        let fieldName = fieldN || possibleField
        let fieldInData = possibleField
        console.log(fieldName, )
        data.forEach((e,i) =>{
            let pos = e.pos
            this.hexs.features[pos].properties[fieldName] = e[fieldInData]
        });
    }
    console(){
        console.log(this.hexs);
    }
    hexOnClick(e){ 
        openPopup(this, e)
    }
    enableClick(){
        let that = this;
        this.geojson.eachLayer(function (layer) {

            layer.on('click', that.hexOnClick, that);
        });
    }
    disableClick(){
        let that = this;
        this.geojson.eachLayer(function(layer) {
            layer.off('click', that.hexOnClick, that);
        });
    }
    updateGeojson(){
    }
    showData(quantity = "parked_cars", shell = shellDefault, map = this.map){
        this.geojson.clearLayers();
        this.showedQuantity = quantity;
        let hexsShelled = shellify(this.hexs.features, quantity, time, shell)
        console.log("hexsShelled", hexsShelled)
        for(let value in hexsShelled) {
            let hexsShell = hexsShelled[value]
            let unionShellHexs = unionHexs(hexsShell)
            this.geojson.addData(unionShellHexs)
        }
        this.enableClick()
    }
    showTemporalData(quantity = "parked_cars", time = 8*3, shell = shellDefault, map = this.map){
        this.geojson.clearLayers();

        this.showedQuantity = quantity;
        this.showedTime = time;
        let hexsShelled = shellifyTemporal(this.hexs.features, quantity, time, shell)
        for(let value in hexsShelled) {
            let hexsShell = hexsShelled[value]
            let unionShellHexs = unionHexs(hexsShell)
            unionShellHexs.properties["value"] = parseFloat(value)
            this.geojson.addData(unionShellHexs)
        }
        this.enableClick()
        this.setStyle(quantity, shell);
    }
    setStyle(quantity = "parked_cars", shell = shellDefault, colorList = colorDefaultList){
        let colorFunc = colorD3 //returnColorFunc(shell, colorList)
        let style = styleGeojson(colorFunc)
        this.geojson.setStyle(style);

    }
    setPoints(points){
        this.points = points;
    }
    showPopUp(){

    }
    fillPointTree(points){
        let hexs = this.hexs;
        this.pointTree = rbush(4);
        //console.log('start filling tree')
        let listPoint = []
        hexs.features.forEach((f,i) =>{
            let coor = f.geometry.coordinates[0];
            this.hexs.features[i].properties.point = [(coor[0][0] + coor[4][0]) / 2, (coor[0][1] + coor[4][1]) / 2];
            let item =  {
                minX: f.properties.point[0],
                minY: f.properties.point[1],
                maxX: f.properties.point[0],
                maxY: f.properties.point[1],
                pos: i}
            //console.log(item)
            listPoint.push(item)
            //pointTree.insert(item)
        });
        this.pointTree.load(listPoint);
        //console.log('end filling tree')
    }
    findClosestPoint(point, num = 1){
        return knn(this.pointTree, point[0], point[1], num);
    }

};
