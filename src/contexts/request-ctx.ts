import { ILocation } from "./view-ctx";


/** READ ONLY access key */
const jsonBinGetKey = "$2a$10$tsxCXesQpHhoP37i3b5fO.17ucICn.Cx1n27pgkgJnBGofD1x2RrC";
const binID = "67f8c9fd8a456b7966871939";

/** READ ONLY api key for fastapi web app */
const fastApiGetKey = "e9c53798cd2f424f81dcd248f9c77f5a";


export class RequestContext extends XMLHttpRequest {


    constructor(
        public source:  'jsonbin' | 'fastapi'
    ){
        super()
    };


    getLocations() {

        if (this.source === 'jsonbin') {

            this.open("GET", `https://api.jsonbin.io/v3/b/${binID}/latest`, true);
            this.setRequestHeader("X-Access-Key", jsonBinGetKey);

        } else if (this.source === 'fastapi') {

            this.open("GET", `https://python-backend-locations.onrender.com/locations`, true);
            this.setRequestHeader("api-key-secret", fastApiGetKey)

        };

        this.withCredentials = true;
        this.send();
    };


    parseResponse(requestCtx: RequestContext) : ILocation[]  {

        let locations: ILocation[] = [];

        if (requestCtx.readyState == XMLHttpRequest.DONE) {
            if(requestCtx.status == 200) {

                let response = requestCtx.responseText;
                locations = RequestContext.parseJson(response, this.source);
            };
        };

        return locations;
    };


    static parseJson(json: string, source: 'fastapi' | 'jsonbin') : ILocation[] {
        
        let out: ILocation[] = [];

        if(json == null) return out;

        let obj = JSON.parse(json);
        let locations: any[] = null;

        if(source === 'jsonbin') {
            let record = obj.record;
            locations = record == null ? null : record.locations;
        };
        if(source === 'fastapi') {
            locations = obj;
        };


        if(locations == null) return out;

        for(let i = 0; i < locations.length; i++) {
            let loc = locations[i];
            let location = {
                latitude: Number(loc.latitude),
                longitude: Number(loc.longitude),
                id: loc.string,
                time: Number(loc.time),
            };
            
            if(location.time > 1700000000000)
                out.push(location);
        }; 

        return out;
    };

};