import './styles/main.css';
import './styles/vite.css';

import { test_json_data } from './test/test';
import { MapContext, ViewContext } from './contexts/index';


let req = new XMLHttpRequest();
const viewCtx = new ViewContext();
const mapCtx = new MapContext();

const binID = "67f8c9fd8a456b7966871939";
const accessKey = "$2a$10$51hMVK0Z6OfHAnzvMsfMV.T1d0LVjQcJSHyXOXNa9GgEJ20cM./h2";

viewCtx.updateView();
mapCtx.setupView();

try{
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if(req.status == 200) {
        console.log(req.responseText);
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
