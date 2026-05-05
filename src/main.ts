import './styles/main.css';
import './styles/vite.css';

import { test_json_data } from './test/test';
import { MapContext, RequestContext, ViewContext } from './contexts/index';



const viewCtx = new ViewContext();
const mapCtx = new MapContext();
const requestCtx = new RequestContext();


viewCtx.updateView();
mapCtx.setupMapView();

try {
  requestCtx.onreadystatechange = () => {
    if (requestCtx.readyState == XMLHttpRequest.DONE) {
      if(requestCtx.status == 200) {
        
        viewCtx.parseJsonResponse(requestCtx.responseText);

        mapCtx.locations = viewCtx.locations;
        mapCtx.setupMap();
      }
    };
  };

  requestCtx.getLocations();

} catch(e) {
  console.log('UNABLE TO PROCESS GET REQ: ' + e);
};



// viewCtx.parseJsonResponse(test_json_data);
// mapCtx.locations = viewCtx.locations;
// mapCtx.setupMap();
