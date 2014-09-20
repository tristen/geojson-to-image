var geojsonExtent = require('geojson-extent');

module.exports = function(auth, geojson, opts) {
    'use strict';

    if (!auth && !auth.mapID) throw new Error('A `mapID` must be passed.');
    if (!auth && !auth.accessToken) throw new Error('An `accessToken` must be passed.');

    var url = 'https://api.tiles.mapbox.com/v4/' + auth.mapID + '/';
    var extents = (geojson && opts && opts.coordinates) ? opts.coordinates : geojsonExtent(geojson);
    var data = [];

    opts = {
        z: (opts && opts.zoom) ?
           (opts.zoom > 22 || opts.zoom < 0) ? 2 : opts.zoom : 2,
        w: (opts && opts.width) ? 
           (opts.width > 1280) ? 500 : opts.width : 500,
        h: (opts && opts.height) ?
           (opts.height > 1280) ? 500 : opts.height : 500,
        q: (opts && opts.quality) ? opts.quality : 'png',

        // TODO Properly get the lat/lng of the bounding box.
        c: (extents) ? 
           (extents.length === 4) ? [extents[2], extents[1]] : extents :
           [0, 0]
    };

    function color(prop) {
        return prop.replace(/[^0-9a-fA-F]/, '').toUpperCase();
    }

    function size(prop) {
        var v;
        switch (prop) {
            case 'large':
            v = 'l';
            break;
            case 'small':
            v = 's';
            break;
            default:
            v = 'm';
            break;
        }
        return v;
    }

    if (geojson && geojson.features && geojson.features.length) {
        geojson.features.forEach(function(feature) {
            var g = feature.geometry,
                p = feature.properties,
                result;

            if (g.type === 'Point') {
                if (p['marker-url']) {
                    result = 'url-' + encodeURIComponent(p['marker-url']);
                } else {
                    result = 'pin-';
                    if (p['marker-size']) result += size(p['marker-size']);
                    if (p['marker-symbol']) result += '-' + p['marker-symbol'];
                    if (p['marker-color']) result += '+' + color(p['marker-color']);
                }
                result += '(' + g.coordinates.join(',') + ')';
            }

            data.push(result);
        });
    }

    var features = (data.length) ? data.join(',') + '/' : '';

    return url + features + opts.c.join(',') + ',' + opts.z + '/' + opts.w + 'x' + opts.h + '.' + opts.q + '?access_token=' + auth.accessToken;
};
