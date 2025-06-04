
import L from 'leaflet';
import { ILocation } from './view-ctx';

export class MapContext {


    /** leaftletJS docs: https://leafletjs.com/examples/quick-start/ */
    setupMap(latest: ILocation) {

        let lat = 51.505;
        let long = -0.09;

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

        let map = L.map(mapContainer).setView([lat, long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    };
};

