
export class ViewContext {

    last_update : Number = null; //in milliseconds
    locations: ILocation[] = [];

    get most_recent() {
        if(this.locations == null || this.locations.length == 0)
            return null;
        let sorted = this.locations.sort((a,b) => b.time - a.time);
        return sorted[0];        
    };

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
        let latest = this.most_recent;

        if(latest != null) {            
            let time = new Date(latest.time).toLocaleString();
            let loc = `${latest.latitude}, ${latest.longitude}`;
            span1Text = `Last update: ${time}.`;
            span2Text = `Current location: ${loc}`;
            linkHref = `https://maps.google.com/?q=${latest.latitude}, ${latest.longitude}`;
            link.style.display = 'block';
        };

        span1.textContent = span1Text;
        span2.textContent = span2Text;
        link.href = linkHref;
    };
};

export interface ILocation {
    latitude: number;
    longitude: number;
    id: string;
    time: number;
};