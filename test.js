var test = require('tape');
var request = require('request');
var geojsonToImage = require('./');

var mapid = 'tristen.map-4s93c8qx';
var token = 'pk.eyJ1IjoiZmFsbHNlbW8yIiwiYSI6IjhsbHFBMkEifQ.OMXud5BW3OAF-_usSJjy0Q';
var geojson = { "type": "FeatureCollection",
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
            "marker-color": '#b7ddf3',
            "marker-size": 'medium',
            "marker-symbol": 'square'
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                -87.63072967529297,
                41.874673839758
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
                -125.8985137939453,
                49.12691530777389
            ]
        }
    }
]};

    var img = geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }, geojson, {
        'coordinates': [74, 40],
        'zoom': 4,
        'quality': 'jpg80',
        'width': 1024,
        'height': 1024
    });

test('Image without GeoJSON', function(t) {
    t.plan(2);
    request(geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }), function(err, res) {
        t.notOk(err, 'no errors');
        t.equal(res.statusCode, 200, 'valid image returned');
    });
});

test('Image with GeoJSON', function(t) {
    t.plan(2);
    request(geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }, geojson), function(err, res) {
        t.notOk(err, 'no errors');
        t.equal(res.statusCode, 200, 'valid image returned');
    });
});

test('Image with options', function(t) {
    t.plan(2);
    request(geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }, geojson, {
        'coordinates': [74, 40],
        'zoom': 4,
        'quality': 'jpg70',
        'width': 1024,
        'height': 1024
    }), function(err, res) {
        t.notOk(err, 'no errors');
        t.equal(res.statusCode, 200, 'valid image returned');
    });
});

test('Image with exceeded width/height options', function(t) {
    t.plan(2);
    request(geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }, geojson, {
        'width': 6400,
        'height': 4800
    }), function(err, res) {
        t.notOk(err, 'no errors');
        t.equal(res.statusCode, 200, 'valid image with valid demensions returned');
    });
});

test('Image with exceeded zoom', function(t) {
    t.plan(2);
    request(geojsonToImage({
        'mapID': mapid,
        'accessToken': token
    }, geojson, {
        'zoom': 64
    }), function(err, res) {
        t.notOk(err, 'no errors');
        t.equal(res.statusCode, 200, 'valid image with valid zoom returned');
    });
});
