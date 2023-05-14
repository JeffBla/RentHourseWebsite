

  

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

    for(var i = 0; i < markPt.length; i+=2){
        var point = [markPt[i],markPt[i+1]];
        var marker = L.marker(point);
        marker.addTo(map);
    };
}