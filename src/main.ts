import './styles/main.css';
import './styles/vite.css';

import { test_fastapi_data, test_jsonbin_data } from './test/test_data';
import { MapContext, RequestContext, ViewContext } from './contexts/index';


const source = "fastapi"; //fastapi or jsonbin

const viewCtx = new ViewContext();
const mapCtx = new MapContext();
const requestCtx = new RequestContext(source);


viewCtx.updateView();
mapCtx.setupMapView();


try {
  requestCtx.onreadystatechange = () => {    
    let locations = requestCtx.parseResponse(requestCtx);

    viewCtx.locations = locations;
    viewCtx.updateView();

    mapCtx.locations = viewCtx.locations;
    mapCtx.setupMap();
  };

  requestCtx.getLocations();

} catch(e) {
  console.log('UNABLE TO PROCESS GET REQ: ' + e);
};




// let locations = RequestContext.parseJson(test_jsonbin_data, "jsonbin");
// let locations = RequestContext.parseJson(test_fastapi_data, "fastapi");

// viewCtx.locations = locations;
// viewCtx.updateView();

// mapCtx.locations = viewCtx.locations;
// mapCtx.setupMap();
