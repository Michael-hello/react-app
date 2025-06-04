
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import { ILocation } from './view-ctx';

export class MapContext {

    private setup = false;
    private map: L.Map = null;
    private markers: L.Marker[] = [];
    private polylines: L.Polyline[] = [];
    private defaultZoom = 12;

    showAll = false;
    showLines = false;

    locations: ILocation[] = [];

    get most_recent() {
        if(this.locations == null || this.locations.length == 0)
            return null;
        let sorted = this.locations.sort((a,b) => b.time - a.time);
        return sorted[0];        
    };

    setupView() {
        const button1 = document.querySelector<HTMLButtonElement>('#button1'); //show latest
        const button2 = document.querySelector<HTMLButtonElement>('#button2'); //show all
        const button3 = document.querySelector<HTMLButtonElement>('#button3'); //show lines

        button1.addEventListener('click', this.btn1Clicked.bind(this)); 
        button2.addEventListener('click', this.btn2Clicked.bind(this)); 
        button3.addEventListener('click', this.btn3Clicked.bind(this)); 
    };

    //show latest
    btn1Clicked() {
        this.removeMarkers();
        let last = this.most_recent;

        if(this.map != null && last != null) {
            this.addMarker(this.most_recent);
            this.map.setView([last.latitude, last.longitude], this.defaultZoom);
        };
    };

    //show all
    btn2Clicked() {
        this.showAll = !this.showAll;
        let text = this.showAll ? 'Hide all' : 'Show all';
        const button2 = document.querySelector<HTMLButtonElement>('#button2');
        button2.innerText = text;

        if(this.showAll) {
            for(let loc of this.locations) {
                this.addMarker(loc);
            };
            this.zoomToMarkers();
        } else {
            this.removeMarkers();
        }
    };

    //show lines
    btn3Clicked() {
        this.showLines = !this.showLines;
        let text = this.showLines ? 'Hide lines' : 'Show lines';
        const button3 = document.querySelector<HTMLButtonElement>('#button3');
        button3.innerText = text;

        if(!this.showLines) {
            for(let line of this.polylines)
                line.remove();
            this.polylines = [];
        } else {
            if(this.map == null) return;

            let latlngs = this.locations.map(x => [x.latitude, x.longitude] as LatLngTuple);
            let polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
            this.polylines.push(polyline);
            this.map.fitBounds(polyline.getBounds());
        };        
    };

    /** leaftletJS docs: https://leafletjs.com/examples/quick-start/ */
    setupMap() {

        let lat = 51.505;
        let long = -0.09;
        let latest = this.most_recent;

        if(latest != null) {
            lat = latest.latitude;
            long = latest.longitude;
        };

        const appContainer = document.querySelector<HTMLElement>('#app');
        const mapContainer = document.querySelector<HTMLElement>('#map');

        if(appContainer == null || mapContainer == null)
            return;

        let width = appContainer.getBoundingClientRect().width;
        let mapWidth = width > 800 ? width * 0.8 : width - 20;
        let mapHeight = 0.75 * mapWidth;

        mapContainer.style.width = mapWidth + 'px';
        mapContainer.style.height = mapHeight + 'px';

        this.map = L.map(mapContainer).setView([lat, long], this.defaultZoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.setup = true;

        this.addMarker(latest);
    };

    addMarker(location: ILocation) {

        if(!this.setup || this.map == null) return;
        if(location == null) return;

        let m = L.marker([location.latitude, location.longitude]).addTo(this.map);
        this.markers.push(m);
    };

    removeMarkers() {
        for(let marker of this.markers){
            marker.remove();
        }
        this.markers = [];
    };

    zoomToMarkers() {
        let group = new L.FeatureGroup();
        for(let marker of this.markers)
            group.addLayer(marker);

        this.map.fitBounds(group.getBounds())
    };
};

