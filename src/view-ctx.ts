

export class ViewContext {

    latitude : Number = null;
    longitude : Number = null;
    last_update : Number = null; //in milliseconds
    locations: ILocation[] = [];

    parseJsonResponse(response: string) {
        if(response == null) return;
        let obj = JSON.parse(response);
        let record = obj.record;
        let locations = record == null ? null : record.locations;
        if(locations == null) return;

        this.locations = [];

        for(let i = 0; i < locations.length; i++) {
            let loc = locations[i];
            this.locations.push({
                latitude: Number(loc.latitude),
                longitude: Number(loc.longitude),
                id: loc.string,
                time: Number(loc.time),
            });
        };

        this.updateView();
    };

    updateView() {
        const span1 = document.querySelector<HTMLSpanElement>('#span1');
        const span2 = document.querySelector<HTMLSpanElement>('#span2');
        const link = document.querySelector<HTMLLinkElement>('#hyper');

        link.style.display = 'none';

        let span1Text = 'Last update: NA.';
        let span2Text = 'Current location: NA';
        let linkHref = '';

        if(this.locations && this.locations.length > 0) {
            let sorted = this.locations.sort((a,b) => b.time - a.time);
            let most_recent = sorted[0];
            let time = new Date(most_recent.time).toLocaleString();
            let loc = `${most_recent.latitude}, ${most_recent.longitude}`;
            span1Text = `Last update: ${time}.`;
            span2Text = `Current location: ${loc}`;
            linkHref = `https://maps.google.com/?q=${most_recent.latitude}, ${most_recent.longitude}`;
            link.style.display = 'block';
        };

        span1.textContent = span1Text;
        span2.textContent = span2Text;
        link.href = linkHref;
    };
};

interface ILocation {
    latitude: number;
    longitude: number;
    id: string;
    time: number;
};