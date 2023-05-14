var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});
 

function RenderMap(mapid, type, markPt){
    var viewPt = [];
    type = type.split(',');
    markPt = markPt.split(',');
    for(var i = 0; i < type.length; i++){
        if(type[i] === 'house'){
            viewPt = [markPt[i*2],markPt[i*2+1]];
            break;
        }
    }
    var map = L.map(mapid).setView(viewPt, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
        maxZoom: 18,
    }).addTo(map);

    for(var i = 0; i < type.length; i++){
        var point = [markPt[i*2],markPt[i*2+1]];
        switch(type[i]){
            case 'house':
                L.marker(point, {icon : redIcon}).addTo(map)
                break;
            case 'clinic':
                L.marker(point, {icon : blueIcon}).addTo(map)
                break;
            case 'parking':
                L.marker(point, {icon : redIcon}).addTo(map)
                break;
        }
    };
}