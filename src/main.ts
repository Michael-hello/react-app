import './styles/main.css';
import './styles/vite.css';

import { test_json_data } from './test/test';
import { MapContext, ViewContext } from './contexts/index';


let req = new XMLHttpRequest();
const viewCtx = new ViewContext();
const mapCtx = new MapContext();

/** READ ONLY access key */
const accessKey = "$2a$10$tsxCXesQpHhoP37i3b5fO.17ucICn.Cx1n27pgkgJnBGofD1x2RrC";
const binID = "67f8c9fd8a456b7966871939";

viewCtx.updateView();
mapCtx.setupView();

try{
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if(req.status == 200) {
        
        viewCtx.parseJsonResponse(req.responseText);

        mapCtx.locations = viewCtx.locations;
        mapCtx.setupMap();
      }
    };
  };

  req.open("GET", `https://api.jsonbin.io/v3/b/${binID}/latest`, true);
  req.setRequestHeader("X-Access-Key", accessKey);
  req.send();

} catch(e) {
  console.log('UNABLE TO PROCESS GET REQ: ' + e);
};



// viewCtx.parseJsonResponse(test_json_data);
// mapCtx.locations = viewCtx.locations;
// mapCtx.setupMap();
