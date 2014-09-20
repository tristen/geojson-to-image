## GeoJSON to Image

[![Build Status](https://travis-ci.org/tristen/geojson-to-image.png?Zeqckz55oF1LjKHEqHT7)](https://travis-ci.org/tristen/geojson-to-image)

Pass GeoJSON and get an image in return from [Mapbox Static API](https://www.mapbox.com/developers/api/static/). Currently, only markers are supported.

### Usage

``` js
var geojsonToImage = require('geojson-to-image');

var geojson = {
    "type": "FeatureCollection",
    "features": [ 
        {
            "type": "Feature",
            "properties": {
            "marker-color": '#a3e46b',
            "marker-size": 'large',
            "marker-symbol": 'triangle'
        },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -79.39712047576904,
                    43.62669447164394
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-url": 'https://raw.githubusercontent.com/tristen/vintages/gh-pages/img/marker@2x.png'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -87.63072967529297,
                    41.874673839758
                ]
            }
        }
    ]
}

var image = geojsonToImage({
    'mapID': 'username.mapid',
    'accessToken': '<your access token here>'
}, geojson);

// Returns
// https://api.tiles.mapbox.com/v4/tristen.map-4s93c8qx/pin-l-triangle+A3E46B(-79.39712047576904,43.62669447164394),url-https%3A%2F%2Fraw.githubusercontent.com%2Ftristen%2Fvintages%2Fgh-pages%2Fimg%2Fmarker%402x.png(-87.63072967529297,41.874673839758)/-79.39712047576904,41.874673839758,2/500x500.png?access_token=pk.eyJ1IjoiZmFsbHNlbW8yIiwiYSI6IjhsbHFBMkEifQ.OMXud5BW3OAF-_usSJjy0Q

```

![Marker result](https://api.tiles.mapbox.com/v4/tristen.map-4s93c8qx/pin-l-triangle+A3E46B(-79.39712047576904,43.62669447164394),url-https%3A%2F%2Fraw.githubusercontent.com%2Ftristen%2Fvintages%2Fgh-pages%2Fimg%2Fmarker%402x.png(-87.63072967529297,41.874673839758)/-79.39712047576904,41.874673839758,2/500x500.png?access_token=pk.eyJ1IjoiZmFsbHNlbW8yIiwiYSI6IjhsbHFBMkEifQ.OMXud5BW3OAF-_usSJjy0Q)

### API

### `geojsonToImage(authentication, geojson, options)`

#### `authentication`
Takes an object with two required keys: [accessToken](https://www.mapbox.com/help/define-access-token/) & [mapID](https://www.mapbox.com/help/define-map-id/).

``` js
{
    'mapID': 'username.mapid',
    'accessToken': '<your access token here>'
}
```

#### `geojson`

Takes a [valid geojson object](http://geojson.org/). Not passing a geojson object results in a blank map.

#### `options`  

| Setting | Default Value | Description |
| ---- | ---- | ---- |
| coordinates | _calculated_ | A lat/lng value for the mapview itself. _eg._ `[-74.50, 40]` |
| zoom | 2 |  The zoom level of the static map image. |
| width | 500 | The width of the static image returned. Note: within [size limits](https://www.mapbox.com/developers/api/static/#size-limit) |
| height | 500 | The height of the static image returned. Note: within [size limits](https://www.mapbox.com/developers/api/static/#size-limit) |
| quality | png | The [quality](https://www.mapbox.com/developers/api/static/#format) of the map image |

### Tests

``` sh
npm test
```

