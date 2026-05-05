

/** READ ONLY access key */
const accessKey = "$2a$10$tsxCXesQpHhoP37i3b5fO.17ucICn.Cx1n27pgkgJnBGofD1x2RrC";
const binID = "67f8c9fd8a456b7966871939";


export class RequestContext extends XMLHttpRequest {

    getLocations() {
        this.open("GET", `https://api.jsonbin.io/v3/b/${binID}/latest`, true);
        this.setRequestHeader("X-Access-Key", accessKey);
        this.send();
    };

};