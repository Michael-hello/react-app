import './style.css'
import { ViewContext } from './view-ctx';

let req = new XMLHttpRequest();
const viewCtx = new ViewContext();

const binID = "67f8c9fd8a456b7966871939";
const accessKey = "$2a$10$51hMVK0Z6OfHAnzvMsfMV.T1d0LVjQcJSHyXOXNa9GgEJ20cM./h2";

viewCtx.updateView();

try{
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if(req.status == 200) {
        console.log(req.responseText);
        viewCtx.parseJsonResponse(req.responseText);
      }
    };
  };
  req.open("GET", `https://api.jsonbin.io/v3/b/${binID}/latest`, true);
  req.setRequestHeader("X-Access-Key", accessKey);
  req.send();
} catch(e) {
  console.log('UNABLE TO PROCESS GET REQ: ' + e);
};


// const json = `{
//     "record": {
//         "locations": [
//             {
//                 "latitude": "20.0",
//                 "longitude": "10.0",
//                 "id": "1293874",
//                 "time": "23984238032"
//             },
//             {
//                 "latitude": "250.0",
//                 "longitude": "150.0",
//                 "id": "5464",
//                 "time": "767867896"
//             },
//             {
//                 "latitude": "330.0",
//                 "longitude": "440.0",
//                 "id": "sdfsdf",
//                 "time": "123213123"
//             },
//             {
//                 "latitude": "4530.0",
//                 "longitude": "440.0",
//                 "id": "fgfgbgff",
//                 "time": "123213123"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744783291660"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744783320097"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744783350236"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744783979241"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784038003"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784077027"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784085987"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784623900"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784652575"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784885914"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784914682"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784944784"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744784974694"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744785004644"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744785034694"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744785064640"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744785094700"
//             },
//             {
//                 "latitude": "30.6811716",
//                 "longitude": "54.8638583",
//                 "id": "test",
//                 "time": "1744785124685"
//             },
//             {
//                 "latitude": "30.685967",
//                 "longitude": "54.8734087",
//                 "id": "test",
//                 "time": "1744785154767"
//             },
//             {
//                 "latitude": "30.685967",
//                 "longitude": "54.8734087",
//                 "id": "test",
//                 "time": "1744785421204"
//             },
//             {
//                 "latitude": "30.685967",
//                 "longitude": "54.8734087",
//                 "id": "test",
//                 "time": "1744785676544"
//             }
//         ]
//     },
//     "metadata": {
//         "id": "67f8c9fd8a456b7966871939",
//         "private": false,
//         "createdAt": "2025-04-15T15:38:25.787Z",
//         "name": "LocationLogger"
//     }
// }`

// viewCtx.parseJsonResponse(json);
