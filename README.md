This project is a simple application that displays the location data acquired by the android "location-logger" app. The tech stack includes:
    - React - JS framework
    - Leaflet - mapping library
    - XMLHttpRequest - for querying remote data


To run in development:
    - Need Node version 18.10.0 to run, as well as yarn
    - 'Yarn' to install dependencies
    - 'Yarn dev' to run in development mode

To push changes to github pages:
    - 'Yarn predeploy' to build to dist folder (check this is done successfully)
    - 'Yarn deploy' deploys the built contents of dist folder to the github pages branch of the repo
